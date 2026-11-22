Place the final PDF files here (not in `public/`, so they are not directly guessable URLs):

- rsd-handbook-ebook.pdf
- rsd-workbook-ebook.pdf
- strength-beneath-compendium-ebook.pdf (paid eBook — upload to Vercel Blob; set BLOB_DOWNLOAD_URL_STRENGTH_BENEATH_COMPENDIUM_EBOOK)
- year-beneath-ebook.pdf (paid eBook — upload to Vercel Blob; set BLOB_DOWNLOAD_URL_YEAR_BENEATH_EBOOK)
- strength-beneath-30-day-ebook.pdf (paid eBook — upload to Vercel Blob; set BLOB_DOWNLOAD_URL_STRENGTH_BENEATH_30_DAY_EBOOK)
- university-parents-guide-2026.pdf (free download, best for printing — tracked in git)
- university-parents-guide-2026.epub (free download, best for e-readers — tracked in git)
- university-student-guide-2026.pdf (PRINTABLE — staged for paid launch 27 Jul; upload to Vercel Blob)
- university-student-guide-2026.epub (REFLOWABLE — staged for paid launch 27 Jul; upload to Vercel Blob)

After checkout, customers get links on `/success` that hit `/api/download`, which checks the Stripe session is paid and includes that product before streaming the file.

**Single-use links:** the current implementation verifies payment on every request but does not enforce one-time use (sharing the success-page URL could allow repeat downloads). To add true one-time tokens you would store a consumed flag (e.g. Vercel KV / Upstash Redis) keyed by a random token issued on `/success`.
