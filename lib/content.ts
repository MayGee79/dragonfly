import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { META_DESCRIPTION_MAX, truncateAtWord } from '@/lib/seo'

const contentDirectory = path.join(process.cwd(), 'content')

export interface PageSection {
  type: 'hero' | 'content'
  title?: string
  subtitle?: string
  content?: string
  image?: string
  layout?: 'text-only' | 'text-image' | 'image-text'
  enabled?: boolean
}

export interface Page {
  slug: string
  title: string
  metaDescription?: string
  sections: PageSection[]
}

export interface BlogPost {
  slug: string
  title: string
  date: string
  author: string
  featuredImage?: string
  excerpt?: string
  body: string
  category?: string
  tags?: string[]
  featured: boolean
  published: boolean
}

export function getPageBySlug(slug: string): Page | null {
  try {
    const fullPath = path.join(contentDirectory, 'pages', `${slug}.md`)
    if (!fs.existsSync(fullPath)) {
      return null
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    return {
      slug: data.slug || slug,
      title: data.title,
      metaDescription: data.metaDescription,
      sections: data.sections || [],
    }
  } catch (error) {
    console.error(`Error reading page ${slug}:`, error)
    return null
  }
}

export interface ProfessionalMembershipPage {
  title: string
  slug: string
  metaDescription?: string
  qualifications: string[]
  cpd: string[]
  membershipText: string
}

export function getProfessionalMembershipPage(): ProfessionalMembershipPage | null {
  try {
    const fullPath = path.join(contentDirectory, 'pages', 'professional-membership.md')
    if (!fs.existsSync(fullPath)) {
      return null
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)

    const qualifications = Array.isArray(data.qualifications)
      ? data.qualifications.map((q: { item?: string } | string) => (typeof q === 'string' ? q : q?.item ?? '')).filter(Boolean)
      : []

    const cpd = Array.isArray(data.cpd)
      ? data.cpd.map((c: { item?: string } | string) => (typeof c === 'string' ? c : c?.item ?? '')).filter(Boolean)
      : []

    return {
      title: data.title || 'Professional Qualifications and Membership',
      slug: data.slug || 'professional-membership',
      metaDescription: data.metaDescription,
      qualifications,
      cpd,
      membershipText: data.membershipText || '',
    }
  } catch (error) {
    console.error('Error reading professional-membership page:', error)
    return null
  }
}

export interface Testimonial {
  quote: string
  author: string
}

export interface TestimonialsPage {
  title: string
  slug: string
  metaDescription?: string
  testimonials: Testimonial[]
}

export interface WorkshopItem {
  title: string
  description: string
  linkText: string
}

export interface WorkshopsPage {
  title: string
  slug: string
  metaDescription?: string
  heroImage?: string
  workshops: WorkshopItem[]
}

export function getWorkshopsPage(): WorkshopsPage | null {
  try {
    const fullPath = path.join(contentDirectory, 'pages', 'workshops-and-talks.md')
    if (!fs.existsSync(fullPath)) {
      return null
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)

    const workshops: WorkshopItem[] = Array.isArray(data.workshops)
      ? data.workshops
          .map((w: { title?: string; description?: string; linkText?: string }) => ({
            title: w?.title ?? '',
            description: w?.description ?? '',
            linkText: w?.linkText ?? 'Please enquire →',
          }))
          .filter((w) => w.title)
      : []

    return {
      title: data.title || 'Workshops and Talks',
      slug: data.slug || 'workshops-and-talks',
      metaDescription: data.metaDescription,
      heroImage: data.heroImage,
      workshops,
    }
  } catch (error) {
    console.error('Error reading workshops-and-talks page:', error)
    return null
  }
}

export function getTestimonialsPage(): TestimonialsPage | null {
  try {
    const fullPath = path.join(contentDirectory, 'pages', 'testimonials.md')
    if (!fs.existsSync(fullPath)) {
      return null
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)

    const testimonials: Testimonial[] = Array.isArray(data.testimonials)
      ? data.testimonials
          .map((t: { quote?: string; author?: string }) => ({
            quote: t?.quote ?? '',
            author: t?.author ?? '',
          }))
          .filter((t) => t.quote)
      : []

    return {
      title: data.title || 'Testimonials',
      slug: data.slug || 'testimonials',
      metaDescription: data.metaDescription,
      testimonials,
    }
  } catch (error) {
    console.error('Error reading testimonials page:', error)
    return null
  }
}

export interface ShopProduct {
  productTitle: string
  productQuantity?: string
  productLink: string
  linkText: string
}

export interface ShopCategory {
  categoryTitle: string
  categoryDescription: string
  products: ShopProduct[]
}

export interface ShopPage {
  title: string
  slug: string
  metaDescription?: string
  categories: ShopCategory[]
}

export function getShopPage(): ShopPage | null {
  try {
    const fullPath = path.join(contentDirectory, 'shop.md')
    if (!fs.existsSync(fullPath)) {
      return null
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)

    const categories: ShopCategory[] = Array.isArray(data.categories)
      ? data.categories
          .map((c: { categoryTitle?: string; categoryDescription?: string; products?: ShopProduct[] }) => ({
            categoryTitle: c?.categoryTitle ?? '',
            categoryDescription: c?.categoryDescription ?? '',
            products: Array.isArray(c?.products)
              ? c.products
                  .map((p: { productTitle?: string; productQuantity?: string; productLink?: string; linkText?: string }) => ({
                    productTitle: p?.productTitle ?? '',
                    productQuantity: p?.productQuantity || undefined,
                    productLink: p?.productLink ?? '',
                    linkText: p?.linkText ?? '',
                  }))
                  .filter((p) => p.productTitle && p.productLink)
              : [],
          }))
          .filter((c) => c.categoryTitle)
      : []

    return {
      title: data.title || 'Dragonfly Shop',
      slug: data.slug || 'shop',
      metaDescription: data.metaDescription,
      categories,
    }
  } catch (error) {
    console.error('Error reading shop page:', error)
    return null
  }
}

export function getAllPages(): Page[] {
  try {
    const pagesDirectory = path.join(contentDirectory, 'pages')
    if (!fs.existsSync(pagesDirectory)) {
      return []
    }
    const fileNames = fs.readdirSync(pagesDirectory)
    const pages = fileNames
      .filter((name) => name.endsWith('.md'))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, '')
        return getPageBySlug(slug)
      })
      .filter((page): page is Page => page !== null)
    
    return pages
  } catch (error) {
    console.error('Error reading pages:', error)
    return []
  }
}

// Generate excerpt from body content for meta descriptions and blog cards.
function generateExcerpt(body: string, maxLength: number = META_DESCRIPTION_MAX): string {
  const plainText = body
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  return truncateAtWord(plainText, maxLength)
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(contentDirectory, 'blog', `${slug}.md`)
    if (!fs.existsSync(fullPath)) {
      return null
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    const excerpt = data.excerpt || generateExcerpt(content)
    
    return {
      slug: data.slug || slug,
      title: data.title,
      date: data.date,
      author: data.author || 'Vicky',
      featuredImage: data.featuredImage,
      excerpt,
      body: content,
      category: data.category,
      tags: data.tags || [],
      featured: data.featured || false,
      // Treat a missing flag as published so CMS posts (which omit it) go live.
      // Only an explicit `published: false` hides a post as a draft.
      published: data.published !== false,
    }
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error)
    return null
  }
}

export function getAllBlogPosts(): BlogPost[] {
  try {
    const blogDirectory = path.join(contentDirectory, 'blog')
    if (!fs.existsSync(blogDirectory)) {
      return []
    }
    const fileNames = fs.readdirSync(blogDirectory)
    const posts = fileNames
      .filter((name) => name.endsWith('.md'))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, '')
        return getBlogPostBySlug(slug)
      })
      .filter((post): post is BlogPost => post !== null && post.published)
      .sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      })
    
    return posts
  } catch (error) {
    console.error('Error reading blog posts:', error)
    return []
  }
}

export function getPaginatedBlogPosts(page: number = 1, perPage: number = 6): {
  posts: BlogPost[]
  totalPages: number
  currentPage: number
  totalPosts: number
} {
  const allPosts = getAllBlogPosts()
  const totalPosts = allPosts.length
  const totalPages = Math.ceil(totalPosts / perPage)
  const startIndex = (page - 1) * perPage
  const endIndex = startIndex + perPage
  const posts = allPosts.slice(startIndex, endIndex)
  
  return {
    posts,
    totalPages,
    currentPage: page,
    totalPosts,
  }
}

export function getFeaturedBlogPosts(count: number = 3): BlogPost[] {
  const allPosts = getAllBlogPosts()
  
  const featuredPosts = allPosts.filter(post => post.featured)
  const nonFeaturedPosts = allPosts.filter(post => !post.featured)
  
  const combinedPosts = [...featuredPosts, ...nonFeaturedPosts]
  
  return combinedPosts.slice(0, count)
}

export function getAllBlogSlugs(): string[] {
  try {
    const blogDirectory = path.join(contentDirectory, 'blog')
    if (!fs.existsSync(blogDirectory)) {
      return []
    }
    const fileNames = fs.readdirSync(blogDirectory)
    return fileNames
      .filter((name) => name.endsWith('.md'))
      .map((fileName) => fileName.replace(/\.md$/, ''))
  } catch (error) {
    console.error('Error reading blog slugs:', error)
    return []
  }
}
