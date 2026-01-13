'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import styles from './BlogCarousel.module.css'

interface BlogPost {
  slug: string
  title: string
  date: string
  author: string
  featuredImage?: string
  excerpt?: string
  featured: boolean
}

interface BlogCarouselProps {
  posts: BlogPost[]
}

export default function BlogCarousel({ posts }: BlogCarouselProps) {
  const [startIndex, setStartIndex] = useState(0)
  const visibleCount = 4

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const goToPrevious = useCallback(() => {
    setStartIndex((prev) => 
      prev === 0 ? Math.max(0, posts.length - visibleCount) : Math.max(0, prev - 1)
    )
  }, [posts.length])

  const goToNext = useCallback(() => {
    setStartIndex((prev) => 
      prev >= posts.length - visibleCount ? 0 : prev + 1
    )
  }, [posts.length])

  const handleKeyDown = useCallback((e: React.KeyboardEvent, direction: 'prev' | 'next') => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (direction === 'prev') {
        goToPrevious()
      } else {
        goToNext()
      }
    }
  }, [goToPrevious, goToNext])

  if (posts.length === 0) {
    return null
  }

  // Get the posts to display based on current start index
  const visiblePosts = posts.slice(startIndex, startIndex + visibleCount)
  const showNavigation = posts.length > visibleCount

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>From the Blog</h2>
        <p className={styles.subtitle}>Insights and reflections on therapy and wellbeing</p>

        <div className={styles.carouselWrapper}>
          {showNavigation && (
            <button
              className={`${styles.arrow} ${styles.arrowLeft}`}
              onClick={goToPrevious}
              onKeyDown={(e) => handleKeyDown(e, 'prev')}
              aria-label="Previous posts"
              type="button"
            >
              ←
            </button>
          )}

          <div className={styles.postsGrid}>
            {visiblePosts.map((post, index) => (
              <article key={`${startIndex}-${index}-${post.slug}`} className={styles.card}>
                {post.featuredImage && (
                  <div className={styles.imageContainer}>
                    <Link href={`/blog/${post.slug}`}>
                      <img 
                        src={post.featuredImage} 
                        alt={post.title} 
                        className={styles.image}
                        loading="lazy"
                      />
                    </Link>
                  </div>
                )}
                <div className={styles.cardContent}>
                  <time className={styles.date}>{formatDate(post.date)}</time>
                  <h3 className={styles.cardTitle}>
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  {post.excerpt && (
                    <p className={styles.excerpt}>{post.excerpt}</p>
                  )}
                  <Link href={`/blog/${post.slug}`} className={styles.readMore}>
                    Read more →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {showNavigation && (
            <button
              className={`${styles.arrow} ${styles.arrowRight}`}
              onClick={goToNext}
              onKeyDown={(e) => handleKeyDown(e, 'next')}
              aria-label="Next posts"
              type="button"
            >
              →
            </button>
          )}
        </div>

        <div className={styles.viewAll}>
          <Link href="/blog" className={styles.viewAllLink}>
            View all posts →
          </Link>
        </div>
      </div>
    </section>
  )
}
