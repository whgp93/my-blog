'use client'
import { useState } from 'react'
import type { PostMeta, Category } from '@/types/post'
import { ArticleCard } from './ArticleCard'

interface CategoryFilterProps {
  posts: PostMeta[]
}

const categories: Array<Category | 'الكل'> = ['الكل', 'تقنية', 'سفر', 'اقتصاد']

export function CategoryFilter({ posts }: CategoryFilterProps) {
  const [active, setActive] = useState<Category | 'الكل'>('الكل')

  const filtered =
    active === 'الكل' ? posts : posts.filter((p) => p.category === active)

  return (
    <div>
      {/* Filter Tabs */}
      <div className="flex gap-3 mb-12 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-5 py-2 text-xs font-bold tracking-widest uppercase rounded-full transition-all ${
              active === cat
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filtered.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-on-surface-variant py-20">
          لا توجد مقالات في هذا القسم بعد.
        </p>
      )}
    </div>
  )
}
