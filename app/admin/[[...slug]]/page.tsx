import Script from 'next/script'

export function generateStaticParams() {
  return [{ slug: [] }]
}

export default function AdminPage() {
  return (
    <>
      <Script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js" />
      <div id="nc-root"></div>
    </>
  )
}

