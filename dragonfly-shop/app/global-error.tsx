'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en-GB">
      <body style={{ margin: 0, padding: '2rem', fontFamily: 'system-ui, sans-serif', background: '#b9d5d6', color: '#2d3758' }}>
        <h1 style={{ fontSize: '1.25rem' }}>Something went wrong</h1>
        <p style={{ marginTop: '0.75rem', lineHeight: 1.5 }}>
          {process.env.NODE_ENV === 'development' ? error.message : 'Please refresh the page.'}
        </p>
        <button
          type="button"
          onClick={() => reset()}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            fontWeight: 700,
            borderRadius: 8,
            border: 'none',
            background: '#af93b8',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          Try again
        </button>
      </body>
    </html>
  )
}
