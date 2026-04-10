import Link from 'next/link'

export function Footer() {
  return (
    <footer className="w-full py-12 mt-20 bg-stone-100 dark:bg-surface-container-low">
      <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-8 gap-6 max-w-7xl mx-auto">
        <div className="text-sm tracking-wide uppercase text-on-surface-variant">
          © {new Date().getFullYear()} المدوّن. صُنع بعناية.
        </div>
        <div className="flex gap-8">
          <Link
            href="/newsletter"
            className="text-sm tracking-wide uppercase text-on-surface-variant hover:text-on-surface underline underline-offset-4 transition-colors"
          >
            النشرة
          </Link>
          <Link
            href="/about"
            className="text-sm tracking-wide uppercase text-on-surface-variant hover:text-on-surface underline underline-offset-4 transition-colors"
          >
            الخصوصية
          </Link>
          <Link
            href="/blog"
            className="text-sm tracking-wide uppercase text-on-surface-variant hover:text-on-surface underline underline-offset-4 transition-colors"
          >
            RSS
          </Link>
        </div>
        {/* Social icons */}
        <div className="flex gap-3">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-surface-container text-on-surface-variant hover:bg-primary-fixed-dim transition-colors text-xs font-bold"
            aria-label="تويتر"
          >
            𝕏
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-surface-container text-on-surface-variant hover:bg-primary-fixed-dim transition-colors text-xs"
            aria-label="انستغرام"
          >
            IG
          </a>
        </div>
      </div>
    </footer>
  )
}
