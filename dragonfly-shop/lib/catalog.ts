export type ProductKind = 'digital' | 'physical'

export type FreeDownloadFormat = 'pdf' | 'epub'

export type CatalogItem = {
  id: string
  slug: string
  name: string
  shortDescription: string
  kind: ProductKind
  /** Free resources download directly without going through Stripe checkout. */
  isFree?: boolean
  /** Not yet purchasable — the card shows a "coming soon" label instead of basket controls. */
  comingSoon?: boolean
  /**
   * YYYY-MM-DD (Europe/London calendar date). Before this date the card shows Coming Soon
   * and checkout rejects the item. On/after this date it becomes purchasable (unless comingSoon).
   */
  availableFrom?: string
  /** Display price on the shop card (e.g. "£9.99"). Stripe remains source of truth at checkout. */
  priceLabel?: string
  /** Optional shop-section heading. Consecutive items with the same section render together. */
  section?: string
  /** Path under `/public` for product card cover art */
  coverImage: string
  /** Filename under `private/downloads/` — served only via `/api/download` after Stripe verifies the session */
  privateDownloadFile?: string
  /** Optional EPUB under `private/downloads/` for free multi-format downloads */
  privateDownloadEpubFile?: string
}

const STRENGTH_BENEATH_COMPENDIUM_BLURB =
  'When life gets hard, the things that hold you steady do not disappear. They just become harder to see.\n\nA self-help guide and workbook in one, built around the six foundations of the Strength Beneath® framework: Values, Strengths, Relationships, Resilience, Skills and Identity. Start with whatever feels hardest, whether that is anxiety, burnout, self-criticism or a life that has changed shape, and each topic leads you back to the foundation that can help. This is a book to keep and return to.'

const STRENGTH_BENEATH_30_DAY_BLURB =
  'Thirty days. Six foundations. A few minutes at a time.\n\nEach day brings one affirmation, one reflective prompt and space to write, over morning coffee or before bed. You move through the six foundations five times, going a little deeper each round. On the final day you look back at where you began. It is a gentle first step into journaling, a fresh start for the New Year, or an encouraging gift.'

const YEAR_BENEATH_BLURB =
  'Most journals ask what happened today. This one asks what held you steady through it.\n\nAn undated guided journal with a page for every day, an anchor question to open each month and a waterline reflection each season. You can begin in January, on your birthday, or on the day it arrives. Over a year, it becomes a quiet record of your own strength in your own hand. It also makes a thoughtful gift for someone facing a time of change.'

export const CATALOG: CatalogItem[] = [
  {
    id: 'strength-beneath-compendium-paperback',
    slug: 'strength-beneath-compendium-paperback',
    name: 'Strength Beneath Compendium - Paperback',
    shortDescription: STRENGTH_BENEATH_COMPENDIUM_BLURB,
    kind: 'physical',
    priceLabel: '£26.99',
    section: 'Strength Beneath® Collection',
    coverImage: '/images/covers/strength-beneath-compendium-cover.jpg',
  },
  {
    id: 'strength-beneath-compendium-hardback',
    slug: 'strength-beneath-compendium-hardback',
    name: 'Strength Beneath Compendium - Hardback',
    shortDescription: STRENGTH_BENEATH_COMPENDIUM_BLURB,
    kind: 'physical',
    priceLabel: '£34.99',
    section: 'Strength Beneath® Collection',
    coverImage: '/images/covers/strength-beneath-compendium-cover.jpg',
  },
  {
    id: 'year-beneath-paperback',
    slug: 'year-beneath-paperback',
    name: 'The Year Beneath - Paperback',
    shortDescription: YEAR_BENEATH_BLURB,
    kind: 'physical',
    priceLabel: '£16.99',
    section: 'Strength Beneath® Collection',
    coverImage: '/images/covers/year-beneath-cover.jpg',
  },
  {
    id: 'year-beneath-hardback',
    slug: 'year-beneath-hardback',
    name: 'The Year Beneath - Hardback',
    shortDescription: YEAR_BENEATH_BLURB,
    kind: 'physical',
    priceLabel: '£24.99',
    section: 'Strength Beneath® Collection',
    coverImage: '/images/covers/year-beneath-cover.jpg',
  },
  {
    id: 'strength-beneath-30-day-paperback',
    slug: 'strength-beneath-30-day-paperback',
    name: 'The Strength Beneath® 30 Day Challenge - Paperback',
    shortDescription: STRENGTH_BENEATH_30_DAY_BLURB,
    kind: 'physical',
    priceLabel: '£10.99',
    section: 'Strength Beneath® Collection',
    coverImage: '/images/covers/strength-beneath-30-day-challenge-cover.jpg',
  },
  {
    id: 'strength-beneath-30-day-hardback',
    slug: 'strength-beneath-30-day-hardback',
    name: 'The Strength Beneath® 30 Day Challenge - Hardback',
    shortDescription: STRENGTH_BENEATH_30_DAY_BLURB,
    kind: 'physical',
    priceLabel: '£16.99',
    section: 'Strength Beneath® Collection',
    coverImage: '/images/covers/strength-beneath-30-day-challenge-cover.jpg',
  },
  {
    id: 'university-student-guide-2026',
    slug: 'university-student-guide-2026',
    name: 'Starting University - Student Guide - eBook',
    shortDescription:
      'If everyone else seems to be loving university and you are quietly not, this book was written for you.\n\nAn honest, warm guide to the first year as it really is, not as the prospectus describes it. It walks through the predictable phases of first term, from the early rush to the week three dip and the slow finding of your feet, and explains why each one feels the way it does. It covers homesickness, loneliness, friendships, imposter syndrome and knowing when and how to ask for help, with support for neurodivergent students woven throughout and thirteen practical worksheets. A free companion guide for parents is also available.\n\n“Heading off to university soon? Some super useful support on managing your mental health and wellbeing from a brilliant psychotherapist Victoria Froome” - KG',
    kind: 'digital',
    availableFrom: '2026-07-27',
    priceLabel: '£8.99',
    coverImage: '/images/covers/university-student-guide-cover.png',
    privateDownloadFile: 'university-student-guide-2026.pdf',
    privateDownloadEpubFile: 'university-student-guide-2026.epub',
  },
  {
    id: 'university-student-guide-paperback',
    slug: 'university-student-guide-paperback',
    name: 'Starting University - Student Guide - Paperback',
    shortDescription:
      'If everyone else seems to be loving university and you are quietly not, this book was written for you.\n\nAn honest, warm guide to the first year as it really is, not as the prospectus describes it. It walks through the predictable phases of first term, from the early rush to the week three dip and the slow finding of your feet, and explains why each one feels the way it does. It covers homesickness, loneliness, friendships, imposter syndrome and knowing when and how to ask for help, with support for neurodivergent students woven throughout and thirteen practical worksheets. A free companion guide for parents is also available.\n\n“Heading off to university soon? Some super useful support on managing your mental health and wellbeing from a brilliant psychotherapist Victoria Froome” - KG',
    kind: 'physical',
    availableFrom: '2026-07-27',
    priceLabel: '£11.99',
    coverImage: '/images/covers/university-student-guide-cover.png',
  },
  {
    id: 'university-parents-guide-2026',
    slug: 'university-parents-guide-2026',
    name: 'Supporting Your Child Through University - Free Parents Guide',
    shortDescription:
      'A practical guide for parents supporting a young person through the transition to university, including wellbeing, communication, boundaries, and recognising when extra help may be needed.',
    kind: 'digital',
    isFree: true,
    coverImage: '/images/covers/university-parents-guide-cover.png',
    privateDownloadFile: 'university-parents-guide-2026.pdf',
    privateDownloadEpubFile: 'university-parents-guide-2026.epub',
  },
  {
    id: 'rsd-handbook-ebook',
    slug: 'rsd-handbook-ebook',
    name: 'RSD Handbook - eBook',
    shortDescription:
      'If criticism lands like a blow and lingers for days, this book was written for you.\n\nThis book explains why rejection can hurt so intensely, and what actually helps. It treats RSD as a pattern that can affect anyone, not only people with ADHD, and follows it across the whole lifespan: childhood, university, work, parenthood, perimenopause and later life. It is warm, clear and grounded in clinical experience, with practical strategies, guidance for the people around you and a section for clinicians.\n\n“I feel compelled to write and thank you for what I think is going to become an incredibly useful resource in my journey.” - Reader review\n\n“Explained RSD with warmth and clarity.” - CH',
    kind: 'digital',
    priceLabel: '£9.99',
    coverImage: '/images/covers/rsd-handbook-cover.png',
    privateDownloadFile: 'rsd-handbook-ebook.pdf',
  },
  {
    id: 'rsd-handbook-paperback',
    slug: 'rsd-handbook-paperback',
    name: 'RSD Handbook - Paperback',
    shortDescription:
      'If criticism lands like a blow and lingers for days, this book was written for you.\n\nThis book explains why rejection can hurt so intensely, and what actually helps. It treats RSD as a pattern that can affect anyone, not only people with ADHD, and follows it across the whole lifespan: childhood, university, work, parenthood, perimenopause and later life. It is warm, clear and grounded in clinical experience, with practical strategies, guidance for the people around you and a section for clinicians.\n\n“I feel compelled to write and thank you for what I think is going to become an incredibly useful resource in my journey.” - Reader review\n\n“Explained RSD with warmth and clarity.” - CH',
    kind: 'physical',
    priceLabel: '£14.99',
    coverImage: '/images/covers/rsd-handbook-cover.png',
  },
  {
    id: 'rsd-workbook-ebook',
    slug: 'rsd-workbook-ebook',
    name: 'RSD Companion Workbook - eBook',
    shortDescription:
      'Understanding RSD is one thing. Knowing what to do when it floods you is another.\n\nThe companion workbook turns understanding into practice. It has a personal trigger inventory, an emergency toolkit for the height of an episode, scripts for the conversations RSD makes hardest, quick reference cards for when you cannot think clearly, and a guide to talking with your GP. You can use it alongside the handbook or on its own. It is yours to write in, mark up and return to.\n\n“Well set out. Easy to use. A valuable tool.” - Amazon review',
    kind: 'digital',
    priceLabel: '£4.99',
    coverImage: '/images/covers/rsd-workbook-cover.png',
    privateDownloadFile: 'rsd-workbook-ebook.pdf',
  },
  {
    id: 'rsd-workbook-paperback',
    slug: 'rsd-workbook-paperback',
    name: 'RSD Companion Workbook - Paperback',
    shortDescription:
      'Understanding RSD is one thing. Knowing what to do when it floods you is another.\n\nThe companion workbook turns understanding into practice. It has a personal trigger inventory, an emergency toolkit for the height of an episode, scripts for the conversations RSD makes hardest, quick reference cards for when you cannot think clearly, and a guide to talking with your GP. You can use it alongside the handbook or on its own. It is yours to write in, mark up and return to.\n\n“Well set out. Easy to use. A valuable tool.” - Amazon review',
    kind: 'physical',
    priceLabel: '£11.99',
    coverImage: '/images/covers/rsd-workbook-cover.png',
  },
]

export type ClientCatalogItem = Omit<CatalogItem, 'privateDownloadFile' | 'privateDownloadEpubFile'> & {
  privateDownloadFile?: never
  privateDownloadEpubFile?: never
}

export function catalogForClient(): ClientCatalogItem[] {
  return CATALOG.map(({ privateDownloadFile: _pdf, privateDownloadEpubFile: _epub, ...rest }) => rest)
}

export function freeFormatsFor(item: CatalogItem): FreeDownloadFormat[] {
  const formats: FreeDownloadFormat[] = []
  if (item.privateDownloadFile) formats.push('pdf')
  if (item.privateDownloadEpubFile) formats.push('epub')
  return formats
}

export function freeDownloadFileFor(
  item: CatalogItem,
  format: FreeDownloadFormat,
): string | undefined {
  switch (format) {
    case 'pdf':
      return item.privateDownloadFile
    case 'epub':
      return item.privateDownloadEpubFile
    default: {
      const _exhaustive: never = format
      return _exhaustive
    }
  }
}

/** Today's calendar date in Europe/London as YYYY-MM-DD. */
export function londonCalendarDate(now = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/London',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now)
  const y = parts.find((p) => p.type === 'year')?.value
  const m = parts.find((p) => p.type === 'month')?.value
  const d = parts.find((p) => p.type === 'day')?.value
  if (!y || !m || !d) return now.toISOString().slice(0, 10)
  return `${y}-${m}-${d}`
}

/** True while the card should show Coming Soon (not free, not yet buyable). */
export function showsComingSoon(
  item: Pick<CatalogItem, 'isFree' | 'comingSoon' | 'availableFrom'>,
  now = new Date(),
): boolean {
  if (item.isFree) return false
  if (item.comingSoon) return true
  if (item.availableFrom && londonCalendarDate(now) < item.availableFrom) return true
  return false
}

/** Shop-card label while an item is scheduled but not yet buyable. */
export function availabilityLabel(
  item: Pick<CatalogItem, 'comingSoon' | 'availableFrom'>,
): string {
  if (item.availableFrom) {
    const [y, m, d] = item.availableFrom.split('-')
    if (y && m && d) return `AVAILABLE FROM ${d}/${m}`
  }
  if (item.comingSoon) return 'COMING SOON'
  return 'COMING SOON'
}

/** True when Stripe checkout may include this catalog item. */
export function isPurchasable(
  item: Pick<CatalogItem, 'isFree' | 'comingSoon' | 'availableFrom'>,
  now = new Date(),
): boolean {
  if (item.isFree) return false
  return !showsComingSoon(item, now)
}

function requireEnv(name: string): string {
  const v = process.env[name]
  if (!v) throw new Error(`Missing required environment variable: ${name}`)
  return v
}

export function stripePriceIdForCatalogId(id: string): string {
  switch (id) {
    case 'university-student-guide-2026':
      return requireEnv('STRIPE_PRICE_UNIVERSITY_STUDENT_GUIDE')
    case 'university-student-guide-paperback':
      return requireEnv('STRIPE_PRICE_UNIVERSITY_STUDENT_GUIDE_PAPERBACK')
    case 'rsd-handbook-ebook':
      return requireEnv('STRIPE_PRICE_RSD_HANDBOOK_EBOOK')
    case 'rsd-handbook-paperback':
      return requireEnv('STRIPE_PRICE_RSD_HANDBOOK_PAPERBACK')
    case 'rsd-workbook-ebook':
      return requireEnv('STRIPE_PRICE_RSD_WORKBOOK_EBOOK')
    case 'rsd-workbook-paperback':
      return requireEnv('STRIPE_PRICE_RSD_WORKBOOK_PAPERBACK')
    case 'strength-beneath-compendium-paperback':
      return requireEnv('STRIPE_PRICE_STRENGTH_BENEATH_COMPENDIUM_PAPERBACK')
    case 'strength-beneath-compendium-hardback':
      return requireEnv('STRIPE_PRICE_STRENGTH_BENEATH_COMPENDIUM_HARDBACK')
    case 'year-beneath-paperback':
      return requireEnv('STRIPE_PRICE_YEAR_BENEATH_PAPERBACK')
    case 'year-beneath-hardback':
      return requireEnv('STRIPE_PRICE_YEAR_BENEATH_HARDBACK')
    case 'strength-beneath-30-day-paperback':
      return requireEnv('STRIPE_PRICE_STRENGTH_BENEATH_30_DAY_PAPERBACK')
    case 'strength-beneath-30-day-hardback':
      return requireEnv('STRIPE_PRICE_STRENGTH_BENEATH_30_DAY_HARDBACK')
    default:
      throw new Error(`Unknown catalog id: ${id}`)
  }
}

export function catalogItemByStripePriceId(priceId: string): CatalogItem | undefined {
  const pairs: [string, string][] = [
    ['university-student-guide-2026', process.env.STRIPE_PRICE_UNIVERSITY_STUDENT_GUIDE || ''],
    [
      'university-student-guide-paperback',
      process.env.STRIPE_PRICE_UNIVERSITY_STUDENT_GUIDE_PAPERBACK || '',
    ],
    ['rsd-handbook-ebook', process.env.STRIPE_PRICE_RSD_HANDBOOK_EBOOK || ''],
    ['rsd-handbook-paperback', process.env.STRIPE_PRICE_RSD_HANDBOOK_PAPERBACK || ''],
    ['rsd-workbook-ebook', process.env.STRIPE_PRICE_RSD_WORKBOOK_EBOOK || ''],
    ['rsd-workbook-paperback', process.env.STRIPE_PRICE_RSD_WORKBOOK_PAPERBACK || ''],
    [
      'strength-beneath-compendium-paperback',
      process.env.STRIPE_PRICE_STRENGTH_BENEATH_COMPENDIUM_PAPERBACK || '',
    ],
    [
      'strength-beneath-compendium-hardback',
      process.env.STRIPE_PRICE_STRENGTH_BENEATH_COMPENDIUM_HARDBACK || '',
    ],
    ['year-beneath-paperback', process.env.STRIPE_PRICE_YEAR_BENEATH_PAPERBACK || ''],
    ['year-beneath-hardback', process.env.STRIPE_PRICE_YEAR_BENEATH_HARDBACK || ''],
    [
      'strength-beneath-30-day-paperback',
      process.env.STRIPE_PRICE_STRENGTH_BENEATH_30_DAY_PAPERBACK || '',
    ],
    [
      'strength-beneath-30-day-hardback',
      process.env.STRIPE_PRICE_STRENGTH_BENEATH_30_DAY_HARDBACK || '',
    ],
  ]
  const found = pairs.find(([, pid]) => pid === priceId)
  if (!found) return undefined
  return CATALOG.find((c) => c.id === found[0])
}
