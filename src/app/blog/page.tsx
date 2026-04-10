import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/posts'
import { CategoryFilter } from '@/components/blog/CategoryFilter'

export const metadata: Metadata = {
  title: 'المدونة',
  description: 'جميع المقالات في التقنية والسفر والاقتصاد',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-8 pb-20">
      {/* Header */}
      <header className="mb-16 pt-8">
        <span className="text-xs tracking-[0.2em] uppercase text-on-surface-variant mb-3 block">
          الأرشيف
        </span>
        <h1 className="font-headline text-4xl md:text-5xl">المقالات</h1>
      </header>

      <CategoryFilter posts={posts} />
    </div>
  )
}
