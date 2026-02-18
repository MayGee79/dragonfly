import dynamic from 'next/dynamic'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import ContentSection from '@/components/ContentSection'
import { getPageBySlug } from '@/lib/content'

// Below-the-fold sections: load with dynamic() so their CSS is in separate chunks and does not block the critical path
const AboutMe = dynamic(() => import('@/components/AboutMe'), { ssr: true })
const SpecialInterests = dynamic(() => import('@/components/SpecialInterests'), { ssr: true })
const WhyWorkWithMe = dynamic(() => import('@/components/WhyWorkWithMe'), { ssr: true })
const WorkTogether = dynamic(() => import('@/components/WorkTogether'), { ssr: true })
const PracticalInfo = dynamic(() => import('@/components/PracticalInfo'), { ssr: true })
const Workshops = dynamic(() => import('@/components/Workshops'), { ssr: true })
const BlogPreview = dynamic(() => import('@/components/BlogPreview'), { ssr: true })
const Contact = dynamic(() => import('@/components/Contact'), { ssr: true })
const Footer = dynamic(() => import('@/components/Footer'), { ssr: true })

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

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dragonflypsychotherapy.co.uk'

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${baseUrl}/#organization`,
    name: 'Dragonfly Psychotherapy',
    description: 'Integrative psychotherapy and counselling in Surrey and online. Dr Victoria Froome, BACP-registered. Guildford, East Horsley, and remote sessions.',
    url: baseUrl,
    telephone: '+44-7546-431-448',
    email: 'victoria@dragonflypsychotherapy.co.uk',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '3 Beaufort, Parklands',
      addressLocality: 'Guildford',
      addressRegion: 'Surrey',
      postalCode: 'GU2 9JX',
      addressCountry: 'GB',
    },
    hasMap: 'https://www.google.com/maps/search/?api=1&query=Guildford+Therapy+Rooms,+3+Beaufort,+Parklands,+Guildford,+GU2+9JX',
    areaServed: [
      { '@type': 'City', name: 'Guildford' },
      { '@type': 'City', name: 'East Horsley' },
      { '@type': 'City', name: 'Woking' },
      { '@type': 'City', name: 'Cobham' },
      { '@type': 'City', name: 'Godalming' },
      { '@type': 'City', name: 'Leatherhead' },
      { '@type': 'City', name: 'Dorking' },
      { '@type': 'AdministrativeArea', name: 'Surrey' },
    ],
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 51.2354,
      longitude: -0.5743,
      addressLocality: 'Guildford',
      addressRegion: 'Surrey',
    },
    priceRange: '££',
    openingHours: 'By appointment',
    sameAs: [
      'https://www.facebook.com/profile.php?id=61570517201870',
      'https://www.instagram.com/dragonflypsychotherapy/',
      'https://www.linkedin.com/in/victoria-froome-71a723342/',
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
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
        <BlogPreview />
        <Contact />
      </main>
      <Footer className="home-footer" />
    </>
  )
}

