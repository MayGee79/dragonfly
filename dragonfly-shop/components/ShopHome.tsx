'use client'

import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import type { ClientCatalogItem } from '@/lib/catalog'
import styles from './ShopHome.module.css'

type Basket = Record<string, number>

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

function coverAlt(name: string): string {
  if (name.includes('Handbook')) return 'Cover: Rejection Sensitive Dysphoria handbook'
  if (name.includes('Workbook')) return 'Cover: Rejection Sensitive Dysphoria companion workbook'
  return name
}

function BasketIconGraphic() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden>
      <circle cx="9.5" cy="20.5" r="1.5" fill="currentColor" />
      <circle cx="17.5" cy="20.5" r="1.5" fill="currentColor" />
      <path
        d="M3 5h3l2 13h13l3-10H10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function ShopHome({ catalog }: { catalog: ClientCatalogItem[] }) {
  const [basket, setBasket] = useState<Basket>({})
  const [customerEmail, setCustomerEmail] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [newsletter, setNewsletter] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const basketRef = useRef<HTMLElement>(null)
  const prevLineCountRef = useRef(0)

  const qtyFor = (id: string) => basket[id] ?? 0

  const addOneToBasket = (id: string) => {
    setBasket((prev) => {
      const cur = prev[id] ?? 0
      if (cur >= 99) return prev
      return { ...prev, [id]: cur + 1 }
    })
  }

  const setQty = (id: string, raw: string) => {
    const n = Math.max(0, Math.min(99, parseInt(raw, 10) || 0))
    setBasket((prev) => {
      const next = { ...prev }
      if (n === 0) delete next[id]
      else next[id] = n
      return next
    })
  }

  const lineItems = useMemo(() => {
    return catalog
      .map((p) => ({ ...p, qty: basket[p.id] ?? 0 }))
      .filter((p) => p.qty > 0)
  }, [catalog, basket])

  useEffect(() => {
    if (lineItems.length > 0 && prevLineCountRef.current === 0) {
      basketRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
    prevLineCountRef.current = lineItems.length
  }, [lineItems.length])

  const hasPhysical = lineItems.some((l) => l.kind === 'physical')
  const basketEmpty = lineItems.length === 0

  async function goToCheckout() {
    setError(null)
    if (!acceptTerms) {
      setError('Please tick the box to agree to the Shop Terms and Privacy Notice.')
      return
    }
    if (!isValidEmail(customerEmail)) {
      setError('Please enter a valid email address for your order confirmation.')
      return
    }
    if (lineItems.length === 0) {
      setError('Your basket is empty.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: lineItems.map((l) => ({ id: l.id, quantity: l.qty })),
          customerEmail: customerEmail.trim(),
          acceptTerms: true,
          newsletter,
        }),
      })
      const data = (await res.json()) as { url?: string; error?: string }
      if (!res.ok || !data.url) {
        setError(data.error || 'Checkout could not be started. Please try again.')
        return
      }
      window.location.href = data.url
    } catch {
      setError('Something went wrong starting checkout.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <header className={styles.hero} id="top">
        <div className={styles.heroBanner}>
          <div className={styles.heroBannerInner}>
            <div className={styles.heroBrand}>
              <div className={styles.heroLogo}>
                <Image
                  src="/images/dragonfly_logo_transparent.png"
                  alt="Dragonfly Psychotherapy"
                  className={styles.heroLogoImg}
                  width={260}
                  height={260}
                  sizes="(max-width: 767px) 140px, 260px"
                  priority
                />
              </div>
              <div className={styles.heroTextContent}>
                <h1 className={styles.shopTitle}>Shop</h1>
                <p className={styles.heroWelcome}>Welcome to the Dragonfly Shop</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className={styles.wrap}>
        <div className={styles.heroIntro}>
          <p>
            Handbooks, workbooks, and therapeutic resources can be purchased directly here. Digital editions are
            delivered the moment payment is complete: secure download links appear on the thank you page, and the{' '}
            <Link href="/terms">Shop Terms</Link> set out the full delivery process.
          </p>
          <p>This collection is growing steadily, with further handbooks, toolkits, and resources to follow.</p>
        </div>

        <div className={styles.mainLayout}>
          <aside ref={basketRef} className={styles.basket} aria-label="Basket and checkout">
            <h2 className={styles.basketHeading}>Basket</h2>
            {lineItems.length === 0 ? (
              <p className={styles.basketEmpty}>
                Click a product&apos;s basket icon or set a quantity, then complete checkout here.
              </p>
            ) : (
              <ul className={styles.basketList}>
                {lineItems.map((l) => (
                  <li key={l.id}>
                    {l.name} × {l.qty}
                  </li>
                ))}
              </ul>
            )}
            {hasPhysical && <p className={styles.basketNote}>UK shipping: £4.25 (added at checkout).</p>}
            {!hasPhysical && lineItems.some((l) => l.kind === 'digital') && (
              <p className={styles.basketNote}>Digital-only basket: no shipping.</p>
            )}

            <div className={styles.checkoutBlock}>
              <div className={styles.emailRow}>
                <label htmlFor="shop-email">Email for order confirmation (Stripe)</label>
                <input
                  id="shop-email"
                  type="email"
                  autoComplete="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </div>

              <label>
                <input type="checkbox" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} />
                <span>
                  I have read and agree to the{' '}
                  <Link href="/terms" target="_blank" rel="noopener noreferrer">
                    Shop Terms and Conditions
                  </Link>{' '}
                  and the{' '}
                  <Link href="/privacy" target="_blank" rel="noopener noreferrer">
                    Privacy Notice
                  </Link>
                  .
                </span>
              </label>

              <label>
                <input type="checkbox" checked={newsletter} onChange={(e) => setNewsletter(e.target.checked)} />
                <span>
                  I would like to receive the Dragonfly Psychotherapy newsletter (optional). See Privacy Notice for how
                  your data is used.
                </span>
              </label>

              {error && <p className={styles.error}>{error}</p>}

              {basketEmpty && (
                <p id="shop-basket-hint" className={styles.basketHint} role="status">
                  Add at least one item to your basket using the basket icon or quantity field on a
                  product, then click Pay with Stripe.
                </p>
              )}

              <button
                type="button"
                className={`${styles.btn}${basketEmpty ? ` ${styles.btnNeedsItems}` : ''}`}
                disabled={loading}
                aria-describedby={basketEmpty ? 'shop-basket-hint' : undefined}
                onClick={() => void goToCheckout()}
              >
                {loading ? 'Redirecting…' : 'Pay with Stripe'}
              </button>
            </div>
          </aside>

          <div className={styles.mainContent}>
            <section className={styles.grid} aria-label="Products">
              {catalog.map((item) => (
                <article key={item.id} id={item.slug} className={styles.card}>
                  <div className={styles.coverWrap}>
                    <Image
                      src={item.coverImage}
                      alt={coverAlt(item.name)}
                      width={320}
                      height={512}
                      className={styles.coverImg}
                      sizes="(max-width: 520px) 50vw, 140px"
                    />
                  </div>
                  <div className={styles.cardBody}>
                    <h2 className={styles.cardTitle}>{item.name}</h2>
                    <p className={styles.desc}>{item.shortDescription}</p>
                    {item.comingSoon ? (
                      <span className={styles.comingSoonLabel}>COMING SOON</span>
                    ) : item.isFree ? (
                      <Link className={styles.freeDownloadBtn} href={`/free/${item.slug}`}>
                        FREE DOWNLOAD
                      </Link>
                    ) : (
                      <div className={styles.qty}>
                        <label className={styles.qtyLabel} htmlFor={`qty-${item.id}`}>
                          Quantity
                        </label>
                        <div className={styles.qtyControls}>
                          <button
                            type="button"
                            className={styles.qtyAddButton}
                            aria-label={`Add one ${item.name} to basket`}
                            disabled={qtyFor(item.id) >= 99}
                            onClick={() => addOneToBasket(item.id)}
                          >
                            <span className={styles.qtyAddButtonIcon}>
                              <BasketIconGraphic />
                            </span>
                          </button>
                          <input
                            id={`qty-${item.id}`}
                            type="number"
                            min={0}
                            max={99}
                            value={qtyFor(item.id) || ''}
                            onChange={(e) => setQty(item.id, e.target.value)}
                            inputMode="numeric"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </section>

          </div>
        </div>
      </div>

      <section className={styles.faqSection} id="shipping-faq" aria-label="Shipping and returns">
        <div className={styles.faqInner}>
          <h2>Shipping, returns &amp; help</h2>
          <p>
            See the full <Link href="/faqs">Shop FAQs</Link> for ordering, digital downloads, returns, and contact
            details.
          </p>
          <h3>Shipping (UK)</h3>
          <p>
            We currently ship within the UK only. If your basket includes a paperback, postage and packaging is £4.25. We
            aim to post within 2–3 working days of payment.
          </p>
          <h3>Returns</h3>
          <p>
            Returns are accepted in line with the <Link href="/terms">Shop Terms</Link>. To cancel a physical order, you
            can email Victoria or use the <Link href="/cancellation">Cancellation Form</Link>. Unless the item is faulty
            or not as described, you are responsible for return postage.
          </p>
          <h3>Contact</h3>
          <p>
            Order questions:{' '}
            <a href="mailto:victoria@dragonflypsychotherapy.co.uk">victoria@dragonflypsychotherapy.co.uk</a>
          </p>
        </div>
      </section>
    </div>
  )
}
