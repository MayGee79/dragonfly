import Script from 'next/script'
import { headers } from 'next/headers'
import styles from './admin.module.css'

// Must be dynamic so Host header is correct (localhost vs production) for config choice
export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const headersList = await headers()
  const host = headersList.get('host') || ''
  const isLocal = host.startsWith('localhost') || host.startsWith('127.0.0.1')
  const configUrl = isLocal ? '/admin/config.local.yml' : '/admin/config.yml'

  return (
    <>
      {/* Local: config.local.yml. Production: config.yml (GitHub OAuth) */}
      <link rel="cms-config-url" href={configUrl} type="text/yaml" />
      <link rel="stylesheet" href="/admin/custom.css?v=36" />
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
      <Script id="admin-rename-back-link" strategy="afterInteractive">
        {`(function(){
          function renameBackLink() {
            var root = document.getElementById('nc-root');
            if (!root) return;
            var links = root.querySelectorAll('a[class*="BackLink"], a[class*="backLink"], a[class*="ToolbarSectionBackLink"]');
            links.forEach(function(a){
              var col = a.querySelector('[class*="BackCollection"]');
              if (col) {
                var text = (col.textContent || '').trim();
                if (text.indexOf('Writing in') === 0) {
                  col.textContent = text.replace('Writing in', 'Back to');
                }
              }
            });
          }
          [500, 1500, 3000, 5000].forEach(function(ms){ setTimeout(renameBackLink, ms); });
          var root = document.getElementById('nc-root');
          if (root) new MutationObserver(renameBackLink).observe(root, { childList: true, subtree: true });
        })();`}
      </Script>
      <Script id="admin-logout" strategy="afterInteractive">
        {`(function(){
          document.getElementById('admin-logout-btn')?.addEventListener('click', function(){
            try { localStorage.removeItem('netlify-cms-user'); localStorage.removeItem('decap-cms-user'); } catch(e){}
            window.location.href = '/admin';
          });
        })();`}
      </Script>
      <Script id="remove-header-icons" strategy="afterInteractive">
        {`(function(){
          function removeIcons() {
            var root = document.getElementById('nc-root');
            if (!root) return;
            function removeAll(node) {
              if (!node) return;
              node.querySelectorAll('svg').forEach(function(el){ el.remove(); });
              node.querySelectorAll('[class*="caret"], [class*="chevron"], [class*="Caret"], [class*="Chevron"]').forEach(function(el){ el.remove(); });
            }
            root.querySelectorAll('a, button').forEach(function(el){
              var t = (el.textContent || '').toLowerCase();
              if (t.indexOf('media') !== -1 || t.indexOf('quick add') !== -1 || t.indexOf('content') !== -1) {
                removeAll(el);
                var parent = el.closest('[class*="dropdown"], [class*="Dropdown"]');
                if (parent) removeAll(parent);
              }
            });
            /* Remove icons from nav only – never touch Save/Publish area */
            ['appHeader','AppHeader','header','Header','nav','Nav'].forEach(function(cls){
              root.querySelectorAll('[class*="'+cls+'"]').forEach(function(node){
                var txt = (node.textContent || '').toLowerCase();
                if (txt.indexOf('save') === -1 && txt.indexOf('publish') === -1) removeAll(node);
              });
            });
          }
          [300, 800, 1500, 3000, 5000].forEach(function(ms){ setTimeout(removeIcons, ms); });
          var root = document.getElementById('nc-root');
          if (root) new MutationObserver(removeIcons).observe(root, { childList: true, subtree: true });
        })();`}
      </Script>
    </>
  )
}

