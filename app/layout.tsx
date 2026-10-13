import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ginger Harvest Advisor',
  description: 'AI-assisted agricultural dashboard for ginger farmers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-50 selection:bg-emerald-500/30">
        {children}
      </body>
    </html>
  )
}
