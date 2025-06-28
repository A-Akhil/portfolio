import { Metadata } from 'next';

// Define base URL for canonical links and absolute URLs
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://devakhil.com';

export function generateMetadata(): Metadata {
  return {
    title: 'A Akhil - AI/ML Developer & Researcher | Portfolio',
    description: 'Portfolio of A Akhil - AI/ML Developer and Researcher with experience at DRDO, ISRO, and Samsung R&D. Explore projects, skills, and experience in artificial intelligence and machine learning.',
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: 'A Akhil - AI/ML Developer & Researcher | Portfolio',
      description: 'AI/ML Developer and Researcher with experience at DRDO, ISRO, and Samsung R&D. Explore my projects in machine learning, computer vision, and AI.',
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
      title: 'A Akhil - AI/ML Developer & Researcher | Portfolio',
      description: 'AI/ML Developer and Researcher with experience at DRDO, ISRO, and Samsung R&D',
      images: [`${baseUrl}/og-image.png`],
    },
  };
}
