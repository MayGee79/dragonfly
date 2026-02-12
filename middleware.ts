import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ADMIN_COOKIE = 'admin_access'

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', request.nextUrl.pathname)

  const secret = process.env.ADMIN_ACCESS_SECRET
  const path = request.nextUrl.pathname
  const isAdminStatic = path === '/admin/config.yml' || path === '/admin/config.local.yml' || path.startsWith('/admin/') && /\.(css|js|yml|yaml)$/i.test(path)
  if (secret && path.startsWith('/admin') && !isAdminStatic) {
    const cookie = request.cookies.get(ADMIN_COOKIE)?.value
    const param = request.nextUrl.searchParams.get('admin_secret')

    if (param === secret) {
      const res = NextResponse.redirect(new URL('/admin', request.url))
      res.cookies.set(ADMIN_COOKIE, secret, { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 86400 * 7 })
      return res
    }
    if (cookie !== secret) {
      return new NextResponse('Unauthorized', { status: 401 })
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}
