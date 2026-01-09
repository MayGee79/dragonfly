import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import ContentSection from '@/components/ContentSection'
import SpecialInterests from '@/components/SpecialInterests'
import Footer from '@/components/Footer'
import { getPageBySlug } from '@/lib/content'
import { markdownToHtml } from '@/lib/markdown'

export default function HomePage() {
  const page = getPageBySlug('home') || {
    slug: 'home',
    title: 'Dragonfly Psychotherapy',
    sections: [
      {
        type: 'hero',
        title: 'Dragonfly Psychotherapy',
        subtitle: 'Dr Victoria Froome | Integrative Psychotherapist and Former NHS GP',
        layout: 'text-only',
        enabled: true,
      },
      {
        type: 'content',
        title: 'Welcome',
        content: 'Psychotherapy and counselling services in Surrey',
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
              // For static export, we'll render markdown on the client side
              // or pre-render it during build
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
        <SpecialInterests />
      </main>
      <Footer />
    </>
  )
}

