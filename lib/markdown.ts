import { remark } from 'remark'
import remarkHtml from 'remark-html'
import sanitizeHtml from 'sanitize-html'

const MARKDOWN_IMAGE = /!\[([^\]]*)\]\(([^)\s]+)(?:\s+["']([^"']*)["'])?\)/g
const LEADING_MARKDOWN_IMAGE = /^\s*!\[([^\]]*)\]\(([^)\s]+)(?:\s+["']([^"']*)["'])?\)\s*/

function isAllowedImageSrc(src: string): boolean {
  return (
    src.startsWith('/images/') ||
    src.startsWith('https://') ||
    src.startsWith('http://')
  )
}

function escapeAttribute(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
}

export function stripMarkdownImages(markdown: string): string {
  return markdown.replace(MARKDOWN_IMAGE, ' ')
}

export function extractLeadingMarkdownImage(markdown: string): { src: string; rest: string } | null {
  const match = markdown.match(LEADING_MARKDOWN_IMAGE)
  if (!match) {
    return null
  }
  const src = match[2]
  if (!isAllowedImageSrc(src)) {
    return null
  }
  return {
    src,
    rest: markdown.slice(match[0].length),
  }
}

export function markdownImagesToHtml(markdown: string): string {
  return markdown.replace(MARKDOWN_IMAGE, (_full, alt: string, src: string, title?: string) => {
    if (!isAllowedImageSrc(src)) {
      return ''
    }
    const safeAlt = escapeAttribute(alt || title || '')
    const titleAttr = title ? ` title="${escapeAttribute(title)}"` : ''
    return `<img src="${escapeAttribute(src)}" alt="${safeAlt}"${titleAttr} />`
  })
}

const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: ['p', 'br', 'strong', 'em', 'b', 'i', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'a', 'blockquote', 'code', 'pre', 'hr', 'span', 'div', 'img'],
  allowedAttributes: {
    a: ['href', 'target', 'rel'],
    img: ['src', 'alt', 'title'],
  },
  allowedSchemes: ['http', 'https', 'mailto'],
  allowedSchemesByTag: {
    img: ['http', 'https'],
  },
  exclusiveFilter(frame) {
    if (frame.tag !== 'img') {
      return false
    }
    return !isAllowedImageSrc(frame.attribs.src || '')
  },
}

export function sanitizeForDisplay(html: string): string {
  return sanitizeHtml(html, SANITIZE_OPTIONS)
}

function addExternalLinkTargets(html: string): string {
  return html.replace(/<a href="(https?:\/\/[^"]*)"/g, '<a href="$1" target="_blank" rel="noopener noreferrer"')
}

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(remarkHtml).process(markdown)
  return addExternalLinkTargets(sanitizeHtml(result.toString(), SANITIZE_OPTIONS))
}

