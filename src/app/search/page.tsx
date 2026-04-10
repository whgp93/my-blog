'use client'
import { useState, useEffect, useCallback } from 'react'
import { Search } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import type { SearchItem } from '@/lib/search'
import { searchPosts } from '@/lib/search'
import { Badge } from '@/components/ui/Badge'
import type { Category } from '@/types/post'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState<SearchItem[]>([])
  const [results, setResults] = useState<SearchItem[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetch('/search-index.json')
      .then((r) => r.json())
      .then((data: SearchItem[]) => {
        setIndex(data)
        setLoaded(true)
      })
      .catch(() => setLoaded(true))
  }, [])

  const handleSearch = useCallback(
    (q: string) => {
      setQuery(q)
      setResults(searchPosts(q, index))
    },
    [index]
  )

  const formattedDate = (date: string) =>
    new Date(date).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-8 pb-20">
      <header className="pt-8 mb-10">
        <h1 className="font-headline text-4xl mb-6">البحث</h1>
        <div className="relative">
          <Search
            size={20}
            className="absolute top-1/2 -translate-y-1/2 end-4 text-outline-variant pointer-events-none"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="ابحث في المقالات..."
            autoFocus
            className="w-full bg-surface-container-low border-none rounded-xl py-4 ps-5 pe-12 text-on-surface focus:ring-1 focus:ring-primary/30 outline-none transition-all placeholder:text-outline-variant text-base"
          />
        </div>
      </header>

      {!loaded && (
        <p className="text-center text-on-surface-variant py-12">جاري التحميل...</p>
      )}

      {loaded && query && results.length === 0 && (
        <div className="text-center py-16">
          <p className="text-on-surface-variant text-lg">
            لا توجد نتائج لـ &quot;{query}&quot;
          </p>
        </div>
      )}

      {loaded && query && results.length > 0 && (
        <div>
          <p className="text-xs uppercase tracking-widest text-on-surface-variant mb-6">
            {results.length} نتيجة
          </p>
          <div className="space-y-6">
            {results.map((item) => (
              <Link
                key={item.slug}
                href={`/blog/${item.slug}`}
                className="flex gap-5 group p-4 rounded-xl hover:bg-surface-container transition-colors"
              >
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge category={item.category as Category} />
                    <span className="text-[10px] text-outline">{formattedDate(item.date)}</span>
                  </div>
                  <h3 className="font-headline text-lg group-hover:text-primary transition-colors leading-snug mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-on-surface-variant line-clamp-2">{item.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {loaded && !query && (
        <div className="text-center py-16">
          <p className="text-on-surface-variant">
            ابدأ الكتابة للبحث في المقالات...
          </p>
        </div>
      )}
    </div>
  )
}
