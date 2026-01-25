import Script from 'next/script'

export function generateStaticParams() {
  return [{ slug: [] }]
}

export default function AdminPage() {
  return (
    <>
      {/* Link to config.yml so Decap CMS can find it */}
      <link rel="cms-config-url" href="/admin/config.yml" type="text/yaml" />
      
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

