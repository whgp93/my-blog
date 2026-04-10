import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

interface SearchItem {
  slug: string
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  image: string
  content: string
}

function buildSearchIndex(): SearchItem[] {
  const postsDir = path.join(process.cwd(), 'content/posts')
  if (!fs.existsSync(postsDir)) return []

  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'))

  return files.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '')
    const raw = fs.readFileSync(path.join(postsDir, fileName), 'utf8')
    const { data, content } = matter(raw)

    // Strip markdown symbols for plain text search
    const plainContent = content
      .replace(/#{1,6}\s/g, '')
      .replace(/\*\*|__|\*|_/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/`{1,3}[^`]*`{1,3}/g, '')
      .replace(/\n+/g, ' ')
      .trim()

    return {
      slug,
      title: data.title ?? '',
      excerpt: data.excerpt ?? '',
      category: data.category ?? '',
      author: data.author ?? '',
      date: data.date ?? '',
      image: data.image ?? '',
      content: plainContent.slice(0, 2000), // limit size
    }
  })
}

const index = buildSearchIndex()
const outputPath = path.join(process.cwd(), 'public', 'search-index.json')
fs.writeFileSync(outputPath, JSON.stringify(index, null, 2), 'utf8')
console.log(`✓ Search index built: ${index.length} posts → ${outputPath}`)
