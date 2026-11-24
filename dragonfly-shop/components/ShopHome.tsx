'use client'

import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import type { ClientCatalogItem } from '@/lib/catalog'
import { readBasket, writeBasket, type Basket } from '@/lib/basket'
import BookBuyControls from '@/components/BookBuyControls'
import styles from './ShopHome.module.css'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

function productGroups(catalog: ClientCatalogItem[]) {
  const groups: { title?: string; items: ClientCatalogItem[] }[] = []
  for (const item of catalog) {
    const title = item.section
    const last = groups[groups.length - 1]
    if (last && last.title === title) last.items.push(item)
    else groups.push({ title, items: [item] })
  }
  return groups
}

type BookCard = {
  /** Stable key for the card: the id of its first edition. */
  key: string
  title: string
  bookTitle?: string
  bookSlug?: string
  teaser: string
  editions: ClientCatalogItem[]
}

/** One card per book: consecutive editions sharing a bookTitle are merged. */
function bookCards(items: ClientCatalogItem[]): BookCard[] {
  const cards: BookCard[] = []
  for (const item of items) {
    const last = cards[cards.length - 1]
    if (item.bookTitle && last && last.bookTitle === item.bookTitle) {
      last.editions.push(item)
      continue
    }
    cards.push({
      key: item.id,
      title: item.bookTitle ?? item.name,
      bookTitle: item.bookTitle,
      bookSlug: item.bookSlug,
      teaser: item.teaser ?? (item.comingSoon ? '' : item.shortDescription),
      editions: [item],
    })
  }
  return cards
}

function coverAlt(name: string): string {
  if (name.includes('Handbook')) return 'Cover: Rejection Sensitive Dysphoria handbook'
  if (name.includes('Workbook')) return 'Cover: Rejection Sensitive Dysphoria companion workbook'
  if (name.includes('Compendium')) return 'Cover: Strength Beneath® Compendium'
  if (name.includes('30 Day')) return 'Cover: Strength Beneath® 30 Day Challenge'
  if (name.includes('Colouring') || name.includes('Coloring')) {
    return 'Cover: Strength Beneath® Colouring Book'
  }
  if (name.includes('Year Beneath')) return 'Cover: The Year Beneath'
  return name
}

function moreAboutHref(card: BookCard): string | null {
  if (card.bookSlug) return `/books/${card.bookSlug}`
  return null
}

export default function ShopHome({ catalog }: { catalog: ClientCatalogItem[] }) {
  const [basket, setBasket] = useState<Basket>({})
  const [basketReady, setBasketReady] = useState(false)
  /** Card key → id of the edition picked in that card's format picker. */
  const [chosenEdition, setChosenEdition] = useState<Record<string, string>>({})
  const [customerEmail, setCustomerEmail] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [newsletter, setNewsletter] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const basketRef = useRef<HTMLElement>(null)
  const prevLineCountRef = useRef(0)

  useEffect(() => {
    setBasket(readBasket())
    setBasketReady(true)
  }, [])

  useEffect(() => {
    if (!basketReady) return
    writeBasket(basket)
  }, [basket, basketReady])

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
          <aside ref={basketRef} id="basket" className={styles.basket} aria-label="Basket and checkout">
            <h2 className={styles.basketHeading}>Basket</h2>
            {lineItems.length === 0 ? (
              <p className={styles.basketEmpty}>
                Choose a format, click the basket icon or set a quantity, then complete checkout here.
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
            <div aria-label="Products">
              {productGroups(catalog).map((group) => (
                <section key={group.title ?? 'shop'} className={styles.collection} aria-label={group.title ?? 'Shop'}>
                  {group.title ? <h2 className={styles.collectionHeading}>{group.title}</h2> : null}
                  <div className={styles.grid}>
                    {bookCards(group.items).map((card) => {
                      const item =
                        card.editions.find((e) => e.id === chosenEdition[card.key]) ?? card.editions[0]
                      const detailHref = moreAboutHref(card)
                      return (
                        <article key={card.key} id={card.editions[0].slug} className={styles.card}>
                          {/* Keep each edition's old #anchor working now that editions share a card. */}
                          {card.editions.slice(1).map((e) => (
                            <span key={e.id} id={e.slug} className={styles.editionAnchor} />
                          ))}
                          <div className={styles.coverWrap}>
                            <Image
                              src={item.coverImage}
                              alt={coverAlt(card.title)}
                              width={200}
                              height={320}
                              className={styles.coverImg}
                              sizes="(max-width: 520px) 40vw, 110px"
                            />
                          </div>
                          <div className={styles.cardBody}>
                            <h2 className={styles.cardTitle}>{card.title}</h2>
                            {card.teaser ? <p className={styles.teaser}>{card.teaser}</p> : null}
                            {detailHref ? (
                              <Link href={detailHref} className={styles.moreAbout}>
                                More about this book
                              </Link>
                            ) : null}
                            {item.isFree ? (
                              <Link className={styles.freeDownloadBtn} href={`/free/${item.slug}`}>
                                FREE DOWNLOAD
                              </Link>
                            ) : (
                              <BookBuyControls
                                editions={card.editions}
                                basket={basket}
                                chosenId={item.id}
                                controlKey={card.key}
                                onChoose={(id) =>
                                  setChosenEdition((prev) => ({ ...prev, [card.key]: id }))
                                }
                                onAddOne={addOneToBasket}
                                onSetQty={setQty}
                              />
                            )}
                          </div>
                        </article>
                      )
                    })}
                  </div>
                </section>
              ))}
            </div>
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
            We currently ship within the UK only. If your basket includes a physical book, postage and packaging is £4.25. We
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
