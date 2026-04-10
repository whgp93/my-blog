'use client'
import { useState, useEffect, useCallback } from 'react'
import { getComments, addComment, deleteComment } from '@/lib/comments'
import type { Comment } from '@/types/comment'

export function useComments(slug: string) {
  const [comments, setComments] = useState<Comment[]>([])

  useEffect(() => {
    setComments(getComments(slug))
  }, [slug])

  const add = useCallback(
    (data: Pick<Comment, 'author' | 'body'>) => {
      const newComment = addComment(slug, data)
      setComments((prev) => [...prev, newComment])
      return newComment
    },
    [slug]
  )

  const remove = useCallback(
    (id: string) => {
      deleteComment(slug, id)
      setComments((prev) => prev.filter((c) => c.id !== id))
    },
    [slug]
  )

  return { comments, add, remove }
}
