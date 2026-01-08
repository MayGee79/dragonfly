import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import ContentSection from '@/components/ContentSection'
import Footer from '@/components/Footer'
import { getPageBySlug } from '@/lib/content'

export default function FAQsPage() {
  const page = getPageBySlug('faqs') || {
    slug: 'faqs',
    title: 'FAQs',
    sections: [
      {
        type: 'content',
        title: 'Frequently Asked Questions',
        content: 'FAQ content will be managed through the CMS.',
        layout: 'text-only',
        enabled: true,
      },
    ],
  }

  return (
    <>
      <Navigation />
      <main>
        {page.sections
          .filter((section) => section.enabled !== false)
          .map((section, index) => {
            if (section.type === 'hero') {
              return (
                <Hero
                  key={index}
                  title={section.title || ''}
                  subtitle={section.subtitle}
                  image={section.image}
                  layout={section.layout || 'text-only'}
                />
              )
            } else if (section.type === 'content') {
              return (
                <ContentSection
                  key={index}
                  title={section.title}
                  content={section.content || ''}
                  image={section.image}
                  layout={section.layout || 'text-only'}
                />
              )
            }
            return null
          })}
      </main>
      <Footer />
    </>
  )
}

