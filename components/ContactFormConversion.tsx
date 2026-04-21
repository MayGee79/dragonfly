'use client'

import { useEffect } from 'react'

const STORAGE_KEY = 'contact_form_submitted'

export function ContactFormConversion() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem(STORAGE_KEY) !== '1') return

    sessionStorage.removeItem(STORAGE_KEY)

    const w = window as { gtag?: (c: string, n: string, p?: object) => void; dataLayer?: unknown[] }
    if (typeof w.gtag === 'function') {
      w.gtag('event', 'contact_form_submit', { transport_type: 'beacon' })
    }
  }, [])

  return null
}
