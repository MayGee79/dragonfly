import fs from 'fs'
import path from 'path'
import { head } from '@vercel/blob'
import { NextResponse } from 'next/server'
import { vercelBlobCanonicalUrlForDigital } from '@/lib/blobDownloads'
import { CATALOG, stripePriceIdForCatalogId } from '@/lib/catalog'
import { getStripe } from '@/lib/stripe'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 })
}

function forbidden(message: string) {
  return NextResponse.json({ error: message }, { status: 403 })
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get('session_id')?.trim() ?? ''
  const catalogId = searchParams.get('catalog')?.trim() ?? ''

  if (!sessionId.startsWith('cs_')) {
    return badRequest('Invalid session.')
  }
  const product = CATALOG.find((c) => c.id === catalogId)
  if (!product || product.kind !== 'digital' || !product.privateDownloadFile) {
    return badRequest('Invalid download.')
  }

  let priceId: string
  try {
    priceId = stripePriceIdForCatalogId(catalogId)
  } catch {
    return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 })
  }

  const stripe = getStripe()
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items.data.price'],
  })

  if (session.payment_status !== 'paid') {
    return forbidden('Payment not completed.')
  }

  let allowedQty = 0
  for (const li of session.line_items?.data ?? []) {
    const p = li.price
    if (!p || typeof p === 'string') continue
    if ('deleted' in p && p.deleted) continue
    if (p.id !== priceId) continue
    allowedQty += li.quantity ?? 0
  }

  if (allowedQty < 1) {
    return forbidden('This file is not part of your order.')
  }

  const canonicalBlobUrl = vercelBlobCanonicalUrlForDigital(catalogId)
  if (canonicalBlobUrl) {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json({ error: 'Download storage is not configured.' }, { status: 500 })
    }

    try {
      const blobMeta = await head(canonicalBlobUrl)
      const upstream = await fetch(blobMeta.downloadUrl)
      if (!upstream.ok || !upstream.body) {
        return NextResponse.json(
          { error: 'Download file is temporarily unavailable. Please contact the shop.' },
          { status: 503 },
        )
      }

      const buf = Buffer.from(await upstream.arrayBuffer())
      const safeName = product.privateDownloadFile.replace(/[^\w.-]+/g, '_')

      return new NextResponse(buf, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${safeName}"`,
          'Cache-Control': 'private, no-store',
        },
      })
    } catch {
      return NextResponse.json(
        { error: 'Download file is temporarily unavailable. Please contact the shop.' },
        { status: 503 },
      )
    }
  }

  const filePath = path.join(process.cwd(), 'private', 'downloads', product.privateDownloadFile)
  if (!fs.existsSync(filePath)) {
    return NextResponse.json(
      { error: 'Download file is not available yet. Please contact the shop.' },
      { status: 503 },
    )
  }

  const buf = fs.readFileSync(filePath)
  const safeName = product.privateDownloadFile.replace(/[^\w.-]+/g, '_')

  return new NextResponse(buf, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${safeName}"`,
      'Cache-Control': 'private, no-store',
    },
  })
}
