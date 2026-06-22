export type AiTransparencyBlock =
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }

export type AiTransparencySection = {
  title: string
  blocks: AiTransparencyBlock[]
}

export function parseAiTransparency(raw: string): { lastUpdated: string; sections: AiTransparencySection[] } {
  const lines = raw.split(/\r?\n/)
  let i = 0

  while (i < lines.length && !/^Last updated:/i.test(lines[i].trim())) {
    i++
  }
  const lastUpdated = (lines[i]?.replace(/^Last updated:\s*/i, '') ?? 'June 2026').trim()
  i++

  const sections: AiTransparencySection[] = []
  let currentTitle = ''
  let blocks: AiTransparencyBlock[] = []
  let paragraphBuf: string[] = []
  let listBuf: string[] = []

  const flushParagraph = () => {
    const text = paragraphBuf.join(' ').trim()
    if (text) blocks.push({ type: 'p', text })
    paragraphBuf = []
  }

  const flushList = () => {
    if (listBuf.length > 0) {
      blocks.push({ type: 'ul', items: [...listBuf] })
      listBuf = []
    }
  }

  const flushSection = () => {
    flushParagraph()
    flushList()
    if (currentTitle && blocks.length > 0) {
      sections.push({ title: currentTitle, blocks })
      blocks = []
    }
  }

  for (; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) {
      flushParagraph()
      flushList()
      continue
    }
    if (line.startsWith('## ')) {
      flushSection()
      currentTitle = line.slice(3).trim()
      continue
    }
    if (line.startsWith('- ')) {
      flushParagraph()
      listBuf.push(line.slice(2).trim())
      continue
    }
    flushList()
    paragraphBuf.push(line)
  }

  flushSection()

  return { lastUpdated, sections }
}
