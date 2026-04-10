'use client'
import { useState } from 'react'
import Image from 'next/image'

export default function NewsletterPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
  }

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-8 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[70vh]">
        {/* Left: Text */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-10">
          <header className="space-y-5">
            <span className="text-xs tracking-[0.2em] font-bold uppercase text-primary">
              المراسلة المختارة
            </span>
            <h1 className="font-headline text-6xl md:text-8xl leading-tight tracking-tight text-on-surface">
              المدوّن{' '}
              <span className="italic">الأسبوعي</span>
            </h1>
            <p className="text-xl text-on-surface-variant leading-relaxed max-w-2xl">
              رسالة أسبوعية للمثقف المعاصر. نجسر الهوة بين العمق التاريخي والصلة المعاصرة، ونوصّل مقالات التفكير المتأني مباشرة إلى معرضك الذهني.
            </p>
          </header>

          {submitted ? (
            <div className="bg-primary-container/30 rounded-xl p-8">
              <h3 className="font-headline text-2xl mb-2">أهلاً بك في المجتمع! 🎉</h3>
              <p className="text-on-surface-variant">سيصلك أول عدد يوم الأحد القادم.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="بريدك@مثال.com"
                required
                className="flex-grow bg-surface-container-low border-none focus:ring-1 focus:ring-primary/20 p-4 text-on-surface rounded-md transition-all placeholder:text-outline-variant text-sm"
              />
              <button
                type="submit"
                className="bg-primary text-on-primary px-8 py-4 rounded-md font-bold text-xs tracking-widest uppercase transition-all hover:bg-primary-dim"
              >
                اشترك
              </button>
            </form>
          )}

          {/* Stats */}
          <div className="flex gap-10 pt-2">
            {[
              { value: '+12k', label: 'مشترك' },
              { value: 'أسبوعياً', label: 'التكرار' },
              { value: '0', label: 'إعلانات' },
            ].map((stat) => (
              <div key={stat.label} className="space-y-1">
                <p className="font-headline text-2xl text-on-surface">{stat.value}</p>
                <p className="text-[10px] tracking-widest uppercase text-on-surface-variant font-bold">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Image */}
        <div className="lg:col-span-5 relative">
          <div className="aspect-[4/5] w-full overflow-hidden rounded-xl bg-surface-container-high relative group">
            <Image
              src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80"
              alt="مكتبة ودفاتر"
              width={600}
              height={750}
              className="w-full h-full object-cover grayscale-[0.3] contrast-[1.1] transition-transform duration-700 group-hover:scale-105"
            />
            {/* Floating quote */}
            <div className="absolute bottom-6 -start-8 max-w-xs p-6 bg-surface-container-lowest/90 backdrop-blur-md shadow-xl rounded-lg">
              <p className="font-headline text-base italic text-on-surface leading-relaxed">
                &ldquo;المدوّن الأسبوعي هو النشرة الوحيدة التي تعامل صندوق بريدي باحترام مكتبة.&rdquo;
              </p>
              <p className="mt-3 text-[10px] tracking-widest uppercase font-bold text-primary">
                قارئ من الرياض
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <section className="mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-outline-variant/10 pt-16">
          {[
            { title: 'الأرشيف الهادئ', body: 'الوصول إلى الأعداد السابقة كاملة. لا جدران دفع، فقط حفاظ على المعرفة.' },
            { title: 'روح غير متصلة', body: 'كل نشرة مصممة للقراءة دفعة واحدة بعيداً عن المشتتات. مثالية للجوال أو الطباعة.' },
            { title: 'نية صافية', body: 'سياسة صارمة: صفر إعلانات. مدعومة بالكامل من القراء الراغبين وحب الجمال.' },
          ].map((feature, i) => (
            <div key={i} className="space-y-4">
              <div className="w-8 h-px bg-primary" />
              <h3 className="font-headline text-2xl italic">{feature.title}</h3>
              <p className="text-on-surface-variant leading-relaxed text-sm">{feature.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
