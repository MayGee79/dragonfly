import { remark } from 'remark'
import remarkHtml from 'remark-html'
import sanitizeHtml from 'sanitize-html'

const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: ['p', 'br', 'strong', 'em', 'b', 'i', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'a', 'blockquote', 'code', 'pre', 'hr', 'span', 'div'],
  allowedAttributes: { a: ['href', 'target', 'rel'] },
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

