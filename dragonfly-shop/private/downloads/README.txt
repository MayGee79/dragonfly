Place the final PDF files here (not in `public/`, so they are not directly guessable URLs):

- rsd-handbook-ebook.pdf
- rsd-workbook-ebook.pdf
- university-parents-guide-2026.pdf (free download, best for printing — tracked in git)
- university-parents-guide-2026.epub (free download, best for e-readers — tracked in git)
- university-student-guide-2026.pdf (DIGITAL edition — shop card shows Coming Soon until 27 Jul 2026 UK; Stripe price + Blob URL required for production downloads)

After checkout, customers get links on `/success` that hit `/api/download`, which checks the Stripe session is paid and includes that product before streaming the file.

**Single-use links:** the current implementation verifies payment on every request but does not enforce one-time use (sharing the success-page URL could allow repeat downloads). To add true one-time tokens you would store a consumed flag (e.g. Vercel KV / Upstash Redis) keyed by a random token issued on `/success`.
