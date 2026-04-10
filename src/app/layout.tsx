import type { Metadata } from 'next'
import { Tajawal } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import Script from 'next/script'
import { ClientLayout } from '@/components/layout/ClientLayout'
import './globals.css'

const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['200', '300', '400', '500', '700', '800', '900'],
  variable: '--font-tajawal',
  display: 'swap',
})

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? 'https://example.com'),
  title: {
    default: 'المدوّن',
    template: '%s | المدوّن',
  },
  description: 'مدونة شخصية في التقنية والسفر والاقتصاد',
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    siteName: 'المدوّن',
  },
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html dir="rtl" lang="ar" suppressHydrationWarning className={tajawal.variable}>
      <head>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className="font-tajawal bg-surface text-on-surface min-h-screen antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}
