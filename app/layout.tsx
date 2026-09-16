import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "NOVA HR — Employee Management Dashboard",
  description:
    "NOVA HR is a clean, responsive dashboard for managing employees: search, filter, add, edit, and remove team members across departments.",
  generator: "v0.app",
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#4f46e5',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
