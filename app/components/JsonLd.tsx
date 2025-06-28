import Script from 'next/script';

export default function JsonLd() {
  // Define base URL for canonical links and absolute URLs
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://devakhil.com';
  
  // Create structured data for personal portfolio
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'A Akhil',
    url: baseUrl,
    image: `${baseUrl}/og-image.png`, // References image from public folder with absolute URL
    description: 'AI/ML Developer and Researcher with experience at DRDO, ISRO, and Samsung R&D',
    jobTitle: 'AI/ML Developer & Researcher',
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'SRM Institute',
      sameAs: 'https://www.srmist.edu.in/'
    },
    sameAs: [
      'https://github.com/A-Akhil',
      'https://linkedin.com/in/a-akhil-16b396201',
      // Add other social links here as needed
    ],
    knowsAbout: [
      'Artificial Intelligence',
      'Machine Learning',
      'Computer Vision',
      'Deep Learning',
      'Natural Language Processing',
      'Python',
      'React',
      'Next.js',
      'TensorFlow',
      'PyTorch'
    ],
    worksFor: [
      {
        '@type': 'Organization',
        name: 'DRDO',
        sameAs: 'https://www.drdo.gov.in/'
      },
      {
        '@type': 'Organization',
        name: 'ISRO',
        sameAs: 'https://www.isro.gov.in/'
      },
      {
        '@type': 'Organization',
        name: 'Samsung R&D',
        sameAs: 'https://research.samsung.com/'
      }
    ]
  };

  return (
    <Script id="json-ld" type="application/ld+json" strategy="afterInteractive">
      {JSON.stringify(jsonLd)}
    </Script>
  );
}
