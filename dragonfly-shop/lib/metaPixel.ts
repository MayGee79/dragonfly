export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '1567033625209529'

export const COOKIE_CONSENT_KEY = 'dragonflyshop_cookie_consent'
export const COOKIE_CONSENT_ACCEPTED = 'accepted'

export type MetaPurchasePayload = {
  value: number
  currency: string
  contentIds: string[]
  contents: { id: string; quantity: number }[]
  numItems: number
}

/**
 * Base Pixel bootstrap for <head>.
 * Always present so Meta’s website scanner can detect the install.
 * Starts in `consent: revoke` so no tracking/cookies until the visitor accepts.
 * @see https://developers.facebook.com/docs/meta-pixel/implementation/gdpr
 */
export function metaPixelHeadBootstrapScript(pixelId: string = META_PIXEL_ID): string {
  return `
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('consent','revoke');
fbq('init','${pixelId}');
`.trim()
}

function fbqWindow(): Window & { fbq?: (...args: unknown[]) => void } {
  return window as Window & { fbq?: (...args: unknown[]) => void }
}

export function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return localStorage.getItem(COOKIE_CONSENT_KEY) === COOKIE_CONSENT_ACCEPTED
  } catch {
    return false
  }
}

/** Pause Meta tracking (call on every page until consent, and on Reject). */
export function revokeMetaConsent(): void {
  if (typeof window === 'undefined') return
  const w = fbqWindow()
  if (w.fbq) w.fbq('consent', 'revoke')
}

/**
 * Grant Meta consent and send PageView.
 * Base pixel must already be in the page (layout head bootstrap).
 */
export function loadMetaPixel(): void {
  if (typeof window === 'undefined' || !META_PIXEL_ID || !hasAnalyticsConsent()) return
  const w = fbqWindow()
  if (!w.fbq) return
  w.fbq('consent', 'grant')
  w.fbq('track', 'PageView')
}

export function trackMetaPurchase(payload: MetaPurchasePayload): void {
  if (typeof window === 'undefined' || !hasAnalyticsConsent()) return

  const w = fbqWindow()
  if (!w.fbq) return

  w.fbq('consent', 'grant')
  w.fbq('track', 'Purchase', {
    value: payload.value,
    currency: payload.currency,
    content_ids: payload.contentIds,
    content_type: 'product',
    num_items: payload.numItems,
    contents: payload.contents,
  })
}
