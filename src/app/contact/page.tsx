'use client'
import { useState } from 'react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: 'استفسار عام', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-8 pb-20">
      {/* Hero */}
      <header className="mb-16 pt-8 max-w-3xl">
        <h1 className="font-headline text-5xl md:text-7xl tracking-tight leading-tight mb-6">
          لنبدأ{' '}
          <span className="italic">محادثة.</span>
        </h1>
        <p className="text-lg text-on-surface-variant leading-relaxed">
          سواء كان لديك سؤال عن مقال حديث، أو اهتمام بالتعاون، أو رغبة في مشاركة فكرة — المكتبة الرقمية دائماً مفتوحة.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Form */}
        <div className="lg:col-span-7 bg-surface-container-low p-8 md:p-12 rounded-xl">
          {submitted ? (
            <div className="text-center py-16">
              <span className="text-4xl block mb-4">✓</span>
              <h3 className="font-headline text-2xl mb-3">تم الإرسال!</h3>
              <p className="text-on-surface-variant">سأرد عليك خلال 48 ساعة.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-outline mb-2">
                    الاسم الكامل
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="اسمك"
                    required
                    className="w-full bg-transparent border-b border-outline-variant/30 py-3 focus:border-primary text-sm outline-none transition-colors placeholder:text-outline-variant/50"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-outline mb-2">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    required
                    className="w-full bg-transparent border-b border-outline-variant/30 py-3 focus:border-primary text-sm outline-none transition-colors placeholder:text-outline-variant/50"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-outline mb-2">
                  الموضوع
                </label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-outline-variant/30 py-3 focus:border-primary text-sm outline-none transition-colors text-on-surface-variant"
                >
                  <option>استفسار عام</option>
                  <option>تقديم مقال</option>
                  <option>طلب تعاون</option>
                  <option>ملاحظات تقنية</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-outline mb-2">
                  رسالتك
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="اكتب أفكارك هنا..."
                  rows={5}
                  required
                  className="w-full bg-transparent border-b border-outline-variant/30 py-3 focus:border-primary text-sm outline-none transition-colors placeholder:text-outline-variant/50 resize-none"
                />
              </div>
              <button
                type="submit"
                className="bg-primary text-on-primary px-10 py-4 rounded-md text-xs uppercase tracking-widest font-bold hover:bg-primary-dim transition-all"
              >
                إرسال الرسالة
              </button>
            </form>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-primary-fixed-dim/30 p-8 rounded-xl relative overflow-hidden">
            <h3 className="font-headline text-2xl italic leading-snug text-on-primary-container">
              &ldquo;عمل المُنظِّم ليس منفرداً أبداً؛ إنه اكتشاف مشترك للتفاصيل الهادئة.&rdquo;
            </h3>
          </div>
          <div className="bg-surface-container p-8 rounded-xl">
            <div className="space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-outline block mb-2">
                  الموقع
                </span>
                <p className="text-on-surface">المنطقة العربية / عن بُعد</p>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-outline block mb-2">
                  التواصل الاجتماعي
                </span>
                <div className="flex gap-5 mt-3">
                  <a href="#" className="text-primary hover:text-on-surface transition-colors text-xs uppercase tracking-widest font-bold">
                    تويتر
                  </a>
                  <a href="#" className="text-primary hover:text-on-surface transition-colors text-xs uppercase tracking-widest font-bold">
                    انستغرام
                  </a>
                  <a href="#" className="text-primary hover:text-on-surface transition-colors text-xs uppercase tracking-widest font-bold">
                    لينكدإن
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom info */}
      <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 border-t border-outline-variant/10 pt-16">
        {[
          { title: 'العملية', body: 'كل رسالة يقرأها المحرر شخصياً. نُعطي الأولوية لعمق التواصل على سرعة الرد.' },
          { title: 'المساهمات', body: 'هل تريد الكتابة للمدونة؟ أرسل ملخصاً قصيراً وثلاثة روابط لأعمالك السابقة.' },
          { title: 'الصحافة', body: 'للأدوات الإعلامية أو طلبات المقابلات، ابدأ عنوان بريدك بـ [إعلام].' },
        ].map((item) => (
          <div key={item.title}>
            <h4 className="font-headline text-xl mb-3">{item.title}</h4>
            <p className="text-sm text-on-surface-variant leading-relaxed">{item.body}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
