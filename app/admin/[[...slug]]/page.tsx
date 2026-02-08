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
      <link rel="stylesheet" href="/admin/custom.css?v=16" />
      {/* Admin Navigation Bar */}
      <nav className={styles.adminNav}>
        <div className={styles.navContainer}>
          <div className={styles.navLeft}>
            <a href="/admin#/" className={styles.navLink}>Admin home</a>
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
          </div>
          <div className={styles.navRight}>
            <button type="button" className={styles.navLink} id="admin-save-btn" aria-label="Save">Save</button>
            <button type="button" className={styles.navLink} id="admin-logout-btn" aria-label="Log out">Log out</button>
          </div>
        </div>
      </nav>
      
      <Script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js" strategy="afterInteractive" />
      <div id="nc-root"></div>
      <Script id="admin-save-logout" strategy="afterInteractive">
        {`(function(){
          function triggerSave() {
            var root = document.getElementById('nc-root');
            if (!root) return;
            var btns = root.querySelectorAll('button, [role="button"], a');
            for (var i = 0; i < btns.length; i++) {
              var t = (btns[i].textContent || '').trim().toLowerCase();
              if (t === 'save' || t === 'publish' || t === 'save now' || t.indexOf('save') === 0) {
                btns[i].click();
                return;
              }
            }
            alert('No Save button found. Open a page or blog post to edit first, then click Save.');
          }
          document.getElementById('admin-save-btn')?.addEventListener('click', triggerSave);
          document.getElementById('admin-logout-btn')?.addEventListener('click', function(){
            try { localStorage.removeItem('netlify-cms-user'); localStorage.removeItem('decap-cms-user'); } catch(e){}
            window.location.href = '/admin';
          });
        })();`}
      </Script>
      <Script id="collection-cards-grid" strategy="afterInteractive">
        {`(function(){
          function applyGrid() {
            var ul = document.querySelector('#nc-root ul[class*="CardsGrid"]');
            if (ul) ul.style.cssText = 'display:grid!important;grid-template-columns:repeat(2,1fr)!important;gap:0.75rem!important;';
          }
          [500, 1500, 3000, 5000].forEach(function(ms){ setTimeout(applyGrid, ms); });
          var root = document.getElementById('nc-root');
          if (root) new MutationObserver(applyGrid).observe(root, { childList: true, subtree: true });
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
      <Script id="admin-inject-save-in-form" strategy="afterInteractive">
        {`(function(){
          var INJECT_ID = 'admin-form-save-btn';
          var root = document.getElementById('nc-root');
          if (!root) return;
          function triggerSave() {
            var btns = root.querySelectorAll('button, [role="button"], a');
            for (var i = 0; i < btns.length; i++) {
              var t = (btns[i].textContent || '').trim().toLowerCase();
              if (t === 'save' || t === 'publish' || t === 'save now' || t.indexOf('save') === 0) {
                btns[i].click();
                return;
              }
            }
            alert('No Save button found. Open a page or blog post to edit first, then click Save.');
          }
          function findBottomLeftAnchor() {
            var root = document.getElementById('nc-root');
            var wf = root.querySelector('[class*="workflowCard"]');
            if (wf) return wf;
            var toolbar = root.querySelector('[class*="entryEditor-toolbar"]');
            if (toolbar) return toolbar;
            var editor = root.querySelector('[class*="entryEditor"]') || root.querySelector('[class*="EntryEditor"]');
            if (!editor) return root;
            var labels = editor.querySelectorAll('label');
            for (var i = 0; i < labels.length; i++) {
              if ((labels[i].textContent || '').trim() === 'Published') {
                var widget = labels[i].closest('[class*="widget"]');
                if (widget) return { after: widget };
              }
            }
            var pane = editor.querySelector('[class*="controlPane"]') || editor.querySelector('[class*="ControlPane"]');
            if (pane) return { appendTo: pane };
            return { appendTo: editor };
          }
          function injectSaveInForm() {
            var inEditor = (window.location.hash || '').indexOf('/entries/') !== -1;
            if (!inEditor) return;
            if (document.getElementById(INJECT_ID)) return;
            var result = findBottomLeftAnchor();
            var wrap = document.createElement('div');
            wrap.id = INJECT_ID;
            wrap.style.cssText = 'margin:1.5rem 1rem;padding:1rem;border-top:1px solid rgba(45,55,88,0.2);background:#fff;border-radius:8px;box-shadow:0 2px 6px rgba(0,0,0,0.1);';
            var btn = document.createElement('button');
            btn.type = 'button';
            btn.textContent = 'Save';
            btn.style.cssText = 'width:110px;height:36px;font-size:11px;font-weight:bold;color:#fff;background:#af93b8;border:none;border-radius:0.6rem;cursor:pointer;';
            btn.onclick = triggerSave;
            wrap.appendChild(btn);
            if (result.after && result.after.parentElement) {
              result.after.parentElement.insertBefore(wrap, result.after.nextElementSibling);
            } else {
              var target = result.appendTo || (result.nodeName ? result : null) || root;
              target.appendChild(wrap);
            }
          }
          function removeInjectedSave() {
            var el = document.getElementById(INJECT_ID);
            if (el) el.remove();
          }
          function update() {
            var inEditor = (window.location.hash || '').indexOf('/entries/') !== -1;
            if (inEditor) injectSaveInForm(); else removeInjectedSave();
          }
          [400, 800, 1500, 2500, 4000, 6000, 10000].forEach(function(ms){ setTimeout(update, ms); });
          window.addEventListener('hashchange', function(){ setTimeout(update, 100); });
          if (root) new MutationObserver(update).observe(root, { childList: true, subtree: true });
        })();`}
      </Script>
    </>
  )
}

