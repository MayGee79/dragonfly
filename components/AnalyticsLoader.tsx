'use client'

import { useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

const CONSENT_KEY = 'dragonfly_cookie_consent'
const CONSENT_ACCEPTED = 'accepted'

export default function AnalyticsLoader() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    try {
      setEnabled(localStorage.getItem(CONSENT_KEY) === CONSENT_ACCEPTED)
    } catch {
      setEnabled(false)
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  )
}

