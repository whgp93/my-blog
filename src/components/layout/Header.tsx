'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { ThemeToggle } from './ThemeToggle'

const navLinks = [
  { href: '/', label: 'الرئيسية' },
  { href: '/blog', label: 'المدونة' },
  { href: '/about', label: 'عني' },
  { href: '/contact', label: 'تواصل' },
  { href: '/newsletter', label: 'النشرة' },
]

export function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-surface-container/80 backdrop-blur-md shadow-[0_10px_40px_rgba(47,51,52,0.04)]">
      <div className="flex justify-between items-center px-6 md:px-8 py-5 max-w-7xl mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-headline italic tracking-tight text-on-surface"
        >
          المدوّن
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors duration-300 ${
                pathname === link.href
                  ? 'text-on-surface font-semibold border-b border-on-surface/20'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/search"
            className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container transition-colors"
            aria-label="بحث"
          >
            <Search size={20} />
          </Link>
          <ThemeToggle />
          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-full text-on-surface-variant hover:bg-surface-container transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="القائمة"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-surface-container-lowest border-t border-outline-variant/10 px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block py-2 text-sm transition-colors ${
                pathname === link.href
                  ? 'text-primary font-semibold'
                  : 'text-on-surface-variant'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/newsletter"
            onClick={() => setMenuOpen(false)}
            className="block py-2 text-sm text-on-surface-variant"
          >
            النشرة البريدية
          </Link>
        </div>
      )}
    </nav>
  )
}
