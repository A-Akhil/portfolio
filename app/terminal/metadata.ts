import { Metadata } from 'next';

// Define base URL for canonical links and absolute URLs
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://devakhil.com';

export function generateMetadata(): Metadata {
  return {
    title: 'A Akhil - Interactive Terminal | Portfolio',
    description: 'Interactive terminal interface for exploring A Akhil\'s portfolio. Use commands to discover AI/ML projects, experience, and skills in a unique developer-friendly format.',
    alternates: {
      canonical: '/terminal',
    },
    openGraph: {
      title: 'A Akhil - Interactive Terminal | Portfolio',
      description: 'Explore my portfolio through an interactive terminal interface. Discover AI/ML projects, experience, and skills using command-line style interaction.',
      url: `${baseUrl}/terminal`,
      siteName: 'A Akhil Portfolio',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: `${baseUrl}/terminal-og-image.png`, // You'll need to create this image
          width: 1200,
          height: 630,
          alt: 'A Akhil - Interactive Terminal Interface',
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'A Akhil - Interactive Terminal | Portfolio',
      description: 'Explore my portfolio through an interactive terminal interface',
      images: [`${baseUrl}/terminal-og-image.png`], // You'll need to create this image
    },
  };
}
