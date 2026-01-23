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
</head>
<body>
  <p>Completing authorization...</p>
  <div id="debug" style="font-size: 12px; color: #666; margin-top: 20px;"></div>
  <script>
    (function() {
      const debugEl = document.getElementById('debug');
      function log(msg) {
        if (debugEl) debugEl.innerHTML += '<br>' + new Date().toLocaleTimeString() + ': ' + msg;
        console.log('[OAuth Callback]', msg);
      }
      
      try {
        log('Starting callback script...');
        const token = ${JSON.stringify(data)};
        log('Token received: ' + (token.access_token ? 'YES' : 'NO'));
        
        // Decap CMS expects this exact message format
        const message = 'authorization:github:success:' + JSON.stringify(token);
        log('Message format: ' + message.substring(0, 50) + '...');
        
        if (window.opener && !window.opener.closed) {
          log('window.opener exists, sending postMessage...');
          window.opener.postMessage(message, '*');
          log('postMessage sent, closing window...');
          setTimeout(() => {
            window.close();
          }, 100);
        } else {
          log('No window.opener, using localStorage fallback...');
          // Fallback: redirect to admin with token in localStorage
          localStorage.setItem('netlify-cms-user', JSON.stringify({
            token: token.access_token,
            backendName: 'github'
          }));
          localStorage.setItem('decap-cms-user', JSON.stringify({
            token: token.access_token,
            backendName: 'github'
          }));
          log('Token stored, redirecting to admin...');
          window.location.href = '/admin/';
        }
      } catch (error) {
        log('ERROR: ' + error.message);
        document.body.innerHTML = '<p style="color: red;">Error: ' + error.message + '</p><p><a href="/admin/">Return to admin</a></p>';
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
