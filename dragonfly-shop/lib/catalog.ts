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
  /** Display price on the shop card (e.g. "£9.99"). Stripe remains source of truth at checkout. */
  priceLabel?: string
  /** Path under `/public` for product card cover art */
  coverImage: string
  /** Filename under `private/downloads/` — served only via `/api/download` after Stripe verifies the session */
  privateDownloadFile?: string
  /** Optional EPUB under `private/downloads/` for free multi-format downloads */
  privateDownloadEpubFile?: string
}

export const CATALOG: CatalogItem[] = [
  {
    id: 'university-student-guide-2026',
    slug: 'university-student-guide-2026',
    name: 'Starting University - Student Guide',
    shortDescription:
      "A student's guide to mental health, wellbeing and navigating the transition to university life - settling in, friendships, study pressures, and looking after yourself away from home.",
    kind: 'digital',
    comingSoon: true,
    coverImage: '/images/covers/university-student-guide-cover.png',
    /** Staged DIGITAL files — served only after comingSoon is removed and Stripe checkout is wired. */
    privateDownloadFile: 'university-student-guide-2026.pdf',
    privateDownloadEpubFile: 'university-student-guide-2026.epub',
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
      'If criticism lands like a blow and lingers for days, this handbook was written for you. Lifespan approach to RSD - warmth and clinical depth.',
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
      'Paperback edition - mapped across the lifespan with practical support.',
    kind: 'physical',
    priceLabel: '£14.99',
    coverImage: '/images/covers/rsd-handbook-cover.png',
  },
  {
    id: 'rsd-workbook-ebook',
    slug: 'rsd-workbook-ebook',
    name: 'RSD Companion Workbook - eBook',
    shortDescription:
      'Trigger inventories, emergency tools, communication scripts, and quick reference cards - designed to write in and return to.',
    kind: 'digital',
    priceLabel: '£4.99',
    coverImage: '/images/covers/rsd-workbook-cover.png',
    privateDownloadFile: 'rsd-workbook-ebook.pdf',
  },
  {
    id: 'rsd-workbook-paperback',
    slug: 'rsd-workbook-paperback',
    name: 'RSD Companion Workbook - Paperback',
    shortDescription: 'Paperback companion to the handbook - practical exercises and worksheets.',
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

function requireEnv(name: string): string {
  const v = process.env[name]
  if (!v) throw new Error(`Missing required environment variable: ${name}`)
  return v
}

export function stripePriceIdForCatalogId(id: string): string {
  switch (id) {
    case 'rsd-handbook-ebook':
      return requireEnv('STRIPE_PRICE_RSD_HANDBOOK_EBOOK')
    case 'rsd-handbook-paperback':
      return requireEnv('STRIPE_PRICE_RSD_HANDBOOK_PAPERBACK')
    case 'rsd-workbook-ebook':
      return requireEnv('STRIPE_PRICE_RSD_WORKBOOK_EBOOK')
    case 'rsd-workbook-paperback':
      return requireEnv('STRIPE_PRICE_RSD_WORKBOOK_PAPERBACK')
    default:
      throw new Error(`Unknown catalog id: ${id}`)
  }
}

export function catalogItemByStripePriceId(priceId: string): CatalogItem | undefined {
  const pairs: [string, string][] = [
    ['rsd-handbook-ebook', process.env.STRIPE_PRICE_RSD_HANDBOOK_EBOOK || ''],
    ['rsd-handbook-paperback', process.env.STRIPE_PRICE_RSD_HANDBOOK_PAPERBACK || ''],
    ['rsd-workbook-ebook', process.env.STRIPE_PRICE_RSD_WORKBOOK_EBOOK || ''],
    ['rsd-workbook-paperback', process.env.STRIPE_PRICE_RSD_WORKBOOK_PAPERBACK || ''],
  ]
  const found = pairs.find(([, pid]) => pid === priceId)
  if (!found) return undefined
  return CATALOG.find((c) => c.id === found[0])
}
