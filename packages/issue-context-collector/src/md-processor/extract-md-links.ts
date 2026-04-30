import markdownit from 'markdown-it'

export async function extractMDLinks(content: string) {
  const md = markdownit()
  const tokens = md.parse(content, {})
  const links: { text: string | undefined; href: string }[] = []

  tokens.forEach((token) => {
    if (token.type === 'inline' && token.children) {
      token.children.forEach((child, index) => {
        if (child.type === 'link_open') {
          const href = child.attrGet('href')
          if (!href) return
          const text = token.children?.[index + 1]?.content
          links.push({ text, href })
        }
      })
    }
  })
  return links
}

if (import.meta.main) {
  async function cli() {
    const input = process.argv[2]
    if (!input) {
      console.error('Usage:  <input-file>')
      process.exit(1)
    }

    const { readFile } = await import('node:fs/promises')

    const content = await readFile(input, 'utf-8')
    const links = await extractMDLinks(content)
    console.log(links)
  }
  cli()
}
