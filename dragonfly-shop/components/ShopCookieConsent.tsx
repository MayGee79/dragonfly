'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './CookieConsent.module.css'

const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-39GL2MNTGV'
const CONSENT_KEY = 'dragonflyshop_cookie_consent'
const CONSENT_ACCEPTED = 'accepted'
const CONSENT_REJECTED = 'rejected'
const OPEN_SETTINGS_EVENT = 'dragonfly:cookie-settings'

function loadGoogleAnalytics() {
  if (typeof window === 'undefined') return
  if ((window as { gtag?: () => void }).gtag) return

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
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}');
    `
    document.head.appendChild(script2)
  }
}

function clearCookie(name: string) {
  if (typeof document === 'undefined') return
  const host = window.location.hostname
  const domainParts = host.split('.')
  const domains: string[] = ['']
  if (domainParts.length >= 2) {
    for (let i = 0; i <= domainParts.length - 2; i++) {
      domains.push(`.${domainParts.slice(i).join('.')}`)
    }
  }
  for (const domain of domains) {
    const domainAttr = domain ? `; Domain=${domain}` : ''
    document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Max-Age=0${domainAttr}; SameSite=Lax`
  }
}

function clearAnalyticsCookies() {
  clearCookie('_ga')
  clearCookie('_gid')
  clearCookie('_gat')
  if (typeof document !== 'undefined') {
    const matches = document.cookie.match(/(?:^|;\s*)(_ga_[A-Z0-9]+)=/gi)
    if (matches) {
      for (const m of matches) {
        const name = m.split('=')[0].replace(/^\s*;\s*/g, '').trim()
        if (name) clearCookie(name)
      }
    }
  }
}

export default function ShopCookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const syncFromStorage = () => {
      const consent = localStorage.getItem(CONSENT_KEY)
      if (consent === CONSENT_ACCEPTED) {
        loadGoogleAnalytics()
        setVisible(false)
      } else if (consent === CONSENT_REJECTED) {
        setVisible(false)
      } else {
        setVisible(true)
      }
    }

    syncFromStorage()

    const onOpenSettings = () => {
      try {
        localStorage.removeItem(CONSENT_KEY)
      } catch {
        // ignore
      }
      setVisible(true)
    }

    window.addEventListener(OPEN_SETTINGS_EVENT, onOpenSettings)
    window.addEventListener('storage', syncFromStorage)
    return () => {
      window.removeEventListener(OPEN_SETTINGS_EVENT, onOpenSettings)
      window.removeEventListener('storage', syncFromStorage)
    }
  }, [])

  function accept() {
    localStorage.setItem(CONSENT_KEY, CONSENT_ACCEPTED)
    loadGoogleAnalytics()
    setVisible(false)
  }

  function reject() {
    localStorage.setItem(CONSENT_KEY, CONSENT_REJECTED)
    clearAnalyticsCookies()
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className={styles.banner} role="region" aria-label="Cookie consent">
      <p className={styles.text}>
        We use Google Analytics cookies to understand how the site is used so it can be improved. You can accept or reject
        these at any time. Essential cookies needed to run the site are always on. See our{' '}
        <Link href="/privacy" className={styles.link}>
          Privacy Notice
        </Link>
        .
      </p>
      <div className={styles.buttons}>
        <button type="button" onClick={accept} className={styles.accept} aria-label="Accept Google Analytics cookies">
          Accept
        </button>
        <button type="button" onClick={reject} className={styles.reject} aria-label="Reject Google Analytics cookies">
          Reject
        </button>
      </div>
    </div>
  )
}
