import { getAllPosts, getFeaturedPost } from '@/lib/posts'
import { FeaturedHero } from '@/components/home/FeaturedHero'
import { PullQuote } from '@/components/home/PullQuote'
import { ArticleGrid } from '@/components/home/ArticleGrid'
import { NewsletterSection } from '@/components/home/NewsletterSection'

export default function HomePage() {
  const featured = getFeaturedPost()
  const allPosts = getAllPosts()
  const gridPosts = allPosts.filter((p) => !p.featured || p.slug !== featured?.slug).slice(0, 6)

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-8 pb-12">
      {featured && <FeaturedHero post={featured} />}
      <PullQuote />
      <ArticleGrid posts={gridPosts.length > 0 ? gridPosts : allPosts.slice(0, 6)} />
      <NewsletterSection />
    </div>
  )
}
