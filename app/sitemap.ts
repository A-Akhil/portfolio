import { MetadataRoute } from 'next';

// In Next.js App Router, we should use relative URLs in the sitemap
// https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();
  
  // Define the routes that should be included in the sitemap
  // Note: URLs should be relative without domain
  return [
    {
      url: '/',
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: '/terminal',
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Add other routes as they become available
  ];
}
