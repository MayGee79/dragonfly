import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

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

// Generate excerpt from body content (first 160 characters of plain text)
function generateExcerpt(body: string, maxLength: number = 160): string {
  const plainText = body
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  
  if (plainText.length <= maxLength) {
    return plainText
  }
  
  const truncated = plainText.substring(0, maxLength)
  const lastSpace = truncated.lastIndexOf(' ')
  return (lastSpace > 0 ? truncated.substring(0, lastSpace) : truncated) + '...'
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
      published: data.published || false,
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
