import { NextResponse } from 'next/server'
import { subscribeToMailerLite } from '@/lib/mailerlite'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  let body: { email?: string }
  try {
    body = (await request.json()) as { email?: string }
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const email = body.email?.trim() ?? ''
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }

  const result = await subscribeToMailerLite({ email })
  if (!result.ok) {
    console.error('[newsletter-signup] subscribe failed:', result.error)
    return NextResponse.json(
      { error: 'Subscription failed. You can still download the guide.' },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true, alreadySubscribed: result.alreadySubscribed ?? false })
}
