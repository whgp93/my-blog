'use client'
import { useEffect } from 'react'

export function useCustomFont() {
  useEffect(() => {
    const stored = localStorage.getItem('customFont')
    if (!stored) return

    try {
      const { fontUrl, fontFamily } = JSON.parse(stored) as {
        fontUrl: string
        fontFamily: string
      }

      const existingStyle = document.getElementById('custom-font')
      if (existingStyle) existingStyle.remove()

      const style = document.createElement('style')
      style.id = 'custom-font'
      style.textContent = `
        @font-face {
          font-family: '${fontFamily}';
          src: url('${fontUrl}');
          font-display: swap;
        }
        :root { --font-custom: '${fontFamily}'; }
        body { font-family: '${fontFamily}', var(--font-tajawal), sans-serif; }
      `
      document.head.appendChild(style)
    } catch {
      // ignore
    }
  }, [])
}
