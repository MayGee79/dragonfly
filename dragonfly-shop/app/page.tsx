import ShopHome from '@/components/ShopHome'
import { catalogForClient } from '@/lib/catalog'

export default function HomePage() {
  return <ShopHome catalog={catalogForClient()} />
}
