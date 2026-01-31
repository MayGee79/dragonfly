'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './CookieConsent.module.css'

const GA_MEASUREMENT_ID = 'G-39GL2MNTGV'
const CONSENT_KEY = 'cookie-consent'

function loadGoogleAnalytics() {
  if (typeof window === 'undefined') return
  if ((window as { gtag?: () => void }).gtag) return // Already loaded

  const script1 = document.createElement('script')
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  script1.async = true
  document.head.appendChild(script1)

  script1.onload = () => {
    const script2 = document.createElement('script')
    script2.id = 'google-analytics'
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}');
    `
    document.head.appendChild(script2)
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY)
    if (consent === 'accepted') {
      loadGoogleAnalytics()
      setVisible(false)
    } else if (consent === 'declined') {
      setVisible(false)
    } else {
      setVisible(true)
    }
  }, [])

  function accept() {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    loadGoogleAnalytics()
    setVisible(false)
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className={styles.banner} role="dialog" aria-label="Cookie consent">
      <p className={styles.text}>
        We use cookies for analytics to understand how visitors use this site.
        See our{' '}
        <Link href="/privacy-policy" className={styles.link}>
          Privacy Policy
        </Link>
        .
      </p>
      <div className={styles.buttons}>
        <button type="button" onClick={accept} className={styles.accept}>
          Accept
        </button>
        <button type="button" onClick={decline} className={styles.decline}>
          Decline
        </button>
      </div>
    </div>
  )
}
