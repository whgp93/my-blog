import { getPostBySlug } from '@/lib/posts'
import { markdownToHtml } from '@/lib/markdown'
import { AdminPostEditor } from '@/components/admin/AdminPostEditor'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

interface Props {
  params: { slug: string }
}

export default async function EditPostPage({ params }: Props) {
  let post
  try {
    post = getPostBySlug(decodeURIComponent(params.slug))
  } catch {
    notFound()
  }

  const contentHtml = await markdownToHtml(post.content ?? '')

  return (
    <AdminPostEditor
      mode="edit"
      initialData={{
        slug: post.slug,
        title: post.title,
        category: post.category,
        image: post.image,
        excerpt: post.excerpt,
        author: post.author,
        featured: post.featured ?? false,
        content: contentHtml,
      }}
    />
  )
}
