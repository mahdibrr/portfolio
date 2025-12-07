/**
 * Canonical URL utilities for SEO
 * 
 * Requirements: 5.3
 */

import { seoConfig } from './config'

/**
 * Generate canonical URL for a given path
 * 
 * @param path - The path to generate canonical URL for (e.g., '/', '/about')
 * @param locale - Optional locale code (e.g., 'en', 'fr', 'ar')
 * @returns Canonical URL string
 */
export function generateCanonicalUrl(path: string, locale?: string): string {
  const baseUrl = seoConfig.baseUrl
  
  // Normalize path - ensure it starts with /
  let normalizedPath = path.startsWith('/') ? path : `/${path}`
  
  // Remove trailing slash unless it's the root path
  if (normalizedPath !== '/' && normalizedPath.endsWith('/')) {
    normalizedPath = normalizedPath.slice(0, -1)
  }
  
  // Add locale prefix if not default locale
  if (locale && locale !== 'en') {
    normalizedPath = `/${locale}${normalizedPath}`
  }
  
  // Combine base URL with path
  return `${baseUrl}${normalizedPath}`
}

/**
 * Generate canonical URL from full URL
 * Useful for normalizing URLs with query parameters or fragments
 * 
 * @param url - Full URL to normalize
 * @returns Canonical URL without query params or fragments
 */
export function normalizeCanonicalUrl(url: string): string {
  try {
    const urlObj = new URL(url)
    // Return URL without query params or hash
    return `${urlObj.origin}${urlObj.pathname}`
  } catch {
    // If URL parsing fails, return as-is
    return url
  }
}

/**
 * Extract locale from path
 * 
 * @param path - Path that may contain locale prefix
 * @returns Locale code or 'en' as default
 */
export function extractLocaleFromPath(path: string): string {
  const supportedLocales = seoConfig.languages.map(lang => lang.code)
  
  // Check if path starts with a supported locale
  for (const locale of supportedLocales) {
    if (locale !== 'en' && path.startsWith(`/${locale}/`)) {
      return locale
    }
  }
  
  return 'en' // default locale
}
