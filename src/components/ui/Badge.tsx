import type { Category } from '@/types/post'

interface BadgeProps {
  category: Category
  className?: string
}

const categoryColors: Record<Category, string> = {
  'تقنية': 'text-blue-700 bg-blue-50 dark:text-blue-300 dark:bg-blue-900/30',
  'سفر': 'text-green-700 bg-green-50 dark:text-green-300 dark:bg-green-900/30',
  'اقتصاد': 'text-amber-700 bg-amber-50 dark:text-amber-300 dark:bg-amber-900/30',
}

export function Badge({ category, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-block text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full ${categoryColors[category]} ${className}`}
    >
      {category}
    </span>
  )
}
