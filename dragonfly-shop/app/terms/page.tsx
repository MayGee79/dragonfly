import type { Metadata } from 'next'
import ShopLegalDocument from '@/components/ShopLegalDocument'
import { readShopContent } from '@/lib/shopContent'

export const metadata: Metadata = {
  title: 'Shop Terms and Conditions',
  description: 'Terms and conditions for purchases on Dragonfly Shop.',
}

export default function TermsPage() {
  return <ShopLegalDocument text={readShopContent('terms.txt')} />
}
