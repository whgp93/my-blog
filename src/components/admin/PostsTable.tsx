'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Pencil, Trash2, Plus, ExternalLink, LogOut, Info } from 'lucide-react'
import type { PostMeta } from '@/types/post'

interface PostsTableProps {
  posts: PostMeta[]
}

export function PostsTable({ posts: initialPosts, isVercel }: PostsTableProps & { isVercel: boolean }) {
  const [posts, setPosts] = useState(initialPosts)
  const [deleting, setDeleting] = useState<string | null>(null)
  const router = useRouter()

  const handleDelete = async (slug: string, title: string) => {
    if (isVercel) return
    if (!confirm(`هل أنت متأكد من حذف "${title}"؟`)) return
    setDeleting(slug)
    try {
      const res = await fetch(`/api/admin/posts/${slug}`, { method: 'DELETE' })
      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p.slug !== slug))
      } else {
        const data = await res.json()
        alert(data.error ?? 'فشل حذف المقال')
      }
    } catch {
      alert('حدث خطأ')
    } finally {
      setDeleting(null)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  const categoryColor: Record<string, string> = {
    تقنية: 'bg-blue-500/10 text-blue-400',
    سفر: 'bg-green-500/10 text-green-400',
    اقتصاد: 'bg-amber-500/10 text-amber-400',
  }

  return (
    <div className="min-h-screen bg-surface p-6 md:p-10">
      {/* Local-only banner */}
      <div className="flex items-center gap-3 mb-6 bg-primary-container/20 border border-primary/20 rounded-xl px-5 py-3 text-sm text-on-surface-variant">
        <Info size={16} className="shrink-0 text-primary" />
        <span>
          التعديلات تُحفظ محلياً فقط — ارفع على GitHub لنشرها
          {isVercel && <strong className="text-error me-2"> (وضع القراءة فقط على Vercel)</strong>}
        </span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-headline text-3xl text-on-surface">لوحة التحكم</h1>
          <p className="text-sm text-on-surface-variant mt-1">{posts.length} مقال</p>
        </div>
        <div className="flex items-center gap-3">
          {isVercel ? (
            <span className="flex items-center gap-2 bg-surface-container text-on-surface-variant px-5 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider opacity-50 cursor-not-allowed">
              <Plus size={16} />
              مقال جديد
            </span>
          ) : (
            <Link
              href="/admin/new"
              className="flex items-center gap-2 bg-primary text-on-primary px-5 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider hover:bg-primary-dim transition-colors"
            >
              <Plus size={16} />
              مقال جديد
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs text-on-surface-variant hover:text-on-surface px-3 py-2.5 rounded-md hover:bg-surface-container transition-colors"
          >
            <LogOut size={16} />
            خروج
          </button>
        </div>
      </div>

      {/* Table */}
      {posts.length === 0 ? (
        <div className="text-center py-20 text-on-surface-variant">
          <p className="text-lg mb-4">لا توجد مقالات بعد</p>
          <Link href="/admin/new" className="text-primary underline text-sm">
            أضف أول مقال
          </Link>
        </div>
      ) : (
        <div className="bg-surface-container-low rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-outline-variant/20">
                <th className="text-right text-xs uppercase tracking-widest text-on-surface-variant font-bold px-6 py-4">
                  العنوان
                </th>
                <th className="text-right text-xs uppercase tracking-widest text-on-surface-variant font-bold px-6 py-4 hidden md:table-cell">
                  التصنيف
                </th>
                <th className="text-right text-xs uppercase tracking-widest text-on-surface-variant font-bold px-6 py-4 hidden md:table-cell">
                  التاريخ
                </th>
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody>
              {posts.map((post, i) => (
                <tr
                  key={post.slug}
                  className={`border-b border-outline-variant/10 last:border-0 hover:bg-surface-container transition-colors ${
                    i % 2 === 0 ? '' : 'bg-surface-container-lowest/30'
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-on-surface line-clamp-1">{post.title}</div>
                    <div className="text-xs text-on-surface-variant mt-0.5 line-clamp-1 hidden sm:block">
                      {post.excerpt}
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${
                        categoryColor[post.category] ?? 'bg-surface-container text-on-surface-variant'
                      }`}
                    >
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant hidden md:table-cell">
                    {post.date}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 justify-end">
                      <a
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-md text-on-surface-variant hover:bg-surface-container-high transition-colors"
                        title="عرض المقال"
                      >
                        <ExternalLink size={15} />
                      </a>
                      {isVercel ? (
                        <>
                          <span className="p-2 rounded-md text-on-surface-variant opacity-30 cursor-not-allowed" title="غير متاح على Vercel">
                            <Pencil size={15} />
                          </span>
                          <span className="p-2 rounded-md text-error opacity-30 cursor-not-allowed" title="غير متاح على Vercel">
                            <Trash2 size={15} />
                          </span>
                        </>
                      ) : (
                        <>
                          <Link
                            href={`/admin/edit/${post.slug}`}
                            className="p-2 rounded-md text-on-surface-variant hover:bg-surface-container-high transition-colors"
                            title="تعديل"
                          >
                            <Pencil size={15} />
                          </Link>
                          <button
                            onClick={() => handleDelete(post.slug, post.title)}
                            disabled={deleting === post.slug}
                            className="p-2 rounded-md text-error hover:bg-error-container/20 transition-colors disabled:opacity-40"
                            title="حذف"
                          >
                            <Trash2 size={15} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
