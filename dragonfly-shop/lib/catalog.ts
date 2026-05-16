export type ProductKind = 'digital' | 'physical'

export type CatalogItem = {
  id: string
  slug: string
  name: string
  shortDescription: string
  kind: ProductKind
  /** Path under `/public` for product card cover art */
  coverImage: string
  /** Filename under `private/downloads/` — served only via `/api/download` after Stripe verifies the session */
  privateDownloadFile?: string
}

export const CATALOG: CatalogItem[] = [
  {
    id: 'rsd-handbook-ebook',
    slug: 'rsd-handbook-ebook',
    name: 'RSD Handbook - eBook',
    shortDescription:
      'If criticism lands like a blow and lingers for days, this handbook was written for you. Lifespan approach to RSD - warmth and clinical depth.',
    kind: 'digital',
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
    coverImage: '/images/covers/rsd-handbook-cover.png',
  },
  {
    id: 'rsd-workbook-ebook',
    slug: 'rsd-workbook-ebook',
    name: 'RSD Companion Workbook - eBook',
    shortDescription:
      'Trigger inventories, emergency tools, communication scripts, and quick reference cards - designed to write in and return to.',
    kind: 'digital',
    coverImage: '/images/covers/rsd-workbook-cover.png',
    privateDownloadFile: 'rsd-workbook-ebook.pdf',
  },
  {
    id: 'rsd-workbook-paperback',
    slug: 'rsd-workbook-paperback',
    name: 'RSD Companion Workbook - Paperback',
    shortDescription: 'Paperback companion to the handbook - practical exercises and worksheets.',
    kind: 'physical',
    coverImage: '/images/covers/rsd-workbook-cover.png',
  },
]

export type ClientCatalogItem = Omit<CatalogItem, 'privateDownloadFile'> & { privateDownloadFile?: never }

export function catalogForClient(): ClientCatalogItem[] {
  return CATALOG.map(({ privateDownloadFile: _privateDownloadFile, ...rest }) => rest)
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
