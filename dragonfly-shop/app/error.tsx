'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div style={{ padding: '2rem', maxWidth: '560px', margin: '0 auto', color: '#2d3758', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>This page couldn’t load</h1>
      <p style={{ marginBottom: '1rem', lineHeight: 1.5 }}>
        {process.env.NODE_ENV === 'development'
          ? error.message || 'Unknown error.'
          : 'Something went wrong. Refresh the page or try again in a moment.'}
      </p>
      <button
        type="button"
        onClick={() => reset()}
        style={{
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
    </div>
  )
}
