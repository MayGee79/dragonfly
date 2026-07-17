import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const RATE_LIMIT_PREFIX = 'dragonfly-shop'

type RateLimitRule = {
  key: string
  limit: number
  windowSeconds: number
}

const ratelimitByRule = new Map<string, Ratelimit>()

function isRateLimitConfigured(): boolean {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
}

function getRatelimit(rule: RateLimitRule): Ratelimit | null {
  if (!isRateLimitConfigured()) return null

  const cacheKey = `${rule.key}:${rule.limit}:${rule.windowSeconds}`
  let ratelimit = ratelimitByRule.get(cacheKey)
  if (!ratelimit) {
    ratelimit = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(rule.limit, `${rule.windowSeconds} s`),
      prefix: `${RATE_LIMIT_PREFIX}:${rule.key}`,
    })
    ratelimitByRule.set(cacheKey, ratelimit)
  }
  return ratelimit
}

function clientIp(request: NextRequest | Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim()
    if (first) return first
  }
  const realIp = request.headers.get('x-real-ip')?.trim()
  if (realIp) return realIp
  return 'unknown'
}

function tooManyRequestsResponse(retryAfterSeconds: number, asJson: boolean): NextResponse {
  const headers = { 'Retry-After': String(retryAfterSeconds) }
  if (asJson) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a moment and try again.' },
      { status: 429, headers },
    )
  }
  return new NextResponse('Too many requests. Please wait a moment and try again.', {
    status: 429,
    headers: { ...headers, 'Content-Type': 'text/plain; charset=utf-8' },
  })
}

export async function enforceRateLimit(
  request: NextRequest,
  rule: RateLimitRule,
): Promise<NextResponse | null> {
  const ratelimit = getRatelimit(rule)
  if (!ratelimit) return null

  const ip = clientIp(request)
  const { success, reset } = await ratelimit.limit(`${rule.key}:${ip}`)
  if (success) return null

  const retryAfterSeconds = Math.max(1, Math.ceil((reset - Date.now()) / 1000))
  const asJson = request.nextUrl.pathname.startsWith('/api/')
  return tooManyRequestsResponse(retryAfterSeconds, asJson)
}

export const SHOP_RATE_LIMITS = {
  checkout: { key: 'checkout', limit: 15, windowSeconds: 60 },
  download: { key: 'download', limit: 60, windowSeconds: 60 },
  newsletterSignup: { key: 'newsletter-signup', limit: 10, windowSeconds: 60 },
  success: { key: 'success', limit: 30, windowSeconds: 60 },
} as const satisfies Record<string, RateLimitRule>
