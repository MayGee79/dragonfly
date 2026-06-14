import type { Metadata } from 'next'
import ShopLegalDocument from '@/components/ShopLegalDocument'
import { readShopContent } from '@/lib/shopContent'

export const metadata: Metadata = {
  title: 'Privacy Notice',
  description: 'Privacy Notice for Dragonfly Shop (dragonflyshop.co.uk).',
}

export default function PrivacyPage() {
  return <ShopLegalDocument text={readShopContent('privacy.txt')} />
}
