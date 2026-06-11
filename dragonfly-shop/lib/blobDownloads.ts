/**
 * Canonical blob URLs from the Vercel Blob dashboard (copy “URL” with no query string).
 * Used by /api/download after Stripe verifies the session — private blobs are fetched via get(), not public fetch.
 */
export function vercelBlobCanonicalUrlForDigital(catalogId: string): string | undefined {
  const map: Record<string, string | undefined> = {
    'rsd-handbook-ebook': process.env.BLOB_DOWNLOAD_URL_RSD_HANDBOOK_EBOOK,
    'rsd-workbook-ebook': process.env.BLOB_DOWNLOAD_URL_RSD_WORKBOOK_EBOOK,
  }
  const raw = map[catalogId]
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
