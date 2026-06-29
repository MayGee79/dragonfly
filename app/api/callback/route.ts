import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

type GitHubAccessTokenResponse = {
  access_token?: string
  token_type?: string
  scope?: string
  error?: string
  error_description?: string
}

function getRequestOrigin(request: NextRequest): string {
  const protocol = request.headers.get('x-forwarded-proto') || 'https'
  const host = request.headers.get('host') || 'localhost:3000'
  return `${protocol}://${host}`
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const clientId = process.env.OAUTH_CLIENT_ID
  const clientSecret = process.env.OAUTH_CLIENT_SECRET

  if (!code) {
    return new NextResponse('Missing authorization code. Please try again.', {
      status: 400,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  }

  if (!clientId || !clientSecret) {
    return new NextResponse('OAuth credentials not configured', { status: 500 })
  }

  const origin = getRequestOrigin(request)
  const redirectUri = `${origin}/api/callback`

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
        redirect_uri: redirectUri,
      }),
    })

    const data = (await response.json()) as GitHubAccessTokenResponse

    if (!response.ok || data.error || !data.access_token) {
      const message = data.error_description || data.error || 'OAuth token exchange failed.'
      return new NextResponse(`Error: ${message}`, {
        status: 400,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      })
    }

    const cmsToken = {
      token: data.access_token,
      provider: 'github',
    }
    const cmsMessage = `authorization:github:success:${JSON.stringify(cmsToken)}`
    const cmsStorage = JSON.stringify({
      token: data.access_token,
      backendName: 'github',
    })

    const html = `<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Admin authorization</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      margin: 0;
      padding: 2rem 1.25rem;
      background: #f5f7fb;
      color: #1f2937;
      text-align: center;
    }
    .card {
      max-width: 520px;
      margin: 0 auto;
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      padding: 1.25rem 1rem;
      box-shadow: 0 6px 20px rgba(15, 23, 42, 0.08);
    }
    h1 {
      font-size: 1.125rem;
      margin: 0 0 0.5rem;
    }
    p {
      margin: 0.25rem 0;
      line-height: 1.5;
      font-size: 0.95rem;
    }
    .link {
      display: inline-block;
      margin-top: 0.9rem;
      text-decoration: none;
      background: #2d3758;
      color: #fff;
      padding: 0.55rem 0.95rem;
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>Finishing sign-in…</h1>
    <p>You can close this tab if it does not close automatically.</p>
    <a class="link" href="/admin">Return to admin</a>
  </div>
  <script>
    (function () {
      var PROVIDER = 'github';
      var successMessage = ${JSON.stringify(cmsMessage)};
      var storage = ${JSON.stringify(cmsStorage)};

      // Same-origin backup so a page reload can restore the session if needed.
      try {
        localStorage.setItem('netlify-cms-user', storage);
        localStorage.setItem('decap-cms-user', storage);
      } catch (e) {}

      var opener = window.opener;
      if (!opener || opener.closed) {
        // No popup opener (full-page redirect flow): return to the admin app.
        window.location.replace('/admin');
        return;
      }

      var settled = false;

      // Decap CMS handshake: it replies with "authorizing:github", and only then
      // does it start listening for the "authorization:github:success" token.
      function handleMessage(e) {
        if (settled) return;
        if (typeof e.data === 'string' && e.data.indexOf('authorizing:' + PROVIDER) === 0) {
          settled = true;
          try { opener.postMessage(successMessage, e.origin || '*'); } catch (err) {}
          window.removeEventListener('message', handleMessage, false);
          setTimeout(function () { try { window.close(); } catch (err) {} }, 600);
        }
      }
      window.addEventListener('message', handleMessage, false);

      // Announce readiness. Repeat a few times in case the opener's listener
      // was not attached yet when the popup first loaded.
      var attempts = 0;
      var handshake = setInterval(function () {
        attempts += 1;
        try { opener.postMessage('authorizing:' + PROVIDER, '*'); } catch (err) {}
        if (settled || attempts >= 10) clearInterval(handshake);
      }, 400);
    })();
  </script>
</body>
</html>`

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    })
  } catch (error) {
    console.error('OAuth callback error:', error)
    return new NextResponse('Authentication failed', { status: 500 })
  }
}
