'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { ClientBook } from '@/lib/catalog'
import { readBasket, writeBasket, type Basket } from '@/lib/basket'
import BookBuyControls from '@/components/BookBuyControls'
import styles from './BookPage.module.css'

function coverAlt(title: string): string {
  if (title.includes('Handbook')) return 'Cover: Rejection Sensitive Dysphoria handbook'
  if (title.includes('Workbook')) return 'Cover: Rejection Sensitive Dysphoria companion workbook'
  if (title.includes('Compendium')) return 'Cover: Strength Beneath Compendium'
  if (title.includes('30 Day')) return 'Cover: Strength Beneath 30 Day Challenge'
  if (title.includes('Year Beneath')) return 'Cover: The Year Beneath'
  return `Cover: ${title}`
}

export default function BookPage({ book }: { book: ClientBook }) {
  const [basket, setBasket] = useState<Basket>({})
  const [basketReady, setBasketReady] = useState(false)
  const [chosenId, setChosenId] = useState(book.editions[0]?.id ?? '')
  const [justAdded, setJustAdded] = useState(false)

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
    setJustAdded(true)
  }

  const setQty = (id: string, raw: string) => {
    const n = Math.max(0, Math.min(99, parseInt(raw, 10) || 0))
    setBasket((prev) => {
      const next = { ...prev }
      if (n === 0) delete next[id]
      else next[id] = n
      return next
    })
    if (n > 0) setJustAdded(true)
  }

  return (
    <div className={styles.wrap}>
      <Link href="/#basket" className={styles.backLink}>
        &larr; Back to the shop
      </Link>

      <article className={styles.card}>
        <div className={styles.coverWrap}>
          <Image
            src={book.coverImage}
            alt={coverAlt(book.title)}
            width={280}
            height={448}
            className={styles.coverImg}
            priority
            sizes="(max-width: 640px) 220px, 280px"
          />
        </div>

        <div className={styles.body}>
          {book.section ? <p className={styles.sectionLabel}>{book.section}</p> : null}
          <h1 className={styles.title}>{book.title}</h1>
          <p className={styles.desc}>{book.description}</p>

          <BookBuyControls
            editions={book.editions}
            basket={basket}
            chosenId={chosenId}
            controlKey={book.bookSlug}
            onChoose={setChosenId}
            onAddOne={addOneToBasket}
            onSetQty={setQty}
          />

          {justAdded ? (
            <p className={styles.addedNote} role="status">
              Added to your basket.{' '}
              <Link href="/#basket">Go to checkout</Link>
            </p>
          ) : (
            <p className={styles.basketHint}>
              Choose a format and add it to your basket, then{' '}
              <Link href="/#basket">complete checkout on the shop page</Link>.
            </p>
          )}
        </div>
      </article>
    </div>
  )
}
