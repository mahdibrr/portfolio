import { MetadataRoute } from 'next'
import { seoConfig } from '@/lib/seo/config'

/**
 * Generate sitemap with multi-language support
 * 
 * Requirements: 3.4, 5.1
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = seoConfig.baseUrl
  
  // Define pages with their properties including lastmod dates
  // In a real application, these dates would come from a CMS or content management system
  const pages = [
    {
      path: '/',
      changeFrequency: 'weekly' as const,
      priority: 1.0,
      lastModified: new Date('2024-12-01'), // Homepage - updated frequently
    },
    {
      path: '/#about',
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      lastModified: new Date('2024-11-15'), // About section - less frequent updates
    },
    {
      path: '/#projects',
      changeFrequency: 'weekly' as const,
      priority: 0.9,
      lastModified: new Date('2024-11-28'), // Projects - updated when new projects added
    },
    {
      path: '/#skills',
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      lastModified: new Date('2024-11-10'), // Skills - updated when learning new tech
    },
    {
      path: '/#contact',
      changeFrequency: 'monthly' as const,
      priority: 0.6,
      lastModified: new Date('2024-10-20'), // Contact - rarely changes
    },
  ]
  
  const sitemapEntries: MetadataRoute.Sitemap = []
  
  // Generate entries for each page with language alternates
  for (const page of pages) {
    // Create language alternates object
    const languages: Record<string, string> = {}
    
    for (const language of seoConfig.languages) {
      const localizedPath = language.code === 'en' 
        ? page.path 
        : `/${language.code}${page.path}`
      
      languages[language.hreflang] = `${baseUrl}${localizedPath}`
    }
    
    // Add entry for default language (English)
    sitemapEntries.push({
      url: `${baseUrl}${page.path}`,
      lastModified: page.lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages
      }
    })
    
    // Add entries for other languages
    for (const language of seoConfig.languages) {
      if (language.code !== 'en') {
        const localizedPath = `/${language.code}${page.path}`
        
        sitemapEntries.push({
          url: `${baseUrl}${localizedPath}`,
          lastModified: page.lastModified,
          changeFrequency: page.changeFrequency,
          priority: page.priority,
          alternates: {
            languages
          }
        })
      }
    }
  }
  
  return sitemapEntries
}
