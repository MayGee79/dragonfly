'use client'

import type { ClientCatalogItem } from '@/lib/catalog'
import { availabilityLabel, showsComingSoon } from '@/lib/catalog'
import type { Basket } from '@/lib/basket'
import styles from './ShopHome.module.css'

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

type BookBuyControlsProps = {
  editions: ClientCatalogItem[]
  basket: Basket
  chosenId: string
  controlKey: string
  onChoose: (id: string) => void
  onAddOne: (id: string) => void
  onSetQty: (id: string, raw: string) => void
}

export default function BookBuyControls({
  editions,
  basket,
  chosenId,
  controlKey,
  onChoose,
  onAddOne,
  onSetQty,
}: BookBuyControlsProps) {
  const hasFormats = editions.length > 1
  const item = editions.find((e) => e.id === chosenId) ?? editions[0]
  const qtyFor = (id: string) => basket[id] ?? 0

  if (showsComingSoon(item)) {
    return <span className={styles.comingSoonLabel}>{availabilityLabel(item)}</span>
  }

  return (
    <>
      {hasFormats ? (
        <fieldset className={styles.formats}>
          <legend className={styles.formatsLegend}>Format</legend>
          <div className={styles.formatOptions}>
            {editions.map((e) => {
              const inBasket = qtyFor(e.id)
              return (
                <label
                  key={e.id}
                  className={`${styles.formatOption}${e.id === item.id ? ` ${styles.formatOptionSelected}` : ''}`}
                >
                  <input
                    type="radio"
                    name={`format-${controlKey}`}
                    value={e.id}
                    checked={e.id === item.id}
                    onChange={() => onChoose(e.id)}
                  />
                  <span>{e.formatLabel ?? e.name}</span>
                  {e.priceLabel ? <span className={styles.formatPrice}>{e.priceLabel}</span> : null}
                  {inBasket > 0 ? (
                    <span className={styles.formatInBasket} title={`${inBasket} in basket`}>
                      ×{inBasket}
                    </span>
                  ) : null}
                </label>
              )
            })}
          </div>
        </fieldset>
      ) : item.priceLabel ? (
        <p className={styles.price}>{item.priceLabel}</p>
      ) : null}

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
            onClick={() => onAddOne(item.id)}
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
            onChange={(e) => onSetQty(item.id, e.target.value)}
            inputMode="numeric"
          />
        </div>
      </div>
    </>
  )
}
