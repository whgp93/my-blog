import type { Comment } from '@/types/comment'

const KEY = (slug: string) => `blog-comments:${slug}`

export function getComments(slug: string): Comment[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(KEY(slug)) ?? '[]')
  } catch {
    return []
  }
}

export function addComment(
  slug: string,
  data: Pick<Comment, 'author' | 'body'>
): Comment {
  const all = getComments(slug)
  const newComment: Comment = {
    ...data,
    slug,
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
  }
  localStorage.setItem(KEY(slug), JSON.stringify([...all, newComment]))
  return newComment
}

export function deleteComment(slug: string, id: string): void {
  const filtered = getComments(slug).filter((c) => c.id !== id)
  localStorage.setItem(KEY(slug), JSON.stringify(filtered))
}
