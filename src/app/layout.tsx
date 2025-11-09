import type { Metadata } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { Providers } from '@/components/providers'
import './globals.css'

const inter = Inter({ variable: '--font-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

const description = 'Software developer building web, mobile and hardware projects. Based in Pančevo, Serbia.'

export const metadata: Metadata = {
  metadataBase: new URL('https://deniskucevic.com'),
  title: { default: 'Denis Kucevic', template: '%s | Denis Kucevic' },
  description,
  openGraph: {
    type: 'website',
    siteName: 'Denis Kucevic',
    title: 'Denis Kucevic',
    description,
    url: 'https://deniskucevic.com',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Denis Kucevic',
    description,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
        {/* Dot grid overlay */}
        <div className="dot-grid pointer-events-none fixed inset-0 -z-10" aria-hidden="true" />
        {/* Soft emerald glow from top */}
        <div
          className="pointer-events-none fixed left-1/2 -top-40 -z-10 h-[480px] w-[700px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
          aria-hidden="true"
        />
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
