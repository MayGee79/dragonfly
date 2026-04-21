'use client'

import styles from './Footer.module.css'

export default function CookieSettingsButton() {
  const openCookieSettings = () => {
    try {
      localStorage.removeItem('dragonfly_cookie_consent')
    } catch {
      // ignore
    }
    window.dispatchEvent(new Event('dragonfly:cookie-settings'))
  }

  return (
    <button type="button" onClick={openCookieSettings} className={styles.cookieSettings}>
      Cookie settings
    </button>
  )
}

