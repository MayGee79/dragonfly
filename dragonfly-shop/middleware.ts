import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { enforceRateLimit, SHOP_RATE_LIMITS } from '@/lib/rateLimit'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/api/checkout' && request.method === 'POST') {
    const denied = await enforceRateLimit(request, SHOP_RATE_LIMITS.checkout)
    if (denied) return denied
  }

  if ((pathname === '/api/download' || pathname === '/api/free-download') && request.method === 'GET') {
    const denied = await enforceRateLimit(request, SHOP_RATE_LIMITS.download)
    if (denied) return denied
  }

  if (pathname === '/success' && request.method === 'GET') {
    const denied = await enforceRateLimit(request, SHOP_RATE_LIMITS.success)
    if (denied) return denied
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/checkout', '/api/download', '/api/free-download', '/success'],
}
