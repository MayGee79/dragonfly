import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ContentSection from '@/components/ContentSection'

export default function FAQsPage() {
  return (
    <>
      <Navigation />
      <main>
        <ContentSection 
          title="Frequently Asked Questions"
          content="FAQ content will be managed through the CMS."
        />
      </main>
      <Footer />
    </>
  )
}

