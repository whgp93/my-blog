'use client'
import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface ShareButtonsProps {
  title: string
  url: string
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const encoded = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-xs uppercase tracking-widest text-on-surface-variant font-bold">
        شارك:
      </span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 bg-surface-container text-on-surface-variant hover:bg-surface-container-high text-xs font-bold tracking-wider uppercase rounded-md transition-colors"
      >
        تويتر / 𝕏
      </a>
      <a
        href={`https://wa.me/?text=${encodedTitle}%20${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 bg-surface-container text-on-surface-variant hover:bg-surface-container-high text-xs font-bold tracking-wider uppercase rounded-md transition-colors"
      >
        واتساب
      </a>
      <button
        onClick={handleCopy}
        className="px-4 py-2 bg-surface-container text-on-surface-variant hover:bg-surface-container-high text-xs font-bold tracking-wider uppercase rounded-md transition-colors flex items-center gap-2"
      >
        {copied ? (
          <>
            <Check size={14} />
            تم النسخ
          </>
        ) : (
          <>
            <Copy size={14} />
            نسخ الرابط
          </>
        )}
      </button>
    </div>
  )
}
