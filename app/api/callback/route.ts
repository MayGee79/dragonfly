import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const clientId = process.env.OAUTH_CLIENT_ID
  const clientSecret = process.env.OAUTH_CLIENT_SECRET

  if (!code) {
    return new NextResponse('Missing authorization code', { status: 400 })
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
    const html = `<!DOCTYPE html>
<html>
<head>
  <title>Authorizing...</title>
</head>
<body>
  <script>
    (function() {
      const token = ${JSON.stringify(data)};
      const message = 'authorization:github:success:' + JSON.stringify(token);
      if (window.opener) {
        window.opener.postMessage(message, '*');
        window.close();
      } else {
        // Fallback: redirect to admin with token in localStorage
        localStorage.setItem('netlify-cms-user', JSON.stringify({
          token: token.access_token,
          backendName: 'github'
        }));
        window.location.href = '/admin/';
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
