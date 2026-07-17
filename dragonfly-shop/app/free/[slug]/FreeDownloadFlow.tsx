'use client'

import Link from 'next/link'
import { useState } from 'react'
import { NEWSLETTER_THANK_YOU_MESSAGE } from '@/lib/newsletterCopy'
import styles from './FreeGuide.module.css'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

export default function FreeDownloadFlow({ catalogId }: { catalogId: string }) {
  const [promptOpen, setPromptOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<string | null>(null)

  const downloadUrl = `/api/free-download?catalog=${encodeURIComponent(catalogId)}`

  function startDownload() {
    window.location.assign(downloadUrl)
  }

  async function joinAndDownload() {
    setError(null)
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address, or choose "No thanks, just download".')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/newsletter-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      if (res.ok) {
        setStatus(NEWSLETTER_THANK_YOU_MESSAGE)
      } else {
        const data = (await res.json().catch(() => null)) as { error?: string } | null
        setStatus(data?.error || 'Subscription failed - your download is starting anyway.')
      }
    } catch {
      setStatus('Subscription failed - your download is starting anyway.')
    } finally {
      setSubmitting(false)
      startDownload()
    }
  }

  function skipAndDownload() {
    setError(null)
    setStatus('Your download is starting.')
    startDownload()
  }

  if (!promptOpen) {
    return (
      <button type="button" className={styles.downloadBtn} onClick={() => setPromptOpen(true)}>
        DOWNLOAD THE GUIDE
      </button>
    )
  }

  return (
    <div className={styles.prompt} role="region" aria-label="Newsletter invitation">
      <h2 className={styles.promptHeading}>Would you like to join the mailing list?</h2>
      <p className={styles.promptText}>
        Roughly once a month: reflections, resources, and news from Dragonfly Psychotherapy. You can
        unsubscribe at any time. Either way, your free guide will download.
      </p>

      <div className={styles.emailRow}>
        <label htmlFor="free-guide-email">Email address (only needed to join)</label>
        <input
          id="free-guide-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          disabled={submitting}
        />
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.promptActions}>
        <button
          type="button"
          className={styles.downloadBtn}
          disabled={submitting}
          onClick={() => void joinAndDownload()}
        >
          {submitting ? 'Joining…' : 'Join and download'}
        </button>
        <button type="button" className={styles.skipBtn} disabled={submitting} onClick={skipAndDownload}>
          No thanks, just download
        </button>
      </div>

      {status && (
        <p className={styles.status} role="status">
          {status}
        </p>
      )}

      <p className={styles.privacyNote}>
        See the <Link href="/privacy">Privacy Notice</Link> for how your data is used.
      </p>
    </div>
  )
}
