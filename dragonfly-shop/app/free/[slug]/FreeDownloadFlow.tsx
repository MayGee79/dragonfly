'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { FreeDownloadFormat } from '@/lib/catalog'
import { NEWSLETTER_THANK_YOU_MESSAGE } from '@/lib/newsletterCopy'
import styles from './FreeGuide.module.css'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

type Step = 'format' | 'newsletter'

const FORMAT_COPY: Record<
  FreeDownloadFormat,
  { label: string; hint: string; button: string }
> = {
  pdf: {
    label: 'PDF',
    hint: 'Best for printing',
    button: 'Download PDF',
  },
  epub: {
    label: 'EPUB',
    hint: 'Best for e-readers',
    button: 'Download EPUB',
  },
}

export default function FreeDownloadFlow({
  catalogId,
  formats,
}: {
  catalogId: string
  formats: FreeDownloadFormat[]
}) {
  const [step, setStep] = useState<Step>(formats.length > 1 ? 'format' : 'newsletter')
  const [format, setFormat] = useState<FreeDownloadFormat>(formats[0] ?? 'pdf')
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<string | null>(null)

  const downloadUrl = `/api/free-download?catalog=${encodeURIComponent(catalogId)}&format=${encodeURIComponent(format)}`

  function startDownload() {
    window.location.assign(downloadUrl)
  }

  function chooseFormat(next: FreeDownloadFormat) {
    setFormat(next)
    setError(null)
    setStatus(null)
    setStep('newsletter')
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

  if (step === 'format') {
    return (
      <div className={styles.prompt} role="region" aria-label="Choose download format">
        <h2 className={styles.promptHeading}>Choose your format</h2>
        <p className={styles.promptText}>
          PDF is best if you want to print. EPUB works better on Kindles, phones, and other
          e-readers.
        </p>
        <div className={styles.formatOptions}>
          {formats.map((option) => (
            <button
              key={option}
              type="button"
              className={styles.formatOption}
              onClick={() => chooseFormat(option)}
            >
              <span className={styles.formatLabel}>{FORMAT_COPY[option].label}</span>
              <span className={styles.formatHint}>{FORMAT_COPY[option].hint}</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  const selected = FORMAT_COPY[format]

  return (
    <div className={styles.prompt} role="region" aria-label="Newsletter invitation">
      <h2 className={styles.promptHeading}>Would you like to join the mailing list?</h2>
      <p className={styles.promptText}>
        Roughly once a month: reflections, resources, and news from Dragonfly Psychotherapy. You can
        unsubscribe at any time. Either way, your {selected.label} will download.
      </p>

      {formats.length > 1 ? (
        <p className={styles.changeFormatWrap}>
          <button
            type="button"
            className={styles.skipBtn}
            disabled={submitting}
            onClick={() => {
              setError(null)
              setStatus(null)
              setStep('format')
            }}
          >
            Change format ({selected.label})
          </button>
        </p>
      ) : null}

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
          {submitting ? 'Joining…' : `Join and ${selected.button.toLowerCase()}`}
        </button>
        <button type="button" className={styles.skipBtn} disabled={submitting} onClick={skipAndDownload}>
          No thanks, just {selected.button.toLowerCase()}
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
