import fs from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'
import { CATALOG } from '@/lib/catalog'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const catalogId = searchParams.get('catalog')?.trim() ?? ''
  const product = CATALOG.find((item) => item.id === catalogId)

  if (!product?.isFree || product.kind !== 'digital' || !product.privateDownloadFile) {
    return NextResponse.json({ error: 'Invalid download.' }, { status: 400 })
  }

  const filePath = path.join(process.cwd(), 'private', 'downloads', product.privateDownloadFile)
  if (!fs.existsSync(filePath)) {
    return NextResponse.json(
      { error: 'Download file is temporarily unavailable. Please contact the shop.' },
      { status: 503 },
    )
  }

  const file = fs.readFileSync(filePath)
  const safeName = product.privateDownloadFile.replace(/[^\w.-]+/g, '_')

  return new NextResponse(file, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${safeName}"`,
      'Cache-Control': 'public, max-age=3600',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
