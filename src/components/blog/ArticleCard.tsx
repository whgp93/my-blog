import Link from 'next/link'
import Image from 'next/image'
import type { PostMeta } from '@/types/post'
import { Badge } from '@/components/ui/Badge'

interface ArticleCardProps {
  post: PostMeta
}

export function ArticleCard({ post }: ArticleCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article className="group">
      <Link href={`/blog/${post.slug}`}>
        <div className="mb-6 overflow-hidden aspect-[16/10] bg-surface-container-low rounded-lg">
          <Image
            src={post.image}
            alt={post.title}
            width={600}
            height={375}
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          />
        </div>
        <div className="flex gap-3 mb-3 items-center">
          <Badge category={post.category} />
          <span className="text-[10px] tracking-[0.15em] uppercase text-on-surface-variant">
            {formattedDate}
          </span>
        </div>
        <h3 className="font-headline text-xl mb-3 group-hover:text-primary transition-colors leading-snug">
          {post.title}
        </h3>
        <p className="text-sm text-on-surface-variant leading-relaxed mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        <span className="text-xs uppercase tracking-[0.15em] font-bold text-on-surface group-hover:text-primary transition-colors">
          اقرأ المزيد
        </span>
      </Link>
    </article>
  )
}
