'use client'

import { useEffect } from 'react'
import Link from 'next/link'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Something went wrong!</h1>
      <p style={{ marginBottom: '2rem', color: '#666' }}>
        {error.message || 'An unexpected error occurred'}
      </p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button
          onClick={reset}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#0066cc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Try again
        </button>
        <Link
          href="/"
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#f0f0f0',
            color: '#333',
            textDecoration: 'none',
            borderRadius: '4px',
            fontSize: '1rem'
          }}
        >
          Go home
        </Link>
      </div>
    </div>
  )
}
