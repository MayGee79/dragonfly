'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { ClientCatalogItem } from '@/lib/catalog'
import styles from './ShopHome.module.css'

type Basket = Record<string, number>

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

export default function ShopHome({ catalog }: { catalog: ClientCatalogItem[] }) {
  const [basket, setBasket] = useState<Basket>({})
  const [customerEmail, setCustomerEmail] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [newsletter, setNewsletter] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const qtyFor = (id: string) => basket[id] ?? 0

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

  const hasPhysical = lineItems.some((l) => l.kind === 'physical')

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
    <div className={styles.wrap}>
      <header className={styles.hero} id="top">
        <div className={styles.heroBrand}>
          <div className={styles.heroLogo}>
            <Image
              src="/images/dragonfly_logo_transparent.png"
              alt="Dragonfly Psychotherapy"
              width={120}
              height={120}
              priority
            />
          </div>
          <h1 className={styles.shopTitle}>SHOP</h1>
        </div>
        <p className={styles.heroIntro}>
          Buy handbooks and workbooks directly from Dr Victoria Froome. UK postage £4.25 when your basket includes a
          paperback. Digital editions: after payment you will get secure download links on the thank-you page (see Shop
          Terms for how digital delivery works).
        </p>
      </header>

      <div className={styles.mainLayout}>
        <aside className={styles.basket} aria-label="Basket and checkout">
          <h2 className={styles.basketHeading}>Basket</h2>
          {lineItems.length === 0 ? (
            <p className={styles.basketEmpty}>Add quantities on the right, then complete checkout here.</p>
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

            <button
              type="button"
              className={styles.btn}
              disabled={loading || lineItems.length === 0}
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
                <div className={styles.cardHeader}>
                  <h2>{item.name}</h2>
                </div>
                <p className={styles.desc}>{item.shortDescription}</p>
                <div className={styles.row}>
                  <div className={styles.qty}>
                    <label htmlFor={`qty-${item.id}`}>Quantity</label>
                    <input
                      id={`qty-${item.id}`}
                      type="number"
                      min={0}
                      max={99}
                      value={qtyFor(item.id) || ''}
                      onChange={(e) => setQty(item.id, e.target.value)}
                    />
                  </div>
                </div>
              </article>
            ))}
          </section>

          <section className={styles.faq} id="shipping-faq" aria-label="Shipping and returns">
            <h2>Shipping, returns & contact</h2>
            <h3>Shipping (UK)</h3>
            <p>
              We currently ship within the UK only. If your basket includes a paperback, postage and packaging is £4.25.
              We aim to post within 2–3 working days of payment.
            </p>
            <h3>Returns</h3>
            <p>
              Returns are accepted in line with the Shop Terms. Unless the item is faulty or not as described, you are
              responsible for return postage.
            </p>
            <h3>Contact</h3>
            <p>
              Order questions:{' '}
              <a href="mailto:victoria@dragonflypsychotherapy.co.uk">victoria@dragonflypsychotherapy.co.uk</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
