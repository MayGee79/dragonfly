import Script from 'next/script'
import Link from 'next/link'
import styles from './admin.module.css'

export function generateStaticParams() {
  return [{ slug: [] }]
}

export default function AdminPage() {
  return (
    <>
      {/* Link to config.yml so Decap CMS can find it */}
      <link rel="cms-config-url" href="/admin/config.yml" type="text/yaml" />
      
      {/* Admin Navigation Bar */}
      <nav className={styles.adminNav}>
        <div className={styles.navContainer}>
          <div className={styles.navLeft}>
            <Link href="/admin" className={styles.navLink}>Admin home</Link>
            <Link href="/" className={styles.navLink}>Back to Site</Link>
          </div>
          <div className={styles.navLinks}>
            <div className={styles.dropdown}>
              <button type="button" className={styles.dropdownTrigger}>Sitemaps</button>
              <div className={styles.dropdownMenu}>
                <Link href="/sitemap" className={styles.dropdownLink} target="_blank" rel="noopener noreferrer">View Sitemap</Link>
                <Link href="/sitemap.xml" className={styles.dropdownLink} target="_blank" rel="noopener noreferrer">XML Sitemap</Link>
              </div>
            </div>
            <a href="https://analytics.google.com/analytics/web/" className={styles.navLink} target="_blank" rel="noopener noreferrer">Analytics</a>
          </div>
        </div>
      </nav>
      
      {/* Debug script to log postMessage events */}
      <Script
        id="oauth-debug"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              console.log('[Admin Page] Setting up postMessage listener...');
              window.addEventListener('message', function(event) {
                console.log('[Admin Page] Message received:', {
                  origin: event.origin,
                  data: event.data,
                  type: typeof event.data,
                  timestamp: new Date().toISOString()
                });
                
                // Check if it's an OAuth message
                if (typeof event.data === 'string' && event.data.startsWith('authorization:github:success:')) {
                  console.log('[Admin Page] ✓ OAuth authorization message detected!');
                  console.log('[Admin Page] Full message:', event.data);
                }
              });
              
              // Also check if Decap CMS is loaded
              function checkDecapCMS() {
                if (typeof window.CMS !== 'undefined') {
                  console.log('[Admin Page] ✓ Decap CMS is loaded:', window.CMS);
                } else {
                  console.log('[Admin Page] Waiting for Decap CMS to load...');
                  setTimeout(checkDecapCMS, 500);
                }
              }
              checkDecapCMS();
            })();
          `,
        }}
      />
      
      <Script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js" />
      <div id="nc-root"></div>
    </>
  )
}

