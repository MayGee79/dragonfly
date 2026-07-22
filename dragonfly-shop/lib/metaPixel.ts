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

/** Load Meta Pixel and track PageView (only when analytics consent is given). */
export function loadMetaPixel(): void {
  if (typeof window === 'undefined' || !META_PIXEL_ID || !hasAnalyticsConsent()) return
  const w = fbqWindow()
  if (w.fbq) {
    w.fbq('track', 'PageView')
    return
  }

  const script = document.createElement('script')
  script.id = 'meta-pixel'
  script.innerHTML = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${META_PIXEL_ID}');
    fbq('track', 'PageView');
  `
  document.head.appendChild(script)
}

export function trackMetaPurchase(payload: MetaPurchasePayload): void {
  if (typeof window === 'undefined' || !hasAnalyticsConsent()) return

  loadMetaPixel()

  const w = fbqWindow()
  if (!w.fbq) return

  w.fbq('track', 'Purchase', {
    value: payload.value,
    currency: payload.currency,
    content_ids: payload.contentIds,
    content_type: 'product',
    num_items: payload.numItems,
    contents: payload.contents,
  })
}
