export type Category = 'تقنية' | 'سفر' | 'اقتصاد'

export interface Post {
  slug: string
  title: string
  date: string
  category: Category
  image: string
  excerpt: string
  author: string
  featured?: boolean
  content: string
}

export interface PostMeta {
  slug: string
  title: string
  date: string
  category: Category
  image: string
  excerpt: string
  author: string
  featured?: boolean
}
