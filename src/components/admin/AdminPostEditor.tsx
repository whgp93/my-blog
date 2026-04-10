'use client'
import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, Eye, EyeOff, Save } from 'lucide-react'

const TiptapEditor = dynamic(
  () => import('@/components/editor/TiptapEditor').then((m) => m.TiptapEditor),
  { ssr: false, loading: () => <div className="min-h-[500px] animate-pulse bg-surface-container rounded-xl" /> }
)

interface PostData {
  slug: string
  title: string
  category: string
  image: string
  excerpt: string
  author: string
  featured: boolean
  content: string // markdown or html
}

interface AdminPostEditorProps {
  initialData?: Partial<PostData>
  mode: 'new' | 'edit'
}

const CATEGORIES = ['تقنية', 'سفر', 'اقتصاد']

export function AdminPostEditor({ initialData, mode }: AdminPostEditorProps) {
  const router = useRouter()
  const [title, setTitle] = useState(initialData?.title ?? '')
  const [slug, setSlug] = useState(initialData?.slug ?? '')
  const [category, setCategory] = useState(initialData?.category ?? 'تقنية')
  const [image, setImage] = useState(initialData?.image ?? '')
  const [excerpt, setExcerpt] = useState(initialData?.excerpt ?? '')
  const [author, setAuthor] = useState(initialData?.author ?? 'المدوّن')
  const [featured, setFeatured] = useState(initialData?.featured ?? false)
  const [content, setContent] = useState(initialData?.content ?? '')
  const [preview, setPreview] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const autoSlug = (val: string) =>
    val
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-zA-Z0-9\u0600-\u06FF-]/g, '')
      .toLowerCase()

  const handleTitleChange = (val: string) => {
    setTitle(val)
    if (mode === 'new') setSlug(autoSlug(val))
  }

  const handleSave = useCallback(async () => {
    if (!title.trim() || !slug.trim()) {
      setError('العنوان والرابط مطلوبان')
      return
    }
    setError('')
    setSaving(true)
    try {
      // Strip HTML tags to get markdown-compatible plain content
      // content is HTML from Tiptap — we send it as-is, the API stores it
      const body = { title, slug, category, image, excerpt, author, featured, content }
      const url = mode === 'edit' ? `/api/admin/posts/${slug}` : '/api/admin/posts'
      const method = mode === 'edit' ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error ?? 'فشل الحفظ')
        return
      }
      router.push('/admin')
      router.refresh()
    } catch {
      setError('حدث خطأ أثناء الحفظ')
    } finally {
      setSaving(false)
    }
  }, [title, slug, category, image, excerpt, author, featured, content, mode, router])

  return (
    <div className="min-h-screen bg-surface">
      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-surface/90 backdrop-blur border-b border-outline-variant/20 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="p-2 rounded-md text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            <ArrowRight size={18} />
          </Link>
          <h1 className="font-headline text-lg text-on-surface">
            {mode === 'new' ? 'مقال جديد' : 'تعديل المقال'}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPreview((v) => !v)}
            className="flex items-center gap-2 text-xs text-on-surface-variant hover:text-on-surface px-3 py-2 rounded-md hover:bg-surface-container transition-colors"
          >
            {preview ? <EyeOff size={15} /> : <Eye size={15} />}
            {preview ? 'إخفاء المعاينة' : 'معاينة'}
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-primary text-on-primary px-5 py-2 rounded-md text-xs font-bold uppercase tracking-wider hover:bg-primary-dim transition-colors disabled:opacity-50"
          >
            <Save size={15} />
            {saving ? 'جاري الحفظ...' : 'نشر'}
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {error && (
          <div className="mb-6 text-sm text-error bg-error-container/20 rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        {/* Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Title */}
          <div className="md:col-span-2">
            <label className="label">العنوان *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="عنوان المقال"
              className="field"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="label">الرابط (slug) *</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              dir="ltr"
              placeholder="my-post-slug"
              disabled={mode === 'edit'}
              className="field disabled:opacity-60"
            />
          </div>

          {/* Category */}
          <div>
            <label className="label">التصنيف</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="field">
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Image URL */}
          <div className="md:col-span-2">
            <label className="label">رابط صورة الغلاف</label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              dir="ltr"
              placeholder="https://..."
              className="field"
            />
          </div>

          {/* Excerpt */}
          <div className="md:col-span-2">
            <label className="label">الوصف المختصر</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={2}
              placeholder="جملة أو جملتان تصفان المقال..."
              className="field resize-none"
            />
          </div>

          {/* Author */}
          <div>
            <label className="label">الكاتب</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="المدوّن"
              className="field"
            />
          </div>

          {/* Featured */}
          <div className="flex items-center gap-3 pt-6">
            <input
              type="checkbox"
              id="featured"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-4 h-4 accent-primary"
            />
            <label htmlFor="featured" className="text-sm text-on-surface-variant cursor-pointer">
              مقال مميز (يظهر في الصفحة الرئيسية)
            </label>
          </div>
        </div>

        {/* Editor / Preview */}
        {preview ? (
          <div
            className="prose prose-lg max-w-none rtl bg-surface-container-low rounded-xl p-8"
            dir="rtl"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <TiptapEditor content={content} onChange={setContent} />
        )}
      </div>

      <style jsx global>{`
        .label {
          display: block;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-on-surface-variant);
          margin-bottom: 0.375rem;
        }
        .field {
          width: 100%;
          background: var(--color-surface-container);
          border: none;
          border-radius: 0.5rem;
          padding: 0.75rem 1rem;
          color: var(--color-on-surface);
          font-size: 0.875rem;
          outline: none;
          transition: box-shadow 0.15s;
        }
        .field:focus {
          box-shadow: 0 0 0 2px color-mix(in srgb, var(--color-primary) 30%, transparent);
        }
        .field::placeholder {
          color: var(--color-outline-variant);
        }
      `}</style>
    </div>
  )
}
