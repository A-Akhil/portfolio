// Add Cloudflare Edge runtime configuration
export const runtime = 'edge';

import './globals.css'
import type { Metadata } from 'next'

// Define base URL for canonical links and absolute URLs
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://devakhil.com';

export const metadata: Metadata = {
  title: 'A Akhil - AI/ML Developer & Researcher',
  description: 'Portfolio of A Akhil, AI/ML Developer and Researcher with experience at DRDO, ISRO, and Samsung R&D. Specializing in artificial intelligence, machine learning, and computer vision.',
  keywords: 'AI, ML, Machine Learning, Artificial Intelligence, Developer, Researcher, DRDO, ISRO, Samsung, Python, React, Deep Learning, Neural Networks, Computer Vision, NLP',
  authors: [{ name: 'A Akhil', url: 'https://github.com/A-Akhil' }],
  creator: 'A Akhil',
  publisher: 'A Akhil',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
  openGraph: {
    title: 'A Akhil - AI/ML Developer & Researcher',
    description: 'Portfolio of A Akhil, AI/ML Developer and Researcher with experience at DRDO, ISRO, and Samsung R&D',
    url: baseUrl,
    siteName: 'A Akhil Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'A Akhil - AI/ML Developer & Researcher',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A Akhil - AI/ML Developer & Researcher',
    description: 'AI/ML Developer and Researcher with experience at DRDO, ISRO, and Samsung R&D',
    images: [`${baseUrl}/og-image.png`],
    creator: '@AkhilArul',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#0A0A0F',
  colorScheme: 'dark',
  verification: {
    google: 'google-site-verification-code', // Replace with actual verification code when available
  },
}

import JsonLd from './components/JsonLd';
import GeoOptimization from './components/GeoOptimization';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="canonical" href={process.env.NEXT_PUBLIC_BASE_URL || 'https://devakhil.com'} />
      </head>
      <body className="bg-gradient-to-br from-ai-dark via-ai-gray to-ai-dark text-gray-100 antialiased">
        <JsonLd />
        <GeoOptimization />
        {children}
      </body>
    </html>
  )
}
