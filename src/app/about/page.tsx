import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'عني',
  description: 'تعرّف على صاحب المدونة، أفكاره، واهتماماته.',
}

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-8 pb-20">
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start mb-24 pt-8">
        <div className="lg:col-span-7 pt-4">
          <p className="text-xs tracking-[0.2em] uppercase text-primary font-bold mb-4">
            مقدمة
          </p>
          <h1 className="font-headline text-5xl md:text-7xl text-on-surface leading-tight tracking-tight mb-8">
            مُنتقٍ للحظات الهادئة{' '}
            <span className="italic text-primary-dim">والقصص المعبّرة.</span>
          </h1>
          <div className="max-w-xl space-y-5">
            <p className="text-on-surface-variant text-lg leading-relaxed">
              أنا كاتب ومصمم ومراقب. عملي يستكشف التقاطع بين البساطة والأخلاقيات الرقمية والحفاظ على الحياة الهادئة في عالم متسارع.
            </p>
            <p className="text-on-surface-variant text-lg leading-relaxed">
              وُلدت هذه المدونة من رغبة في إنشاء فضاء رقمي يشبه المكتبة المادية — متعمّد، ملموس، ومركّز.
            </p>
          </div>
        </div>
        <div className="lg:col-span-5 relative group">
          <div className="aspect-[4/5] bg-surface-container overflow-hidden rounded-xl">
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"
              alt="صورة شخصية"
              width={600}
              height={750}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="absolute -bottom-6 -start-6 w-28 h-28 bg-primary-fixed-dim/30 -z-10 rounded-lg" />
        </div>
      </section>

      {/* Skills Bento */}
      <section className="mb-24">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-10 border-b border-outline-variant/15 pb-4">
          <h2 className="font-headline text-3xl italic text-on-surface">مجالات التركيز</h2>
          <span className="text-xs tracking-widest text-outline uppercase mt-2 md:mt-0">
            التخصصات
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: '✍️',
              title: 'استراتيجية المحتوى',
              desc: 'صياغة روايات تتجاوز حدود التمرير. أركز على المقالات التحريرية الطويلة وسرد قصص العلامات التجارية.',
            },
            {
              icon: '◻️',
              title: 'التصميم البسيط',
              desc: 'أنظمة بصرية مبنية على التسلسل الهرمي والمساحة البيضاء. أؤمن أن أفضل واجهة هي التي تختفي.',
            },
            {
              icon: '📷',
              title: 'التصوير',
              desc: 'التقاط المألوف وجعله استثنائياً. التنسيق البصري للمخطوطة الرقمية.',
            },
          ].map((skill) => (
            <div
              key={skill.title}
              className="bg-surface-container-low p-8 rounded-xl transition-colors hover:bg-surface-container-highest"
            >
              <span className="text-3xl mb-5 block">{skill.icon}</span>
              <h3 className="font-headline text-xl mb-3">{skill.title}</h3>
              <p className="text-on-surface-variant leading-relaxed text-sm">{skill.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pull Quote */}
      <section className="relative py-20 mb-24 overflow-hidden">
        <div className="absolute start-0 top-1/2 -translate-y-1/2 w-40 h-full bg-primary-fixed-dim/40 -z-10 -ms-6 rounded-lg" />
        <div className="max-w-3xl mx-auto px-4">
          <blockquote className="font-headline text-3xl md:text-4xl leading-tight text-on-surface">
            &ldquo;الهدف ليس فقط توثيق الحياة، بل إيجاد الإيقاع في الصمت بين اللحظات.&rdquo;
          </blockquote>
          <cite className="block mt-6 text-xs tracking-[0.3em] uppercase text-outline not-italic">
            — فلسفة شخصية
          </cite>
        </div>
      </section>

      {/* Biography */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
        <div className="lg:col-span-4">
          <div className="sticky top-32">
            <h2 className="font-headline text-3xl mb-6">القصة الطويلة</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="w-10 h-px bg-outline-variant" />
                <span className="text-xs tracking-widest uppercase text-on-surface-variant">
                  المنطقة العربية
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-8">
          <div className="space-y-6 text-on-surface-variant text-lg leading-relaxed max-w-2xl">
            <p>
              رحلتي بدأت في أركان المكتبات العامة، حيث اكتشفت أن المعلومات ليست مجرد بيانات — إنها إرث. بعد سنوات في قطاع التقنية، أدركت أننا كنا ننتج أكثر مما نحفظ.
            </p>
            <p>
              هذه المدونة تأسست كعلاج لدورة &ldquo;المحتوى السريع&rdquo;. هنا أكتب عن أنظمة التصميم التي تحترم انتباه المستخدم، وأخلاقيات وسائل التواصل الاجتماعي، والجاذبية الخالدة للأشياء المادية المصنوعة بإتقان.
            </p>
            <p>
              عندما لا أكون خلف الشاشة، ستجدني أستكشف الطبيعة، أو أُعيد تأهيل كاميرات الأفلام القديمة، أو أحتسي قهوة في ركن مقهى هادئ. أؤمن بالجودة على حساب الكمية.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface-container-low rounded-xl p-10 md:p-16 text-center">
        <h2 className="font-headline text-3xl md:text-4xl mb-4">لنبدأ محادثة.</h2>
        <p className="text-on-surface-variant mb-10 max-w-md mx-auto">
          دائماً منفتح على مناقشة مشاريع جديدة أو فلسفة التصميم أو توصيات كتبك المفضلة.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="bg-primary text-on-primary px-8 py-4 rounded-md text-sm tracking-wider transition-opacity hover:opacity-90 font-bold"
          >
            تواصل معي
          </Link>
          <Link
            href="/newsletter"
            className="bg-secondary-container text-on-secondary-container px-8 py-4 rounded-md text-sm tracking-wider hover:bg-surface-container-highest transition-colors font-bold"
          >
            اشترك في النشرة
          </Link>
        </div>
      </section>
    </div>
  )
}
