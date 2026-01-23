import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const clientId = process.env.OAUTH_CLIENT_ID

  if (!clientId) {
    return new NextResponse('OAuth client ID not configured', { status: 500 })
  }

  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo`
  
  return NextResponse.redirect(authUrl)
}
