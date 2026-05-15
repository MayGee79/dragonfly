'use client'

import styles from './Footer.module.css'

const CONSENT_KEY = 'dragonflyshop_cookie_consent'
const OPEN_SETTINGS_EVENT = 'dragonfly:cookie-settings'

export default function ShopCookieSettingsButton() {
  const openCookieSettings = () => {
    try {
      localStorage.removeItem(CONSENT_KEY)
    } catch {
      // ignore
    }
    window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))
  }

  return (
    <button type="button" onClick={openCookieSettings} className={styles.cookieSettings}>
      Cookie Settings
    </button>
  )
}
