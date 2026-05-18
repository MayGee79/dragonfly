'use client'

import type { FormEvent, MouseEvent as ReactMouseEvent } from 'react'
import { useEffect, useId, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import styles from './ResourceSignupModal.module.css'

type SubscribeResult = { ok: true; alreadySubscribed?: boolean } | { ok: false; error: string }

async function subscribe(firstName: string, email: string): Promise<SubscribeResult> {
  const res = await fetch('/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ firstName, email }),
  })

  if (res.ok) return { ok: true }
  if (res.status === 409) return { ok: true, alreadySubscribed: true }

  return { ok: false, error: 'subscribe_failed' }
}

export default function ResourceSignupModal(props: {
  isOpen: boolean
  onCloseAndDownload: () => void
  onSubscribedAndDownload: () => void
}) {
  const { isOpen, onCloseAndDownload, onSubscribedAndDownload } = props

  const firstNameId = useId()
  const emailId = useId()
  const errorId = useId()
  const firstNameRef = useRef<HTMLInputElement | null>(null)

  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const errorMessage = useMemo(() => {
    if (!error) return null
    return 'Something went wrong. Please try again or contact victoria@dragonflypsychotherapy.co.uk'
  }, [error])

  useEffect(() => {
    if (!isOpen) return
    setError(null)
    setIsSubmitting(false)

    const t = window.setTimeout(() => {
      firstNameRef.current?.focus()
    }, 0)
    return () => window.clearTimeout(t)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseAndDownload()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onCloseAndDownload])

  if (!isOpen) return null

  const onBackdropMouseDown = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onCloseAndDownload()
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    const trimmedFirstName = firstName.trim()
    const trimmedEmail = email.trim()

    if (!trimmedFirstName || !trimmedEmail) return

    setIsSubmitting(true)
    const result = await subscribe(trimmedFirstName, trimmedEmail)
    setIsSubmitting(false)

    if (result.ok) {
      onSubscribedAndDownload()
      return
    }

    setError(result.error)
  }

  return (
    <div className={styles.backdrop} role="presentation" onMouseDown={onBackdropMouseDown}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="resource-modal-title"
        aria-describedby="resource-modal-subtitle"
      >
        <button type="button" className={styles.closeButton} onClick={onCloseAndDownload} aria-label="Close and download">
          ✕
        </button>

        <div className={styles.header}>
          <h2 className={styles.title} id="resource-modal-title">
            Get your free resource
          </h2>
          <p className={styles.subtitle} id="resource-modal-subtitle">
            Join the Dragonfly mailing list for updates, tools, resources and wellbeing support straight to your inbox.
          </p>
        </div>

        <div className={styles.body}>
          <form className={styles.form} onSubmit={onSubmit} aria-describedby={errorMessage ? errorId : undefined}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor={firstNameId}>
                First name
              </label>
              <input
                id={firstNameId}
                className={styles.input}
                type="text"
                autoComplete="given-name"
                ref={firstNameRef}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor={emailId}>
                Email address
              </label>
              <input
                id={emailId}
                className={styles.input}
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>

            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
              {isSubmitting ? 'Sending…' : 'Send me the resource'}
            </button>

            <p className={styles.finePrint}>
              No spam, ever. Unsubscribe any time. By subscribing you agree to our{' '}
              <Link href="/privacy-policy" className={styles.privacyLink}>
                Privacy Notice
              </Link>
              .
            </p>

            <button type="button" className={styles.skipLink} onClick={onCloseAndDownload}>
              No thanks, just download
            </button>

            {errorMessage && (
              <div className={styles.error} id={errorId} role="alert">
                {errorMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

