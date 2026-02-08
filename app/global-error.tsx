'use client'

import { useEffect } from 'react'
import styles from './global-error.module.css'

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error('Global error:', error)
  }, [error])

  return (
    <html lang="en-GB">
      <body>
        <div className={styles.container}>
          <h1 className={styles.title}>Something went wrong!</h1>
          <p className={styles.message}>
            {error.message || 'An unexpected error occurred'}
          </p>
          <button onClick={reset} className={styles.button}>
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
