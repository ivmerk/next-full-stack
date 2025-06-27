import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Recipe App',
  description: 'A full-stack recipe management application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
} 