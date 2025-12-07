import { MetadataRoute } from 'next'
import { seoConfig } from '@/lib/seo/config'

/**
 * Generate robots.txt with crawl rules and sitemap location
 * 
 * Requirements: 5.2
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = seoConfig.baseUrl

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/private/'],
        crawlDelay: 1, // Polite crawl delay of 1 second
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
        // No crawl delay for Googlebot - they manage their own rate
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
        crawlDelay: 1,
      },
      {
        userAgent: 'GPTBot',
        disallow: ['/'], // Block AI crawlers if desired
      },
      {
        userAgent: 'CCBot',
        disallow: ['/'], // Block Common Crawl bot
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
