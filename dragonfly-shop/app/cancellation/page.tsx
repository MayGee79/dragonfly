import type { Metadata } from 'next'
import ShopLegalDocument from '@/components/ShopLegalDocument'
import { readShopContent } from '@/lib/shopContent'

export const metadata: Metadata = {
  title: 'Cancellation Form',
  description: 'Model cancellation form for physical goods purchased from Dragonfly Shop.',
}

export default function CancellationPage() {
  return <ShopLegalDocument text={readShopContent('cancellation-form.txt')} />
}
