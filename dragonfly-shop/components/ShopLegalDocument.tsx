const articleStyle = {
  maxWidth: 960,
  margin: '0 auto',
  padding: 'var(--spacing-2xl) var(--spacing-lg)',
} as const

const preStyle = {
  whiteSpace: 'pre-wrap' as const,
  fontFamily: 'var(--font-main)',
  fontSize: 'var(--font-size-sm)',
  lineHeight: 'var(--line-height-loose)',
  background: '#fff',
  padding: 'var(--spacing-xl)',
  borderRadius: 'var(--radius-md)',
  boxShadow: 'var(--shadow-sm)',
}

export default function ShopLegalDocument({ text }: { text: string }) {
  return (
    <article style={articleStyle}>
      <pre style={preStyle}>{text}</pre>
    </article>
  )
}
