import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { getBlogPostBySlug, getAllBlogSlugs, getAllBlogPosts } from '@/lib/content'
import { sanitizeForDisplay } from '@/lib/markdown'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import styles from './blog-post.module.css'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs()
  return slugs.map((slug) => ({ slug }))
}

const siteBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dragonflypsychotherapy.co.uk'

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const post = getBlogPostBySlug(resolvedParams.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found | Dragonfly Psychotherapy',
    }
  }

  const canonicalPath = `/blog/${resolvedParams.slug}`
  return {
    title: `${post.title} | Dragonfly Psychotherapy`,
    description: post.excerpt || `Read ${post.title} on Dragonfly Psychotherapy blog.`,
    alternates: {
      canonical: `${siteBaseUrl}${canonicalPath}`,
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: post.title,
      description: post.excerpt || `Read ${post.title} on Dragonfly Psychotherapy blog.`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  }
}

function markdownToHtml(markdown: string): string {
  // Simple markdown to HTML conversion
  let html = markdown
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    // Line breaks and paragraphs
    .split('\n\n')
    .map(para => para.trim())
    .filter(para => para)
    .map(para => {
      if (para.startsWith('<h') || para.startsWith('<ul') || para.startsWith('<ol')) {
        return para
      }
      return `<p>${para.replace(/\n/g, '<br />')}</p>`
    })
    .join('\n')
  
  return html
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params
  const post = getBlogPostBySlug(resolvedParams.slug)

  if (!post || !post.published) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const htmlContent = sanitizeForDisplay(markdownToHtml(post.body))

  const allPosts = getAllBlogPosts()
  const currentIndex = allPosts.findIndex((p) => p.slug === resolvedParams.slug)
  const prevPost = currentIndex >= 0 && currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dragonflypsychotherapy.co.uk'
  const postUrl = `${baseUrl}/blog/${resolvedParams.slug}`
  const imageUrl = post.featuredImage
    ? (post.featuredImage.startsWith('http') ? post.featuredImage : `${baseUrl}${post.featuredImage.startsWith('/') ? post.featuredImage : '/' + post.featuredImage}`)
    : undefined
  const logoUrl = `${baseUrl}/images/dragonfly_logo_blue.png`

  // Structured data for SEO and AI discoverability
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    ...(imageUrl && { image: imageUrl }),
    publisher: {
      '@type': 'Organization',
      name: 'Dragonfly Psychotherapy',
      logo: {
        '@type': 'ImageObject',
        url: logoUrl,
      },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navigation className="home-nav" />
      <main>
        <article className={styles.article}>
          <div className={styles.container}>
            <header className={styles.header}>
              <div className={styles.meta}>
                <time className={styles.date}>{formatDate(post.date)}</time>
                {post.category && (
                  <span className={styles.category}>{post.category}</span>
                )}
              </div>
              <h1 className={styles.title}>{post.title}</h1>
              <p className={styles.author}>By {post.author}</p>
            </header>

            {post.featuredImage && (
              <div className={styles.featuredImageContainer}>
                <img 
                  src={post.featuredImage} 
                  alt={post.title} 
                  className={styles.featuredImage}
                />
              </div>
            )}

            <div 
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

            {post.tags && post.tags.length > 0 && (
              <div className={styles.tags}>
                {post.tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>{tag}</span>
                ))}
              </div>
            )}

            <nav className={styles.postNav}>
              <div className={styles.navLinks}>
                {prevPost ? (
                  <Link href={`/blog/${prevPost.slug}`} className={styles.prevLink}>
                    ← {prevPost.title}
                  </Link>
                ) : (
                  <span className={styles.navPlaceholder} />
                )}
                {nextPost ? (
                  <Link href={`/blog/${nextPost.slug}`} className={styles.nextLink}>
                    {nextPost.title} →
                  </Link>
                ) : (
                  <span className={styles.navPlaceholder} />
                )}
              </div>
            </nav>

            <div className={styles.backLink}>
              <Link href="/blog">← Back to all posts</Link>
            </div>
          </div>
        </article>
      </main>
      <Footer className="home-footer" />
    </>
  )
}
