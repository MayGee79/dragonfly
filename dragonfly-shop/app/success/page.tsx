import Link from 'next/link'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import {
  downloadAccessMessage,
  downloadLinkMaxAgeDays,
  getDownloadAccessDenial,
  retrieveCheckoutSession,
} from '@/lib/checkoutSession'
import { catalogItemByStripePriceId } from '@/lib/catalog'
import styles from './Success.module.css'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Thank you',
  robots: { index: false, follow: true },
}

function SuccessShell({ children }: { children: ReactNode }) {
  return (
    <div className={styles.wrap}>
      {children}
      <p style={{ marginTop: 32 }}>
        <Link href="/">Return to shop</Link>
      </p>
    </div>
  )
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string }
}) {
  const sessionId = searchParams.session_id?.trim()
  if (!sessionId) {
    return (
      <SuccessShell>
        <h1>Thank you</h1>
        <p>Missing checkout session. If you completed a payment, check your email for the Stripe receipt.</p>
      </SuccessShell>
    )
  }

  if (!sessionId.startsWith('cs_')) {
    return (
      <SuccessShell>
        <h1>Thank you</h1>
        <p>We could not find that order. If you completed a payment, check your email for the Stripe receipt.</p>
      </SuccessShell>
    )
  }

  const session = await retrieveCheckoutSession(sessionId)
  if (!session) {
    return (
      <SuccessShell>
        <h1>Thank you</h1>
        <p>We could not find that order. If you completed a payment, check your email for the Stripe receipt.</p>
      </SuccessShell>
    )
  }

  const downloadDenial = getDownloadAccessDenial(session)

  const rows: {
    catalogId: string
    title: string
    quantity: number
    isDigital: boolean
    hasDownload: boolean
  }[] = []
  for (const li of session.line_items?.data ?? []) {
    const price = li.price
    if (!price || typeof price === 'string') continue
    if ('deleted' in price && price.deleted) continue
    const priceId = price.id
    if (!priceId) continue
    const cat = catalogItemByStripePriceId(priceId)
    const title = cat?.name || 'Item'
    const isDigital = cat?.kind === 'digital'
    const hasDownload = Boolean(isDigital && cat?.privateDownloadFile)
    const catalogId = cat?.id ?? 'unknown'
    rows.push({
      catalogId,
      title,
      quantity: li.quantity ?? 1,
      isDigital,
      hasDownload,
    })
  }

  const downloadRows = rows.filter((r) => r.hasDownload)
  const hasDigitalDownloads = downloadRows.length > 0
  const canDownload = hasDigitalDownloads && !downloadDenial
  const newsletterOptIn = session.metadata?.newsletter_opt_in === 'true'
  const downloadWindowDays = downloadLinkMaxAgeDays()

  return (
    <SuccessShell>
      <h1>Thank you for your order</h1>

      {hasDigitalDownloads && (
        <section className={styles.downloadCallout} aria-labelledby="download-your-files">
          <h2 id="download-your-files" className={styles.downloadHeading}>
            Download your files here
          </h2>
          {canDownload ? (
            <>
              <p className={styles.downloadLead}>
                Your eBooks are ready on this page (they will NOT be sent to you via email).
              </p>
              <p className={styles.downloadNote}>
                Click each button below to save the PDF to your phone, tablet, or computer. You can come back to this
                page to download again for <strong>{downloadWindowDays} days</strong>.
              </p>
              <ul className={styles.downloadList}>
                {downloadRows.map((r) => (
                  <li key={r.catalogId} className={styles.downloadItem}>
                    <a
                      className={styles.downloadBtn}
                      href={`/api/download?session_id=${encodeURIComponent(sessionId)}&catalog=${encodeURIComponent(r.catalogId)}`}
                    >
                      DOWNLOAD HERE
                    </a>
                    <p className={styles.downloadFileName}>{r.title}</p>
                  </li>
                ))}
              </ul>
              <p className={styles.downloadFinePrint}>
                For your own personal use only. Bookmark this page if you might need the files again.
              </p>
            </>
          ) : (
            <p>
              {downloadDenial ? downloadAccessMessage(downloadDenial) : 'Downloads are not available for this order.'}
            </p>
          )}
        </section>
      )}

      <p>
        A payment confirmation should arrive from <strong>Stripe</strong> at the email you used at checkout. That email
        is your receipt only. It does not include your files. If you do not see it within a few minutes, please check
        spam/junk.
      </p>
      {newsletterOptIn && (
        <p>
          You asked to hear about news and resources by email. Please check your inbox for a{' '}
          <strong>confirmation email</strong> from my mailing list provider to complete your subscription (double
          opt-in).
        </p>
      )}
      <h2 className={styles.sectionHeading}>Your items</h2>
      <ul>
        {rows.map((r) => (
          <li key={`${r.catalogId}-${r.title}`}>
            {r.title} × {r.quantity}
          </li>
        ))}
      </ul>

      {hasDigitalDownloads && canDownload && (
        <p>
          <Link href="#download-your-files">Back to download buttons</Link>
        </p>
      )}
    </SuccessShell>
  )
}
