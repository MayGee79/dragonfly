/** Browser basket keyed by catalog edition id. Shared by the shop and book pages. */

export type Basket = Record<string, number>

const STORAGE_KEY = 'dragonfly-shop-basket'

export function readBasket(): Basket {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as unknown
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {}
    const out: Basket = {}
    for (const [id, qty] of Object.entries(parsed as Record<string, unknown>)) {
      const n = typeof qty === 'number' ? qty : Number(qty)
      if (Number.isFinite(n) && n > 0) out[id] = Math.min(99, Math.floor(n))
    }
    return out
  } catch {
    return {}
  }
}

export function writeBasket(basket: Basket): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(basket))
  } catch {
    // Private mode / quota — keep in-memory state only.
  }
}
