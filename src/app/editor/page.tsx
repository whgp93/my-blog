'use client'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Eye, EyeOff, Download } from 'lucide-react'
import type { Category } from '@/types/post'

const TiptapEditor = dynamic(
  () => import('@/components/editor/TiptapEditor').then((m) => m.TiptapEditor),
  { ssr: false, loading: () => <div className="h-96 bg-surface-container animate-pulse rounded-xl" /> }
)

interface FrontmatterFields {
  title: string
  category: Category
  excerpt: string
  author: string
  image: string
}

export default function EditorPage() {
  const [frontmatter, setFrontmatter] = useState<FrontmatterFields>({
    title: '',
    category: 'تقنية',
    excerpt: '',
    author: '',
    image: '',
  })
  const [htmlContent, setHtmlContent] = useState('')
  const [showPreview, setShowPreview] = useState(false)

  const handleFmChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setFrontmatter({ ...frontmatter, [e.target.name]: e.target.value })

  const slugify = (text: string) =>
    text
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\u0600-\u06FF\w-]/g, '')
      .toLowerCase()

  const exportMarkdown = async () => {
    const TurndownService = (await import('turndown')).default
    const td = new TurndownService({ headingStyle: 'atx', bulletListMarker: '-' })
    const body = td.turndown(htmlContent)

    const fm = [
      '---',
      `title: "${frontmatter.title}"`,
      `date: "${new Date().toISOString().split('T')[0]}"`,
      `category: "${frontmatter.category}"`,
      `image: "${frontmatter.image}"`,
      `excerpt: "${frontmatter.excerpt}"`,
      `author: "${frontmatter.author}"`,
      '---',
      '',
    ].join('\n')

    const markdown = fm + body
    const blob = new Blob([markdown], { type: 'text/markdown; charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${slugify(frontmatter.title) || 'مقال-جديد'}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-8 pb-20">
      <div className="flex justify-between items-center pt-8 mb-8">
        <h1 className="font-headline text-3xl">محرر المقالات</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider bg-surface-container text-on-surface-variant hover:bg-surface-container-high transition-colors"
          >
            {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
            {showPreview ? 'إخفاء المعاينة' : 'معاينة'}
          </button>
          <button
            onClick={exportMarkdown}
            disabled={!frontmatter.title || !htmlContent}
            className="flex items-center gap-2 px-5 py-2 rounded-md text-xs font-bold uppercase tracking-wider bg-primary text-on-primary hover:bg-primary-dim transition-colors disabled:opacity-50"
          >
            <Download size={16} />
            تصدير .md
          </button>
        </div>
      </div>

      <div className={`grid gap-8 ${showPreview ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
        {/* Editor Panel */}
        <div className="space-y-6">
          {/* Frontmatter */}
          <div className="bg-surface-container-low rounded-xl p-6 space-y-5">
            <h2 className="text-xs uppercase tracking-widest font-bold text-on-surface-variant border-b border-outline-variant/20 pb-3">
              معلومات المقال
            </h2>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-outline mb-2">
                العنوان *
              </label>
              <input
                type="text"
                name="title"
                value={frontmatter.title}
                onChange={handleFmChange}
                placeholder="عنوان المقال"
                required
                className="w-full bg-transparent border-b border-outline-variant/30 py-2 text-sm outline-none focus:border-primary transition-colors placeholder:text-outline-variant/50"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-outline mb-2">
                  القسم
                </label>
                <select
                  name="category"
                  value={frontmatter.category}
                  onChange={handleFmChange}
                  className="w-full bg-transparent border-b border-outline-variant/30 py-2 text-sm outline-none focus:border-primary transition-colors text-on-surface"
                >
                  <option value="تقنية">تقنية</option>
                  <option value="سفر">سفر</option>
                  <option value="اقتصاد">اقتصاد</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-outline mb-2">
                  الكاتب
                </label>
                <input
                  type="text"
                  name="author"
                  value={frontmatter.author}
                  onChange={handleFmChange}
                  placeholder="اسم الكاتب"
                  className="w-full bg-transparent border-b border-outline-variant/30 py-2 text-sm outline-none focus:border-primary transition-colors placeholder:text-outline-variant/50"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-outline mb-2">
                رابط الصورة الغلاف
              </label>
              <input
                type="url"
                name="image"
                value={frontmatter.image}
                onChange={handleFmChange}
                placeholder="https://..."
                dir="ltr"
                className="w-full bg-transparent border-b border-outline-variant/30 py-2 text-sm outline-none focus:border-primary transition-colors placeholder:text-outline-variant/50 text-start"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-outline mb-2">
                ملخص قصير
              </label>
              <textarea
                name="excerpt"
                value={frontmatter.excerpt}
                onChange={handleFmChange}
                placeholder="وصف قصير للمقال..."
                rows={2}
                className="w-full bg-transparent border-b border-outline-variant/30 py-2 text-sm outline-none focus:border-primary transition-colors placeholder:text-outline-variant/50 resize-none"
              />
            </div>
          </div>

          {/* Tiptap Editor */}
          <TiptapEditor content="" onChange={setHtmlContent} />
        </div>

        {/* Preview Panel */}
        {showPreview && (
          <div className="bg-surface-container-lowest rounded-xl p-6 md:p-10 border border-outline-variant/10">
            <div className="mb-6 pb-4 border-b border-outline-variant/10">
              <span className="text-[10px] uppercase tracking-widest text-outline font-bold">
                معاينة
              </span>
            </div>
            {frontmatter.title && (
              <h1 className="font-headline text-3xl mb-4 leading-tight">{frontmatter.title}</h1>
            )}
            {frontmatter.excerpt && (
              <p className="text-on-surface-variant mb-6 leading-relaxed">{frontmatter.excerpt}</p>
            )}
            {htmlContent ? (
              <div
                className="prose prose-sm max-w-none rtl"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            ) : (
              <p className="text-outline-variant text-sm">ابدأ الكتابة لرؤية المعاينة...</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
