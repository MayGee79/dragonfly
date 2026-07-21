import fs from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'
import { CATALOG, freeDownloadFileFor, type FreeDownloadFormat } from '@/lib/catalog'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

function parseFormat(raw: string | null): FreeDownloadFormat {
  if (raw === 'epub') return 'epub'
  return 'pdf'
}

function contentTypeFor(format: FreeDownloadFormat): string {
  switch (format) {
    case 'pdf':
      return 'application/pdf'
    case 'epub':
      return 'application/epub+zip'
    default: {
      const _exhaustive: never = format
      return _exhaustive
    }
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const catalogId = searchParams.get('catalog')?.trim() ?? ''
  const format = parseFormat(searchParams.get('format')?.trim().toLowerCase() ?? null)
  const product = CATALOG.find((item) => item.id === catalogId)

  if (!product?.isFree || product.kind !== 'digital') {
    return NextResponse.json({ error: 'Invalid download.' }, { status: 400 })
  }

  const downloadFile = freeDownloadFileFor(product, format)
  if (!downloadFile) {
    return NextResponse.json({ error: 'That format is not available.' }, { status: 400 })
  }

  const filePath = path.join(process.cwd(), 'private', 'downloads', downloadFile)
  if (!fs.existsSync(filePath)) {
    return NextResponse.json(
      { error: 'Download file is temporarily unavailable. Please contact the shop.' },
      { status: 503 },
    )
  }

  const file = fs.readFileSync(filePath)
  const safeName = downloadFile.replace(/[^\w.-]+/g, '_')

  return new NextResponse(file, {
    status: 200,
    headers: {
      'Content-Type': contentTypeFor(format),
      'Content-Disposition': `attachment; filename="${safeName}"`,
      'Cache-Control': 'public, max-age=3600',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
