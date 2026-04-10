export interface SearchItem {
  slug: string
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  image: string
  content: string
}

export function searchPosts(query: string, items: SearchItem[]): SearchItem[] {
  if (!query.trim()) return []
  const q = query.toLowerCase().trim()
  return items.filter(
    (item) =>
      item.title.toLowerCase().includes(q) ||
      item.excerpt.toLowerCase().includes(q) ||
      item.content.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.author.toLowerCase().includes(q)
  )
}
