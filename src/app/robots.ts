import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/dashboard/', '/api/'], // Block Google from indexing your private dashboards!
    },
    sitemap: 'https://yourwebsite.com/sitemap.xml',
  }
}