import type { Metadata } from 'next'
import ShopHome from '@/components/ShopHome'
import { catalogForClient } from '@/lib/catalog'

const HOME_DESCRIPTION =
  'Shop Dragonfly Psychotherapy books by Dr Victoria Froome: Strength Beneath® Collection, RSD Handbook and Companion Workbook, and Starting University guides. eBook, paperback and hardback — UK shipping.'

export const metadata: Metadata = {
  title: {
    absolute: 'Dragonfly Shop | Books & Workbooks by Dr Victoria Froome',
  },
  description: HOME_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Dragonfly Shop | Books & Workbooks by Dr Victoria Froome',
    description: HOME_DESCRIPTION,
    url: '/',
  },
}

export default function HomePage() {
  return <ShopHome catalog={catalogForClient()} />
}
