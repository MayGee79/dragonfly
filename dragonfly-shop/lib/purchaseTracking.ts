import type Stripe from 'stripe'
import type { MetaPurchasePayload } from '@/lib/metaPixel'
import { getDownloadAccessDenial } from '@/lib/checkoutSession'
import { catalogItemByStripePriceId } from '@/lib/catalog'

/** Build Meta Purchase payload for a completed Stripe checkout session. */
export function metaPurchasePayloadFromSession(
  session: Stripe.Checkout.Session,
): MetaPurchasePayload | null {
  if (session.payment_status !== 'paid' || session.status !== 'complete') {
    return null
  }

  const denial = getDownloadAccessDenial(session)
  if (denial === 'not_paid' || denial === 'refunded') {
    return null
  }

  const contents: { id: string; quantity: number }[] = []
  let numItems = 0

  for (const li of session.line_items?.data ?? []) {
    const price = li.price
    if (!price || typeof price === 'string') continue
    if ('deleted' in price && price.deleted) continue
    const priceId = price.id
    if (!priceId) continue
    const cat = catalogItemByStripePriceId(priceId)
    const catalogId = cat?.id ?? priceId
    const qty = li.quantity ?? 1
    contents.push({ id: catalogId, quantity: qty })
    numItems += qty
  }

  if (numItems === 0) return null

  const amountTotal = session.amount_total ?? 0
  const value = Math.round(amountTotal) / 100
  const currency = (session.currency ?? 'gbp').toUpperCase()

  return {
    value,
    currency,
    contentIds: contents.map((item) => item.id),
    contents,
    numItems,
  }
}
