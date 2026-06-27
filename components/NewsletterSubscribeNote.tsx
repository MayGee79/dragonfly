'use client'

import { useEffect, useState } from 'react'
import { NEWSLETTER_SUBSCRIBED_SESSION_KEY, NEWSLETTER_THANK_YOU_MESSAGE } from '@/lib/newsletterCopy'
import styles from './NewsletterSubscribeNote.module.css'

export default function NewsletterSubscribeNote() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem(NEWSLETTER_SUBSCRIBED_SESSION_KEY) === '1') {
      sessionStorage.removeItem(NEWSLETTER_SUBSCRIBED_SESSION_KEY)
      setVisible(true)
    }
  }, [])

  if (!visible) return null

  return (
    <p className={styles.note} role="status">
      {NEWSLETTER_THANK_YOU_MESSAGE}
    </p>
  )
}
