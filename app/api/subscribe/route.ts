import { NextRequest, NextResponse } from 'next/server'
import { subscribeToMailerLite } from '@/lib/mailerlite'

type Body = {
  email?: unknown
  firstName?: unknown
}

export async function POST(request: NextRequest) {
  if (!process.env.MAILERLITE_API_KEY) {
    console.error('MAILERLITE_API_KEY is not set')
    return NextResponse.json({ error: 'MailerLite is not configured' }, { status: 503 })
  }

  let body: Body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const firstName = typeof body.firstName === 'string' ? body.firstName.trim() : ''

  if (!firstName) return NextResponse.json({ error: 'First name is required' }, { status: 400 })
  if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 })

  const result = await subscribeToMailerLite({ email, firstName })

  if (result.ok && result.alreadySubscribed) {
    return NextResponse.json({ ok: true, alreadySubscribed: true }, { status: 409 })
  }

  if (result.ok) {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  return NextResponse.json({ error: 'Subscription failed' }, { status: 500 })
}
