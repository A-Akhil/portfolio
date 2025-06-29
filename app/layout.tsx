import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'A Akhil - AI/ML Developer & Researcher',
  description: 'Portfolio of A Akhil, AI/ML Developer and Researcher with experience at DRDO, ISRO, and Samsung R&D',
  keywords: 'AI, ML, Machine Learning, Artificial Intelligence, Developer, Researcher, DRDO, ISRO, Samsung, Python, React',
  authors: [{ name: 'A Akhil' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#0A0A0F',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gradient-to-br from-ai-dark via-ai-gray to-ai-dark text-gray-100 antialiased">
        {children}
      </body>
    </html>
  )
}
