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
      access_token: data.access_token,
      token_type: data.token_type,
      scope: data.scope,
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
    <a class="link" href="/admin/">Return to admin</a>
  </div>
  <script>
    (function() {
      const targetOrigin = ${JSON.stringify(origin)};
      const cmsMessage = ${JSON.stringify(cmsMessage)};
      const cmsStorage = ${JSON.stringify(cmsStorage)};

      try {
        localStorage.setItem('netlify-cms-user', cmsStorage);
        localStorage.setItem('decap-cms-user', cmsStorage);
      } catch (e) {}

      let sent = false;
      if (window.opener && !window.opener.closed) {
        try {
          window.opener.postMessage(cmsMessage, targetOrigin);
          sent = true;
        } catch (e) {}
        try {
          window.opener.postMessage(cmsMessage, '*');
          sent = true;
        } catch (e) {}
      }

      if (sent) {
        setTimeout(function() { window.close(); }, 250);
        setTimeout(function() { window.close(); }, 1200);
        return;
      }

      window.location.replace('/admin/');
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
