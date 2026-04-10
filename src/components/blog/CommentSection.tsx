'use client'
import { useState } from 'react'
import { useComments } from '@/hooks/useComments'
import { Trash2 } from 'lucide-react'

interface CommentSectionProps {
  slug: string
}

export function CommentSection({ slug }: CommentSectionProps) {
  const { comments, add, remove } = useComments(slug)
  const [author, setAuthor] = useState('')
  const [body, setBody] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!author.trim() || !body.trim()) return
    setSubmitting(true)
    add({ author: author.trim(), body: body.trim() })
    setAuthor('')
    setBody('')
    setSubmitting(false)
  }

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

  return (
    <section className="mt-16 pt-12 border-t border-outline-variant/20">
      <h4 className="font-headline text-2xl text-on-surface mb-8">
        التعليقات {comments.length > 0 && `(${comments.length})`}
      </h4>

      {/* Existing comments */}
      {comments.length > 0 && (
        <div className="space-y-8 mb-12">
          {comments.map((comment) => (
            <div key={comment.id} className="group">
              <div className="flex justify-between items-start mb-2">
                <h5 className="text-sm font-bold text-on-surface">{comment.author}</h5>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-outline">
                    {formatDate(comment.date)}
                  </span>
                  <button
                    onClick={() => remove(comment.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-outline hover:text-error"
                    aria-label="حذف التعليق"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <p className="text-on-surface-variant leading-relaxed">{comment.body}</p>
            </div>
          ))}
        </div>
      )}

      {/* Add comment form */}
      <div className="bg-surface-container-low p-8 rounded-xl">
        <h5 className="text-sm font-bold text-on-surface uppercase tracking-widest mb-6">
          أضف تعليقاً
        </h5>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-outline mb-2">
              الاسم
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="اسمك"
              required
              className="w-full bg-transparent border-b border-outline-variant/40 focus:border-primary py-2 text-sm outline-none transition-colors placeholder:text-outline-variant/50"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-outline mb-2">
              التعليق
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="اكتب تعليقك هنا..."
              required
              rows={4}
              className="w-full bg-white dark:bg-surface-container border-none rounded-lg p-4 text-sm text-on-surface focus:ring-1 focus:ring-outline-variant placeholder:text-outline/50 transition-all shadow-sm resize-none"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting || !author.trim() || !body.trim()}
              className="bg-primary text-on-primary px-8 py-3 rounded-md text-xs font-bold uppercase tracking-widest hover:bg-primary-dim transition-colors disabled:opacity-50"
            >
              نشر التعليق
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
