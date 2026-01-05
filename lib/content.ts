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
  featuredImage?: string
  excerpt?: string
  body: string
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

export function getBlogPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(contentDirectory, 'blog', `${slug}.md`)
    if (!fs.existsSync(fullPath)) {
      return null
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    return {
      slug: data.slug || slug,
      title: data.title,
      date: data.date,
      featuredImage: data.featuredImage,
      excerpt: data.excerpt,
      body: content,
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

