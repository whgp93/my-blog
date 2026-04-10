import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Post, PostMeta, Category } from '@/types/post'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) return []

  const fileNames = fs.readdirSync(postsDirectory).filter(f => f.endsWith('.md'))

  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)

    return {
      slug,
      title: data.title || '',
      date: data.date || '',
      category: (data.category || 'تقنية') as Category,
      image: data.image || '/images/placeholder.jpg',
      excerpt: data.excerpt || '',
      author: data.author || '',
      featured: data.featured || false,
    } satisfies PostMeta
  })

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug: string): Post {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    title: data.title || '',
    date: data.date || '',
    category: (data.category || 'تقنية') as Category,
    image: data.image || '/images/placeholder.jpg',
    excerpt: data.excerpt || '',
    author: data.author || '',
    featured: data.featured || false,
    content,
  }
}

export function getPostsByCategory(category: Category): PostMeta[] {
  return getAllPosts().filter((p) => p.category === category)
}

export function getFeaturedPost(): PostMeta | undefined {
  const posts = getAllPosts()
  return posts.find((p) => p.featured) || posts[0]
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return []
  return fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
}
