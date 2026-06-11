import fs from 'fs'
import path from 'path'
import { get } from '@vercel/blob'
import { NextResponse } from 'next/server'
import { vercelBlobCanonicalUrlForDigital } from '@/lib/blobDownloads'
import {
  downloadAccessMessage,
  getDownloadAccessDenial,
  retrieveCheckoutSession,
} from '@/lib/checkoutSession'
import { CATALOG, stripePriceIdForCatalogId } from '@/lib/catalog'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 })
}

function forbidden(message: string) {
  return NextResponse.json({ error: message }, { status: 403 })
}

function notFound(message: string) {
  return NextResponse.json({ error: message }, { status: 404 })
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

  const session = await retrieveCheckoutSession(sessionId)
  if (!session) {
    return notFound(downloadAccessMessage('not_found'))
  }

  const denial = getDownloadAccessDenial(session)
  if (denial) {
    if (denial === 'not_found') {
      return notFound(downloadAccessMessage(denial))
    }
    return forbidden(downloadAccessMessage(denial))
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
      const blobAccess = canonicalBlobUrl.includes('.private.blob.') ? 'private' : 'public'
      const result = await get(canonicalBlobUrl, { access: blobAccess })
      if (!result || result.statusCode !== 200 || !result.stream) {
        console.error('[download] blob unavailable:', { catalogId, statusCode: result?.statusCode ?? 'null' })
        return NextResponse.json(
          { error: 'Download file is temporarily unavailable. Please contact the shop.' },
          { status: 503 },
        )
      }

      const safeName = product.privateDownloadFile.replace(/[^\w.-]+/g, '_')
      const contentType = result.blob.contentType || 'application/pdf'

      return new NextResponse(result.stream, {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Content-Disposition': `attachment; filename="${safeName}"`,
          'Cache-Control': 'private, no-store',
        },
      })
    } catch (error) {
      console.error('[download] blob fetch failed:', { catalogId, error })
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
