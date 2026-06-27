import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getStripe } from '@/lib/stripe'
import { subscribeToMailerLite } from '@/lib/mailerlite'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    console.error('[stripe-webhook] STRIPE_WEBHOOK_SECRET is not set')
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 503 })
  }

  const signature = request.headers.get('stripe-signature')
  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature' }, { status: 400 })
  }

  const body = await request.text()
  let event: Stripe.Event

  try {
    const stripe = getStripe()
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Invalid signature'
    console.error('[stripe-webhook] signature verification failed:', message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const optedIn = session.metadata?.newsletter_opt_in === 'true'

    if (optedIn) {
      const email =
        session.customer_email?.trim() ||
        session.customer_details?.email?.trim() ||
        ''

      if (email) {
        const result = await subscribeToMailerLite({ email })
        if (!result.ok) {
          console.error('[stripe-webhook] newsletter subscribe failed:', result.error, {
            sessionId: session.id,
            email,
          })
        }
      } else {
        console.error('[stripe-webhook] newsletter opt-in but no email on session', session.id)
      }
    }
  }

  return NextResponse.json({ received: true })
}
