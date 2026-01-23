import Script from 'next/script'

export function generateStaticParams() {
  return [{ slug: [] }]
}

export default function AdminPage() {
  return (
    <>
      {/* Link to config.yml so Decap CMS can find it */}
      <link rel="cms-config-url" href="/admin/config.yml" type="text/yaml" />
      <Script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js" />
      <div id="nc-root"></div>
    </>
  )
}

