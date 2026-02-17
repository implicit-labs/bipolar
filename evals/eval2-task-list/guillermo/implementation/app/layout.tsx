import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Task List - Ship to Learn',
  description: 'A production-ready task list built with Next.js 15',
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
