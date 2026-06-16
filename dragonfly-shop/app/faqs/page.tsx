import type { Metadata } from 'next'
import ShopFaqsDocument from '@/components/ShopFaqsDocument'
import { readShopContent } from '@/lib/shopContent'

export const metadata: Metadata = {
  title: 'Shop FAQs',
  description: 'Frequently asked questions about ordering from Dragonfly Shop.',
}

export default function FaqsPage() {
  return <ShopFaqsDocument text={readShopContent('faqs.txt')} />
}
