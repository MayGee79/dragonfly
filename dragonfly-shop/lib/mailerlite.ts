const MAILERLITE_ENDPOINT = 'https://connect.mailerlite.com/api/subscribers'

export type MailerLiteSubscribeResult =
  | { ok: true; alreadySubscribed?: boolean }
  | { ok: false; error: string }

/**
 * Add a subscriber via MailerLite double opt-in (status: unconfirmed).
 * Matches the Privacy Notice: confirmation email before marketing sends.
 */
export async function subscribeToMailerLite(email: string): Promise<MailerLiteSubscribeResult> {
  const apiKey = process.env.MAILERLITE_API_KEY
  if (!apiKey) {
    return { ok: false, error: 'MAILERLITE_API_KEY is not set' }
  }

  const trimmed = email.trim()
  if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return { ok: false, error: 'Invalid email' }
  }

  const body: Record<string, unknown> = {
    email: trimmed,
    status: 'unconfirmed',
  }

  const groupId = process.env.MAILERLITE_GROUP_ID?.trim()
  if (groupId) {
    body.groups = [groupId]
  }

  const res = await fetch(MAILERLITE_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (res.status === 409) {
    return { ok: true, alreadySubscribed: true }
  }

  if (res.status === 200 || res.status === 201) {
    return { ok: true }
  }

  const raw = await res.text().catch(() => '')
  console.error('[mailerlite] subscribe failed:', res.status, raw)
  return { ok: false, error: `MailerLite returned ${res.status}` }
}
