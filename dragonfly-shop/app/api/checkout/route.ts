import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { CATALOG, stripePriceIdForCatalogId } from '@/lib/catalog'
import { getStripe } from '@/lib/stripe'

export const dynamic = 'force-dynamic'

type CheckoutBody = {
  items: { id: string; quantity: number }[]
  customerEmail: string
  acceptTerms: boolean
  newsletter?: boolean
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CheckoutBody
    if (!body.acceptTerms) {
      return NextResponse.json({ error: 'Terms must be accepted.' }, { status: 400 })
    }
    if (!body.customerEmail || !isValidEmail(body.customerEmail)) {
      return NextResponse.json({ error: 'Valid customer email is required.' }, { status: 400 })
    }
    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json({ error: 'Basket is empty.' }, { status: 400 })
    }

    const merged = new Map<string, number>()
    for (const row of body.items) {
      if (!row.id || typeof row.quantity !== 'number') {
        return NextResponse.json({ error: 'Invalid line item.' }, { status: 400 })
      }
      if (row.quantity < 1 || row.quantity > 99) {
        return NextResponse.json({ error: 'Invalid quantity.' }, { status: 400 })
      }
      merged.set(row.id, (merged.get(row.id) || 0) + row.quantity)
    }

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = []
    let hasPhysical = false
    let hasDigital = false

    for (const [catalogId, quantity] of merged.entries()) {
      const product = CATALOG.find((c) => c.id === catalogId)
      if (!product) {
        return NextResponse.json({ error: `Unknown product: ${catalogId}` }, { status: 400 })
      }
      if (product.kind === 'physical') hasPhysical = true
      if (product.kind === 'digital') hasDigital = true
      const price = stripePriceIdForCatalogId(catalogId)
      lineItems.push({ price, quantity })
    }

    const digitalWaiverMeta = !hasDigital ? 'not_required' : 'immediate'

    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001').replace(/\/$/, '')

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: 'payment',
      customer_email: body.customerEmail.trim(),
      line_items: lineItems,
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/`,
      payment_intent_data: {
        receipt_email: body.customerEmail.trim(),
        metadata: {
          digital_waiver: digitalWaiverMeta,
          newsletter_opt_in: body.newsletter ? 'true' : 'false',
        },
      },
      metadata: {
        digital_waiver: digitalWaiverMeta,
        newsletter_opt_in: body.newsletter ? 'true' : 'false',
      },
      allow_promotion_codes: false,
    }

    if (hasPhysical) {
      sessionParams.shipping_address_collection = { allowed_countries: ['GB'] }
      sessionParams.shipping_options = [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 425, currency: 'gbp' },
            display_name: 'UK postage & packaging',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 2 },
              maximum: { unit: 'business_day', value: 5 },
            },
          },
        },
      ]
    }

    const stripe = getStripe()
    const session = await stripe.checkout.sessions.create(sessionParams)

    if (!session.url) {
      return NextResponse.json({ error: 'Stripe did not return a checkout URL.' }, { status: 500 })
    }

    return NextResponse.json({ url: session.url })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Checkout failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
