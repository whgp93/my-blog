import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'
import TurndownService from 'turndown'
import { getAllPosts } from '@/lib/posts'

const td = new TurndownService({ headingStyle: 'atx', bulletListMarker: '-' })

const postsDir = path.join(process.cwd(), 'content', 'posts')

export async function GET() {
  const posts = getAllPosts()
  return NextResponse.json(posts)
}

export async function POST(req: NextRequest) {
  try {
    const { title, category, image, excerpt, author, featured, slug, content } = await req.json()

    if (!title || !slug) {
      return NextResponse.json({ error: 'العنوان والرابط مطلوبان' }, { status: 400 })
    }

    const today = new Date().toISOString().split('T')[0]
    const frontmatter = [
      '---',
      `title: "${title.replace(/"/g, '\\"')}"`,
      `date: "${today}"`,
      `category: "${category ?? 'تقنية'}"`,
      `image: "${image ?? '/images/default.jpg'}"`,
      `excerpt: "${(excerpt ?? '').replace(/"/g, '\\"')}"`,
      `author: "${(author ?? 'المدوّن').replace(/"/g, '\\"')}"`,
      ...(featured ? ['featured: true'] : []),
      '---',
      '',
    ].join('\n')

    // Convert HTML from Tiptap to Markdown
    const markdown = frontmatter + td.turndown(content ?? '')

    const sanitizedSlug = slug.replace(/[^a-zA-Z0-9\u0600-\u06FF._-]/g, '-')
    await mkdir(postsDir, { recursive: true })
    await writeFile(path.join(postsDir, `${sanitizedSlug}.md`), markdown, 'utf-8')

    return NextResponse.json({ ok: true, slug: sanitizedSlug })
  } catch (error) {
    console.error('Create post error:', error)
    return NextResponse.json({ error: 'فشل حفظ المقال' }, { status: 500 })
  }
}
