import Script from 'next/script'
import { headers } from 'next/headers'
import styles from './admin.module.css'

// Must be dynamic so Host header is correct (localhost vs production) for config choice
export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const headersList = await headers()
  const host = headersList.get('host') || ''
  const isLocal = host.startsWith('localhost') || host.startsWith('127.0.0.1')
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dragonflypsychotherapy.co.uk'
  const configUrl = isLocal ? '/admin/config.local.yml' : `${baseUrl}/admin/config.yml`

  return (
    <>
      {/* Local: config.local.yml. Production: config.yml (GitHub OAuth) */}
      <link rel="cms-config-url" href={configUrl} type="text/yaml" />
      <link rel="stylesheet" href="/admin/custom.css?v=38" />
      {/* Admin Navigation Bar */}
      <nav className={styles.adminNav}>
        <div className={styles.navContainer}>
          <div className={styles.navLeft}>
            <a href="/admin#/" className={styles.navLink}>Dashboard</a>
            <a href="/" className={styles.navLink}>Back to Site</a>
            <a href="/admin#/" className={styles.navLink}>Content</a>
            <a href="/admin#/media" className={styles.navLink}>Media</a>
            <div className={styles.dropdown}>
              <button type="button" className={styles.dropdownTrigger}>Sitemaps</button>
              <div className={styles.dropdownMenu}>
                <a href="/sitemap" className={styles.dropdownLink} target="_blank" rel="noopener noreferrer">View Sitemap</a>
                <a href="/sitemap.xml" className={styles.dropdownLink} target="_blank" rel="noopener noreferrer">XML Sitemap</a>
              </div>
            </div>
            <a href="https://analytics.google.com/analytics/web/" className={styles.navLink} target="_blank" rel="noopener noreferrer">Analytics</a>
            <a href="https://search.google.com/search-console?utm_source=about-page&resource_id=https://www.dragonflypsychotherapy.co.uk/" className={styles.navLink} target="_blank" rel="noopener noreferrer">Search Console</a>
          </div>
          <div className={styles.navRight}>
            <button type="button" className={styles.navLink} id="admin-logout-btn" aria-label="Log out">Log out</button>
          </div>
        </div>
      </nav>
      
      <Script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js" strategy="afterInteractive" />
      <div id="nc-root"></div>
      <Script id="admin-logout" strategy="afterInteractive">
        {`(function(){
          document.getElementById('admin-logout-btn')?.addEventListener('click', function(){
            try {
              localStorage.removeItem('netlify-cms-user');
              localStorage.removeItem('decap-cms-user');
            } catch(e) {}
            window.location.assign('/admin');
          });
        })();`}
      </Script>
    </>
  )
}

