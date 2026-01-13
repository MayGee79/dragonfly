import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { getBlogPostBySlug, getAllBlogSlugs } from '@/lib/content'
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

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const post = getBlogPostBySlug(resolvedParams.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found | Dragonfly Psychotherapy',
    }
  }

  return {
    title: `${post.title} | Dragonfly Psychotherapy`,
    description: post.excerpt || `Read ${post.title} on Dragonfly Psychotherapy blog.`,
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

  const htmlContent = markdownToHtml(post.body)

  // Structured data for SEO
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
    image: post.featuredImage,
    publisher: {
      '@type': 'Organization',
      name: 'Dragonfly Psychotherapy',
      logo: {
        '@type': 'ImageObject',
        url: '/images/dragonfly-logo.png',
      },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navigation />
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

            <div className={styles.backLink}>
              <Link href="/blog">← Back to all posts</Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
