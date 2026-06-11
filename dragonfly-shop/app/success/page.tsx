import Link from 'next/link'
import type { Metadata } from 'next'
import {
  downloadAccessMessage,
  downloadLinkMaxAgeDays,
  getDownloadAccessDenial,
  retrieveCheckoutSession,
} from '@/lib/checkoutSession'
import { catalogItemByStripePriceId } from '@/lib/catalog'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Thank you',
  robots: { index: false, follow: true },
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string }
}) {
  const sessionId = searchParams.session_id?.trim()
  if (!sessionId) {
    return (
      <div style={{ maxWidth: 720, margin: '48px auto', padding: 24 }}>
        <h1>Thank you</h1>
        <p>Missing checkout session. If you completed a payment, check your email for the Stripe receipt.</p>
        <p>
          <Link href="/">Back to shop</Link>
        </p>
      </div>
    )
  }

  if (!sessionId.startsWith('cs_')) {
    return (
      <div style={{ maxWidth: 720, margin: '48px auto', padding: 24 }}>
        <h1>Thank you</h1>
        <p>We could not find that order. If you completed a payment, check your email for the Stripe receipt.</p>
        <p>
          <Link href="/">Back to shop</Link>
        </p>
      </div>
    )
  }

  const session = await retrieveCheckoutSession(sessionId)
  if (!session) {
    return (
      <div style={{ maxWidth: 720, margin: '48px auto', padding: 24 }}>
        <h1>Thank you</h1>
        <p>We could not find that order. If you completed a payment, check your email for the Stripe receipt.</p>
        <p>
          <Link href="/">Back to shop</Link>
        </p>
      </div>
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

  const hasDigitalDownloads = rows.some((r) => r.hasDownload)
  const canDownload = hasDigitalDownloads && !downloadDenial
  const newsletterOptIn = session.metadata?.newsletter_opt_in === 'true'
  const downloadWindowDays = downloadLinkMaxAgeDays()

  return (
    <div style={{ maxWidth: 720, margin: '48px auto', padding: 24 }}>
      <h1>Thank you for your order</h1>
      <p>
        A payment confirmation should arrive from <strong>Stripe</strong> at the email you used at checkout. If you
        do not see it within a few minutes, please check spam/junk.
      </p>
      {newsletterOptIn && (
        <p>
          You asked to hear about news and resources by email. Please check your inbox for a{' '}
          <strong>confirmation email</strong> from my mailing list provider to complete your subscription (double
          opt-in).
        </p>
      )}
      <h2 style={{ marginTop: 24 }}>Your items</h2>
      <ul>
        {rows.map((r) => (
          <li key={`${r.catalogId}-${r.title}`}>
            {r.title} × {r.quantity}
          </li>
        ))}
      </ul>

      {hasDigitalDownloads && (
        <>
          <h2 style={{ marginTop: 24 }}>Digital downloads</h2>
          {canDownload ? (
            <>
              <p>
                Each link checks your Stripe order before downloading. For your own use only. Download links stay
                available for <strong>{downloadWindowDays} days</strong> after purchase — save your files locally.
              </p>
              <ul>
                {rows
                  .filter((r) => r.hasDownload)
                  .map((r) => (
                    <li key={r.catalogId}>
                      <a
                        href={`/api/download?session_id=${encodeURIComponent(sessionId)}&catalog=${encodeURIComponent(r.catalogId)}`}
                        style={{ fontWeight: 700, textDecoration: 'underline' }}
                      >
                        {r.title}
                      </a>
                    </li>
                  ))}
              </ul>
            </>
          ) : (
            <p>{downloadDenial ? downloadAccessMessage(downloadDenial) : 'Downloads are not available for this order.'}</p>
          )}
        </>
      )}

      <p style={{ marginTop: 32 }}>
        <Link href="/">Return to shop</Link>
      </p>
    </div>
  )
}
