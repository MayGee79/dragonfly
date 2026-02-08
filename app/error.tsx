'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import styles from './error.module.css'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Something went wrong!</h1>
      <p className={styles.message}>
        {error.message || 'An unexpected error occurred'}
      </p>
      <div className={styles.actions}>
        <button onClick={reset} className={styles.button}>
          Try again
        </button>
        <Link href="/" className={styles.link}>
          Go home
        </Link>
      </div>
    </div>
  )
}
