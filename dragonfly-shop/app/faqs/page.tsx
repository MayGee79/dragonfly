import type { Metadata } from 'next'
import ShopLegalDocument from '@/components/ShopLegalDocument'
import { readShopContent } from '@/lib/shopContent'

export const metadata: Metadata = {
  title: 'Shop FAQs',
  description: 'Frequently asked questions about ordering from Dragonfly Shop.',
}

export default function FaqsPage() {
  return <ShopLegalDocument text={readShopContent('faqs.txt')} />
}
