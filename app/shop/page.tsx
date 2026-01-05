import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ContentSection from '@/components/ContentSection'

export default function ShopPage() {
  return (
    <>
      <Navigation />
      <main>
        <ContentSection 
          title="Shop"
          content="Welcome to our shop. Products coming soon."
        />
      </main>
      <Footer />
    </>
  )
}

