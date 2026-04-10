import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getPostBySlug, getAllSlugs } from '@/lib/posts'
import { markdownToHtml } from '@/lib/markdown'
import { Badge } from '@/components/ui/Badge'
import { CommentSection } from '@/components/blog/CommentSection'
import { ShareButtons } from '@/components/blog/ShareButtons'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = getPostBySlug(params.slug)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://example.com'
    return {
      title: post.title,
      description: post.excerpt,
      alternates: { canonical: `${baseUrl}/blog/${post.slug}` },
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        publishedTime: post.date,
        authors: [post.author],
        images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
        images: [post.image],
      },
    }
  } catch {
    return { title: 'مقال' }
  }
}

export default async function PostPage({ params }: Props) {
  let post
  try {
    post = getPostBySlug(params.slug)
  } catch {
    notFound()
  }

  const htmlContent = await markdownToHtml(post.content)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://example.com'
  const postUrl = `${baseUrl}/blog/${post.slug}`

  const formattedDate = new Date(post.date).toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article className="max-w-3xl mx-auto px-6 pb-20">
      {/* Header */}
      <header className="mb-12 text-center pt-8">
        <div className="flex justify-center items-center gap-3 mb-5">
          <Badge category={post.category} />
          <span className="text-[10px] font-medium tracking-[0.1em] text-outline uppercase">
            {formattedDate}
          </span>
        </div>
        <h1 className="font-headline text-4xl md:text-6xl leading-tight mb-8 tracking-tight">
          {post.title}
        </h1>
        <div className="flex items-center justify-center gap-3 pt-4">
          <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-sm font-bold text-primary">
            {post.author.charAt(0)}
          </div>
          <div className="text-start">
            <p className="text-sm font-semibold text-on-surface">{post.author}</p>
            <p className="text-xs text-on-surface-variant uppercase tracking-wider">كاتب</p>
          </div>
        </div>
      </header>

      {/* Cover image */}
      <div className="w-full aspect-[16/9] mb-12 rounded-xl overflow-hidden bg-surface-container-low shadow-sm">
        <Image
          src={post.image}
          alt={post.title}
          width={1200}
          height={675}
          className="w-full h-full object-cover"
          priority
        />
      </div>

      {/* Body */}
      <div
        className="prose prose-lg max-w-none rtl"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {/* Tags */}
      <footer className="mt-12 pt-8 border-t border-outline-variant/20 flex flex-wrap gap-2">
        <span className="px-4 py-1.5 bg-surface-container-high text-on-surface-variant text-[11px] font-bold uppercase tracking-widest rounded-full">
          {post.category}
        </span>
      </footer>

      {/* Share */}
      <div className="mt-8 pt-6 border-t border-outline-variant/10">
        <ShareButtons title={post.title} url={postUrl} />
      </div>

      {/* Comments */}
      <CommentSection slug={post.slug} />
    </article>
  )
}
