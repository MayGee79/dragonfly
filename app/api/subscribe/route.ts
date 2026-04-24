import { NextRequest, NextResponse } from 'next/server'

const MAILERLITE_ENDPOINT = 'https://connect.mailerlite.com/api/subscribers'

type Body = {
  email?: unknown
  firstName?: unknown
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.MAILERLITE_API_KEY
  if (!apiKey) {
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

  const res = await fetch(MAILERLITE_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      fields: { name: firstName },
      status: 'active',
    }),
  })

  if (res.status === 409) {
    return NextResponse.json({ ok: true, alreadySubscribed: true }, { status: 409 })
  }

  if (res.status === 200 || res.status === 201) {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  const raw = await res.text().catch(() => '')
  console.error('MailerLite subscribe error:', res.status, raw)
  return NextResponse.json({ error: 'Subscription failed' }, { status: 500 })
}
