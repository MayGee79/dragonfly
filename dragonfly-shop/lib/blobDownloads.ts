import type { FreeDownloadFormat } from '@/lib/catalog'

/**
 * Canonical blob URLs from the Vercel Blob dashboard (copy “URL” with no query string).
 * Used by /api/download after Stripe verifies the session — private blobs are fetched via get(), not public fetch.
 */
export function vercelBlobCanonicalUrlForDigital(
  catalogId: string,
  format: FreeDownloadFormat = 'pdf',
): string | undefined {
  const map: Record<string, Partial<Record<FreeDownloadFormat, string | undefined>>> = {
    'rsd-handbook-ebook': {
      pdf: process.env.BLOB_DOWNLOAD_URL_RSD_HANDBOOK_EBOOK,
    },
    'rsd-workbook-ebook': {
      pdf: process.env.BLOB_DOWNLOAD_URL_RSD_WORKBOOK_EBOOK,
    },
    'university-student-guide-2026': {
      pdf: process.env.BLOB_DOWNLOAD_URL_UNIVERSITY_STUDENT_GUIDE,
      epub: process.env.BLOB_DOWNLOAD_URL_UNIVERSITY_STUDENT_GUIDE_EPUB,
    },
  }

  const raw = map[catalogId]?.[format]
  const trimmed = raw?.trim()
  if (!trimmed || !/^https:\/\//i.test(trimmed)) return undefined

  try {
    const url = new URL(trimmed)
    url.search = ''
    url.hash = ''
    return url.toString()
  } catch {
    return undefined
  }
}
