import { readFile, writeFile, unlink } from 'fs/promises'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'
import matter from 'gray-matter'
import TurndownService from 'turndown'

const td = new TurndownService({ headingStyle: 'atx', bulletListMarker: '-' })

function postPath(slug: string) {
  return path.join(process.cwd(), 'content', 'posts', `${slug}.md`)
}

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const raw = await readFile(postPath(params.slug), 'utf-8')
    const { data, content } = matter(raw)
    return NextResponse.json({ ...data, content, slug: params.slug })
  } catch {
    return NextResponse.json({ error: 'المقال غير موجود' }, { status: 404 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { title, category, image, excerpt, author, featured, content } = await req.json()

    // Read existing to get original date
    let originalDate = new Date().toISOString().split('T')[0]
    try {
      const raw = await readFile(postPath(params.slug), 'utf-8')
      const { data } = matter(raw)
      if (data.date) originalDate = data.date
    } catch {}

    const frontmatter = [
      '---',
      `title: "${(title ?? '').replace(/"/g, '\\"')}"`,
      `date: "${originalDate}"`,
      `category: "${category ?? 'تقنية'}"`,
      `image: "${image ?? '/images/default.jpg'}"`,
      `excerpt: "${(excerpt ?? '').replace(/"/g, '\\"')}"`,
      `author: "${(author ?? 'المدوّن').replace(/"/g, '\\"')}"`,
      ...(featured ? ['featured: true'] : []),
      '---',
      '',
    ].join('\n')

    // Convert HTML from Tiptap to Markdown
    await writeFile(postPath(params.slug), frontmatter + td.turndown(content ?? ''), 'utf-8')
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Update post error:', error)
    return NextResponse.json({ error: 'فشل تحديث المقال' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    await unlink(postPath(params.slug))
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'فشل حذف المقال' }, { status: 500 })
  }
}
