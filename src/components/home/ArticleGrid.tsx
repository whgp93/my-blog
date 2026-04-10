import Link from 'next/link'
import type { PostMeta } from '@/types/post'
import { ArticleCard } from '@/components/blog/ArticleCard'

interface ArticleGridProps {
  posts: PostMeta[]
}

export function ArticleGrid({ posts }: ArticleGridProps) {
  if (posts.length === 0) return null

  return (
    <section>
      <div className="flex justify-between items-end mb-12">
        <div>
          <span className="text-xs tracking-[0.2em] uppercase text-on-surface-variant mb-2 block">
            آخر المقالات
          </span>
          <h2 className="font-headline text-3xl md:text-4xl">من المكتبة</h2>
        </div>
        <Link
          href="/blog"
          className="hidden md:block text-sm uppercase tracking-widest text-primary border-b border-primary/20 pb-1 hover:border-primary transition-colors"
        >
          جميع المقالات
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {posts.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  )
}
