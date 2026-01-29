import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const clientId = process.env.OAUTH_CLIENT_ID
  const clientSecret = process.env.OAUTH_CLIENT_SECRET

  if (!code) {
    // Debug: show what we received
    const debugInfo = {
      url: request.url,
      searchParams: Object.fromEntries(searchParams.entries()),
      headers: Object.fromEntries(request.headers.entries()),
    }
    return new NextResponse(
      `Missing authorization code. Debug info: ${JSON.stringify(debugInfo, null, 2)}`,
      { status: 400, headers: { 'Content-Type': 'text/plain' } }
    )
  }

  if (!clientId || !clientSecret) {
    return new NextResponse('OAuth credentials not configured', { status: 500 })
  }

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    })

    const data = await response.json()

    if (data.error) {
      return new NextResponse(`Error: ${data.error_description || data.error}`, { status: 400 })
    }

    // Return HTML that posts message to opener (for popup flow)
    // Decap CMS expects the message in a specific format
    const html = `<!DOCTYPE html>
<html>
<head>
  <title>Authorizing...</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      padding: 20px;
      max-width: 600px;
      margin: 50px auto;
    }
    #debug {
      background: #f5f5f5;
      padding: 15px;
      border-radius: 4px;
      margin: 20px 0;
      font-size: 12px;
      color: #333;
      line-height: 1.6;
      max-height: 400px;
      overflow-y: auto;
    }
    .success {
      color: #28a745;
      font-weight: bold;
    }
    .error {
      color: #dc3545;
      font-weight: bold;
    }
    button {
      background: #007bff;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 10px;
    }
    button:hover {
      background: #0056b3;
    }
  </style>
</head>
<body>
  <h2>OAuth Authorization</h2>
  <p>Completing authorization...</p>
  <div id="debug"></div>
  <button id="closeBtn" style="display: none;" onclick="window.close()">Close Window</button>
  <script>
    (function() {
      const debugEl = document.getElementById('debug');
      const closeBtn = document.getElementById('closeBtn');
      let autoCloseTimer = null;
      
      function log(msg, type) {
        const time = new Date().toLocaleTimeString();
        const className = type === 'success' ? 'success' : type === 'error' ? 'error' : '';
        if (debugEl) {
          debugEl.innerHTML += '<div class="' + className + '">[' + time + '] ' + msg + '</div>';
        }
        console.log('[OAuth Callback]', msg);
      }
      
      function showCloseButton() {
        if (closeBtn) {
          closeBtn.style.display = 'block';
        }
        // Auto-close after 10 seconds if user doesn't click
        autoCloseTimer = setTimeout(() => {
          log('Auto-closing window in 3 seconds...', '');
          setTimeout(() => {
            if (window.opener && !window.opener.closed) {
              window.close();
            }
          }, 3000);
        }, 10000);
      }
      
      try {
        log('Starting callback script...');
        const token = ${JSON.stringify(data)};
        log('Token received: ' + (token.access_token ? 'YES ✓' : 'NO ✗'));
        
        if (token.access_token) {
          log('Access token length: ' + token.access_token.length + ' characters', 'success');
        }
        
        // Decap CMS expects this exact message format
        const message = 'authorization:github:success:' + JSON.stringify(token);
        log('Message format: ' + message.substring(0, 80) + '...');
        
        // Store token in localStorage as backup (Decap CMS checks this)
        localStorage.setItem('netlify-cms-user', JSON.stringify({
          token: token.access_token,
          backendName: 'github'
        }));
        localStorage.setItem('decap-cms-user', JSON.stringify({
          token: token.access_token,
          backendName: 'github'
        }));
        log('Token stored in localStorage as backup', 'success');
        
        if (window.opener && !window.opener.closed) {
          log('window.opener exists: YES', 'success');
          log('Sending postMessage to parent window...');
          
          // Send message multiple times to ensure it's received
          window.opener.postMessage(message, '*');
          setTimeout(() => {
            window.opener.postMessage(message, '*');
            log('postMessage sent again (retry)', 'success');
          }, 500);
          setTimeout(() => {
            window.opener.postMessage(message, '*');
            log('postMessage sent again (final retry)', 'success');
          }, 1000);
          
          log('postMessage sent successfully!', 'success');
          log('Waiting 3 seconds before closing...');
          showCloseButton();
          setTimeout(() => {
            log('Closing window now...', '');
            if (window.opener && !window.opener.closed) {
              window.close();
            }
          }, 3000);
        } else {
          log('No window.opener found, using localStorage fallback...', '');
          // Fallback: redirect to admin with token in localStorage
          localStorage.setItem('netlify-cms-user', JSON.stringify({
            token: token.access_token,
            backendName: 'github'
          }));
          localStorage.setItem('decap-cms-user', JSON.stringify({
            token: token.access_token,
            backendName: 'github'
          }));
          log('Token stored in localStorage', 'success');
          log('Redirecting to admin in 2 seconds...', '');
          showCloseButton();
          setTimeout(() => {
            window.location.href = '/admin/';
          }, 2000);
        }
      } catch (error) {
        log('ERROR: ' + error.message, 'error');
        log('Stack: ' + error.stack, 'error');
        document.body.innerHTML = '<h2 style="color: red;">Error</h2><p style="color: red;">' + error.message + '</p><p><a href="/admin/">Return to admin</a></p>';
      }
    })();
  </script>
</body>
</html>`

    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' },
    })
  } catch (error) {
    console.error('OAuth callback error:', error)
    return new NextResponse('Authentication failed', { status: 500 })
  }
}
