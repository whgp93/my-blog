import { writeFile } from 'fs/promises'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/posts'

export async function GET() {
  const posts = getAllPosts()
  return NextResponse.json(posts)
}

export async function POST(req: NextRequest) {
  try {
    const { title, category, image, excerpt, author, featured, slug, content } = await req.json()

    if (!title || !slug || !content) {
      return NextResponse.json({ error: 'الحقول المطلوبة ناقصة' }, { status: 400 })
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

    const markdown = frontmatter + content

    const sanitizedSlug = slug.replace(/[^a-zA-Z0-9\u0600-\u06FF._-]/g, '-')
    const filePath = path.join(process.cwd(), 'content', 'posts', `${sanitizedSlug}.md`)
    await writeFile(filePath, markdown, 'utf-8')

    return NextResponse.json({ ok: true, slug: sanitizedSlug })
  } catch (error) {
    console.error('Create post error:', error)
    return NextResponse.json({ error: 'فشل حفظ المقال' }, { status: 500 })
  }
}
