import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ADMIN_COOKIE = 'admin_access'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Redirect trailing-slash URLs to canonical (no slash) so Search Console validates one URL form
  if (path.length > 1 && path.endsWith('/')) {
    const url = request.nextUrl.clone()
    url.pathname = path.slice(0, -1)
    return NextResponse.redirect(url, 301)
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', request.nextUrl.pathname)

  const secret = process.env.ADMIN_ACCESS_SECRET
  const pathNoTrailing = path.replace(/\/$/, '')
  const isAdminStatic = path === '/admin/config.yml' || path === '/admin/config.local.yml' ||
    pathNoTrailing === '/admin/config.yml' || pathNoTrailing === '/admin/config.local.yml' ||
    (path.startsWith('/admin/') && /\.(css|js|yml|yaml)$/i.test(pathNoTrailing))
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
