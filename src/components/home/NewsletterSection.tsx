'use client'
import { useState } from 'react'

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
  }

  return (
    <section className="mt-32 mb-12">
      <div className="bg-surface-container py-20 px-6 md:px-8 flex flex-col items-center text-center rounded-xl">
        <span className="text-xs tracking-[0.3em] uppercase text-primary mb-4 font-bold">
          المراسلة
        </span>
        <h2 className="font-headline text-3xl md:text-4xl mb-6">
          ملاحظات أسبوعية عن الحياة المتأنية
          <br />
          والتصميم المتعمد.
        </h2>
        {submitted ? (
          <p className="text-primary font-semibold mt-4">
            شكراً! سنبقيك على تواصل.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md flex flex-col md:flex-row gap-4 mt-4"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="بريدك الإلكتروني"
              required
              className="bg-transparent border-b border-outline-variant/40 focus:border-primary border-t-0 border-x-0 px-0 py-3 text-sm flex-grow outline-none focus:ring-0 transition-colors"
            />
            <button
              type="submit"
              className="bg-primary text-on-primary px-8 py-3 text-xs uppercase tracking-widest font-bold hover:bg-primary-dim transition-colors rounded-md"
            >
              اشترك
            </button>
          </form>
        )}
        <p className="mt-6 text-[10px] uppercase tracking-widest text-on-surface-variant/60">
          لا بريد مزعج. فقط محتوى مختار. ألغِ الاشتراك في أي وقت.
        </p>
      </div>
    </section>
  )
}
