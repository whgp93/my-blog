import Link from 'next/link'
import Image from 'next/image'
import type { PostMeta } from '@/types/post'
import { Badge } from '@/components/ui/Badge'
import { ArrowLeft } from 'lucide-react'

interface FeaturedHeroProps {
  post: PostMeta
}

export function FeaturedHero({ post }: FeaturedHeroProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <section className="mb-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
        {/* Text */}
        <div className="lg:col-span-7 z-10">
          <div className="bg-surface-container-lowest p-8 md:p-12 lg:-ms-20 shadow-[0_10px_40px_rgba(47,51,52,0.03)]">
            <div className="flex items-center gap-3 mb-6">
              <Badge category={post.category} />
              <span className="text-[10px] tracking-[0.2em] uppercase text-on-surface-variant">
                {formattedDate}
              </span>
            </div>
            <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl leading-tight text-on-surface mb-6">
              {post.title}
            </h1>
            <p className="text-lg text-on-surface-variant max-w-md mb-8 leading-relaxed">
              {post.excerpt}
            </p>
            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-3 text-primary font-semibold group"
            >
              <span>اقرأ المقال</span>
              <ArrowLeft
                size={18}
                className="group-hover:-translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="lg:col-span-5 mt-8 lg:mt-0">
          <Link href={`/blog/${post.slug}`}>
            <div className="aspect-[4/5] overflow-hidden rounded-lg">
              <Image
                src={post.image}
                alt={post.title}
                width={600}
                height={750}
                className="w-full h-full object-cover grayscale-[20%] hover:scale-105 transition-transform duration-700"
              />
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
