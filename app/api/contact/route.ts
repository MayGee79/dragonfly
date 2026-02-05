import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const CONTACT_EMAIL_TO = process.env.CONTACT_EMAIL_TO || 'victoria@dragonflypsychotherapy.co.uk'
// Resend free tier without domain: can only send TO your Resend account email. Set this for local testing.
const CONTACT_EMAIL_OVERRIDE_TO = process.env.CONTACT_EMAIL_OVERRIDE_TO
// Use onboarding@resend.dev until domain is verified; then set CONTACT_EMAIL_FROM to e.g. contact@dragonflypsychotherapy.co.uk
const CONTACT_EMAIL_FROM = process.env.CONTACT_EMAIL_FROM || 'onboarding@resend.dev'

export async function POST(request: NextRequest) {
  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set')
    return NextResponse.json(
      { error: 'Email is not configured. Please try again later.' },
      { status: 503 }
    )
  }

  let body: { name?: string; email?: string; phone?: string; message?: string; consent?: boolean; marketing?: boolean }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { name, email, message, consent } = body
  const phone = body.phone || ''
  const marketing = body.marketing === true

  if (!name || typeof name !== 'string' || !name.trim()) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 })
  }
  if (!email || typeof email !== 'string' || !email.trim()) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }
  if (!message || typeof message !== 'string' || !message.trim()) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 })
  }
  if (consent !== true) {
    return NextResponse.json({ error: 'Consent is required' }, { status: 400 })
  }

  const resend = new Resend(RESEND_API_KEY)
  // When domain not verified, Resend only allows sending to your account email. Override sends everything there for testing.
  const enquiryTo = CONTACT_EMAIL_OVERRIDE_TO || CONTACT_EMAIL_TO

  // 1. Email to you (Victoria) with the enquiry
  const enquirySubject = CONTACT_EMAIL_OVERRIDE_TO ? `[Test] Website enquiry from ${name.trim()}` : `Website enquiry from ${name.trim()}`
  const enquiryHtml = `
    <p><strong>Name:</strong> ${escapeHtml(name.trim())}</p>
    <p><strong>Email:</strong> ${escapeHtml(email.trim())}</p>
    <p><strong>Phone:</strong> ${phone ? escapeHtml(phone.trim()) : '(not provided)'}</p>
    <p><strong>Marketing consent:</strong> ${marketing ? 'Yes' : 'No'}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message.trim()).replace(/\n/g, '<br>')}</p>
  `

  const { data: enquiryData, error: enquiryError } = await resend.emails.send({
    from: CONTACT_EMAIL_FROM,
    to: enquiryTo,
    subject: enquirySubject,
    html: enquiryHtml,
    replyTo: email.trim(),
  })

  if (enquiryError) {
    console.error('Resend enquiry error:', enquiryError)
    const rawMessage =
      typeof enquiryError === 'object' && enquiryError !== null && 'message' in enquiryError
        ? String((enquiryError as { message?: unknown }).message)
        : String(enquiryError)
    const message =
      process.env.NODE_ENV === 'development'
        ? rawMessage || 'Resend error (check server logs)'
        : 'Failed to send your message. Please try again or email directly.'
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }

  // 2. Confirmation email: to submitter, or to override address when testing (Resend only allows your email until domain verified)
  const confirmTo = CONTACT_EMAIL_OVERRIDE_TO || email.trim()
  const confirmSubject = CONTACT_EMAIL_OVERRIDE_TO
    ? `[Test] Confirmation copy for ${email.trim()} - Dragonfly Psychotherapy`
    : "We've received your message - Dragonfly Psychotherapy"
  const confirmHtml = `
    <p>Thank you for getting in touch.</p>
    <p>Your message has been sent successfully. I'll get back to you as soon as possible. Please check your spam folder if you don't hear from me within 24 hours.</p>
    <p>Best wishes,<br>Victoria Froome<br>Dragonfly Psychotherapy</p>
  `

  const { error: confirmError } = await resend.emails.send({
    from: CONTACT_EMAIL_FROM,
    to: confirmTo,
    subject: confirmSubject,
    html: confirmHtml,
  })

  if (confirmError) {
    // Enquiry was sent; only confirmation failed. Log but don't fail the request.
    console.error('Resend confirmation error:', confirmError)
  }

  return NextResponse.json({ ok: true, id: enquiryData?.id })
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (c) => map[c] ?? c)
}
