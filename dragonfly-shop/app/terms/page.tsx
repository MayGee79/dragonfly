import fs from 'fs'
import path from 'path'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shop Terms and Conditions',
  description: 'Terms and conditions for purchases on Dragonfly Shop.',
}

export default function TermsPage() {
  const text = fs.readFileSync(path.join(process.cwd(), 'content', 'terms.txt'), 'utf8')
  return (
    <article style={{ maxWidth: 960, margin: '0 auto', padding: 'var(--spacing-2xl) var(--spacing-lg)' }}>
      <pre
        style={{
          whiteSpace: 'pre-wrap',
          fontFamily: 'var(--font-main)',
          fontSize: 'var(--font-size-sm)',
          lineHeight: 'var(--line-height-loose)',
          background: '#fff',
          padding: 'var(--spacing-xl)',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        {text}
      </pre>
    </article>
  )
}
