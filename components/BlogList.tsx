'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './BlogList.module.css'

interface BlogPost {
  slug: string
  title: string
  date: string
  author: string
  featuredImage?: string
  excerpt?: string
  category?: string
  featured: boolean
}

interface BlogListProps {
  initialPosts: BlogPost[]
  postsPerPage?: number
}

export default function BlogList({ initialPosts, postsPerPage = 6 }: BlogListProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(initialPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const currentPosts = initialPosts.slice(startIndex, endIndex)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const goToPage = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (initialPosts.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No blog posts yet. Check back soon!</p>
      </div>
    )
  }

  return (
    <>
      <div className={styles.postsList}>
        {currentPosts.map((post) => (
          <article key={post.slug} className={`${styles.postCard} ${post.featured ? styles.featured : ''}`}>
            {post.featuredImage && (
              <div className={styles.imageContainer}>
                <Link href={`/blog/${post.slug}`}>
                  <img 
                    src={post.featuredImage} 
                    alt={post.title} 
                    className={styles.postImage}
                  />
                </Link>
                {post.featured && (
                  <span className={styles.featuredBadge}>Featured</span>
                )}
              </div>
            )}
            <div className={styles.postContent}>
              <div className={styles.postMeta}>
                <time className={styles.postDate}>{formatDate(post.date)}</time>
                {post.category && (
                  <span className={styles.postCategory}>{post.category}</span>
                )}
              </div>
              <h2 className={styles.postTitle}>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              {post.excerpt && (
                <p className={styles.postExcerpt}>{post.excerpt}</p>
              )}
              <Link href={`/blog/${post.slug}`} className={styles.readMore}>
                Read more →
              </Link>
            </div>
          </article>
        ))}
      </div>

      {totalPages > 1 && (
        <nav className={styles.pagination} aria-label="Blog pagination">
          {currentPage > 1 && (
            <button 
              onClick={() => goToPage(currentPage - 1)}
              className={styles.paginationLink}
              aria-label="Previous page"
            >
              ← Previous
            </button>
          )}
          
          <div className={styles.pageNumbers}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => goToPage(pageNum)}
                className={`${styles.pageNumber} ${pageNum === currentPage ? styles.active : ''}`}
                aria-label={`Page ${pageNum}`}
                aria-current={pageNum === currentPage ? 'page' : undefined}
              >
                {pageNum}
              </button>
            ))}
          </div>

          {currentPage < totalPages && (
            <button 
              onClick={() => goToPage(currentPage + 1)}
              className={styles.paginationLink}
              aria-label="Next page"
            >
              Next →
            </button>
          )}
        </nav>
      )}
    </>
  )
}
