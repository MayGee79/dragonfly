import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const clientId = process.env.OAUTH_CLIENT_ID

  if (!clientId) {
    return new NextResponse('OAuth client ID not configured', { status: 500 })
  }

  // Get the base URL from request headers (works on both local and Vercel)
  const protocol = request.headers.get('x-forwarded-proto') || 'https'
  const host = request.headers.get('host') || 'dragonflypreview.vercel.app'
  const baseUrl = `${protocol}://${host}`
  const redirectUri = `${baseUrl}/api/callback`

  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo&redirect_uri=${encodeURIComponent(redirectUri)}`
  
  return NextResponse.redirect(authUrl)
}
