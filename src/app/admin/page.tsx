import { getAllPosts } from '@/lib/posts'
import { PostsTable } from '@/components/admin/PostsTable'

export const dynamic = 'force-dynamic'

export default function AdminPage() {
  const posts = getAllPosts()
  return <PostsTable posts={posts} />
}
