'use client'

import { useEffect } from 'react'
import type { MetaPurchasePayload } from '@/lib/metaPixel'
import { trackMetaPurchase } from '@/lib/metaPixel'

export default function SuccessPurchaseTracking({
  sessionId,
  purchase,
}: {
  sessionId: string
  purchase: MetaPurchasePayload
}) {
  useEffect(() => {
    const storageKey = `meta_purchase_tracked_${sessionId}`
    try {
      if (sessionStorage.getItem(storageKey)) return
      trackMetaPurchase(purchase)
      sessionStorage.setItem(storageKey, '1')
    } catch {
      trackMetaPurchase(purchase)
    }
    // Purchase payload is fixed for this Stripe session on first render.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- sessionId is the dedupe key
  }, [sessionId])

  return null
}
