import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ContentSection from '@/components/ContentSection'

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navigation />
      <main>
        <ContentSection 
          title="Privacy Policy"
          content="Privacy policy content will be managed through the CMS."
        />
      </main>
      <Footer />
    </>
  )
}

