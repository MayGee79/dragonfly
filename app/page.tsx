import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import ContentSection from '@/components/ContentSection'
import SpecialInterests from '@/components/SpecialInterests'
import WhyWorkWithMe from '@/components/WhyWorkWithMe'
import WorkTogether from '@/components/WorkTogether'
import AboutMe from '@/components/AboutMe'
import PracticalInfo from '@/components/PracticalInfo'
import Workshops from '@/components/Workshops'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { getPageBySlug } from '@/lib/content'

export default function HomePage() {
  let page: ReturnType<typeof getPageBySlug> | { slug: string; title: string; sections: any[] } = {
    slug: 'home',
    title: 'Dragonfly Psychotherapy',
    sections: [],
  }

  try {
    page = getPageBySlug('home') || {
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
  } catch (error) {
    console.error('Error loading page:', error)
    page = {
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
  }

  return (
    <>
      <Navigation className="home-nav" />
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
        <AboutMe />
        <SpecialInterests />
        <WhyWorkWithMe />
        <WorkTogether />
        <PracticalInfo />
        <Workshops />
        <Contact />
      </main>
      <Footer className="home-footer" />
    </>
  )
}

