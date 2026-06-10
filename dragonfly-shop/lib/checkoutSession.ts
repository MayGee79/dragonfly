import type Stripe from 'stripe'
import { getStripe } from '@/lib/stripe'

const DEFAULT_MAX_AGE_DAYS = 30

export function downloadLinkMaxAgeDays(): number {
  const raw = process.env.SHOP_DOWNLOAD_MAX_AGE_DAYS?.trim()
  if (!raw) return DEFAULT_MAX_AGE_DAYS
  const parsed = Number.parseInt(raw, 10)
  if (!Number.isFinite(parsed) || parsed < 1 || parsed > 365) return DEFAULT_MAX_AGE_DAYS
  return parsed
}

export const CHECKOUT_SESSION_EXPAND: Stripe.Checkout.SessionRetrieveParams['expand'] = [
  'line_items.data.price',
  'payment_intent.latest_charge',
]

export async function retrieveCheckoutSession(sessionId: string): Promise<Stripe.Checkout.Session | null> {
  if (!sessionId.startsWith('cs_')) return null

  try {
    const stripe = getStripe()
    return await stripe.checkout.sessions.retrieve(sessionId, {
      expand: CHECKOUT_SESSION_EXPAND,
    })
  } catch {
    return null
  }
}

export type DownloadAccessDenial = 'not_found' | 'not_paid' | 'refunded' | 'expired'

export function getDownloadAccessDenial(session: Stripe.Checkout.Session): DownloadAccessDenial | null {
  if (session.payment_status !== 'paid' || session.status !== 'complete') {
    return 'not_paid'
  }

  if (isCheckoutSessionRefunded(session)) {
    return 'refunded'
  }

  const maxAgeDays = downloadLinkMaxAgeDays()
  const expiresAtMs = (session.created + maxAgeDays * 24 * 60 * 60) * 1000
  if (Date.now() > expiresAtMs) {
    return 'expired'
  }

  return null
}

function isCheckoutSessionRefunded(session: Stripe.Checkout.Session): boolean {
  const paymentIntent = session.payment_intent
  if (!paymentIntent || typeof paymentIntent === 'string') return false

  const charge = paymentIntent.latest_charge
  if (!charge || typeof charge === 'string') return false

  if (charge.refunded) return true
  if ((charge.amount_refunded ?? 0) > 0) return true

  return false
}

export function downloadAccessMessage(denial: DownloadAccessDenial): string {
  switch (denial) {
    case 'not_found':
      return 'We could not find that order.'
    case 'not_paid':
      return 'Payment was not completed for this order.'
    case 'refunded':
      return 'This order was refunded and downloads are no longer available.'
    case 'expired':
      return `Download links expire ${downloadLinkMaxAgeDays()} days after purchase. Please contact the shop if you need help.`
    default: {
      const exhaustive: never = denial
      return exhaustive
    }
  }
}
