/**
 * Multi-language SEO Module
 * Handles internationalization for SEO including hreflang tags and localized metadata
 * 
 * Requirements: 3.1, 3.2, 3.3
 */

import { seoConfig, type SupportedLanguage } from './config';

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Hreflang tag for alternate language versions
 */
export interface HreflangTag {
  hreflang: string;
  href: string;
}

/**
 * Localized metadata for a page
 */
export interface LocalizedMetadata {
  title: string;
  description: string;
  locale: string;
  lang: string;
  direction: 'ltr' | 'rtl';
  alternates?: {
    canonical: string;
    languages: Record<string, string>;
  };
}

// ============================================================================
// Hreflang Tag Generation
// ============================================================================

/**
 * Generate hreflang tags for all supported locales
 * 
 * For any page supporting multiple languages, this function generates
 * valid hreflang tags for all supported locales.
 * 
 * @param path - The page path (e.g., '/', '/about')
 * @param currentLocale - The current locale code (e.g., 'en', 'fr', 'ar')
 * @returns Array of hreflang tags for all supported locales
 * 
 * Requirements: 3.1, 3.2, 3.3
 */
export function generateHreflangTags(
  path: string,
  currentLocale?: string
): HreflangTag[] {
  const tags: HreflangTag[] = [];
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  // Generate hreflang tag for each supported language
  for (const language of seoConfig.languages) {
    const localizedPath = language.code === 'en' 
      ? cleanPath 
      : `/${language.code}${cleanPath}`;
    
    tags.push({
      hreflang: language.hreflang,
      href: `${seoConfig.baseUrl}${localizedPath}`
    });
  }
  
  // Add x-default for the default language (English)
  const defaultPath = cleanPath;
  tags.push({
    hreflang: 'x-default',
    href: `${seoConfig.baseUrl}${defaultPath}`
  });
  
  return tags;
}

/**
 * Get alternate language URLs for a given path
 * 
 * @param path - The page path
 * @returns Record of locale codes to full URLs
 */
export function getAlternateLanguageUrls(path: string): Record<string, string> {
  const alternates: Record<string, string> = {};
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  for (const language of seoConfig.languages) {
    const localizedPath = language.code === 'en' 
      ? cleanPath 
      : `/${language.code}${cleanPath}`;
    
    alternates[language.code] = `${seoConfig.baseUrl}${localizedPath}`;
  }
  
  return alternates;
}

// ============================================================================
// Localized Metadata Generation
// ============================================================================

/**
 * Get localized metadata for a page
 * 
 * Generates complete metadata including title, description, locale,
 * language direction, and alternate language URLs.
 * 
 * @param locale - The locale code (e.g., 'en', 'fr', 'ar')
 * @param page - The page identifier (e.g., 'home', 'about', 'projects')
 * @param customTitle - Optional custom title override
 * @param customDescription - Optional custom description override
 * @returns Localized metadata object
 * 
 * Requirements: 3.1, 3.2, 3.3
 */
export function getLocalizedMetadata(
  locale: string,
  page: string = 'home',
  customTitle?: string,
  customDescription?: string
): LocalizedMetadata {
  // Find the language configuration
  const languageConfig = seoConfig.languages.find(lang => lang.code === locale);
  
  // Default to English if locale not found
  const effectiveLocale = languageConfig?.code || 'en';
  const effectiveLanguageConfig = languageConfig || seoConfig.languages[0];
  
  // Use custom values or defaults
  const title = customTitle || seoConfig.defaultTitle;
  const description = customDescription || seoConfig.defaultDescription;
  
  // Generate path for this page
  const pagePath = page === 'home' ? '/' : `/${page}`;
  const canonicalPath = effectiveLocale === 'en' 
    ? pagePath 
    : `/${effectiveLocale}${pagePath}`;
  
  return {
    title,
    description,
    locale: effectiveLanguageConfig.locale,
    lang: effectiveLanguageConfig.code,
    direction: effectiveLanguageConfig.direction,
    alternates: {
      canonical: `${seoConfig.baseUrl}${canonicalPath}`,
      languages: getAlternateLanguageUrls(pagePath)
    }
  };
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Check if a locale is supported
 * 
 * @param locale - The locale code to check
 * @returns True if the locale is supported
 */
export function isSupportedLocale(locale: string): boolean {
  return seoConfig.languages.some(lang => lang.code === locale);
}

/**
 * Get the default locale
 * 
 * @returns The default locale code (first in the languages array)
 */
export function getDefaultLocale(): string {
  return seoConfig.languages[0]?.code || 'en';
}

/**
 * Get all supported locale codes
 * 
 * @returns Array of supported locale codes
 */
export function getSupportedLocaleCodes(): string[] {
  return seoConfig.languages.map(lang => lang.code);
}

/**
 * Get language configuration by locale code
 * 
 * @param locale - The locale code
 * @returns Language configuration or undefined if not found
 */
export function getLanguageConfig(locale: string): SupportedLanguage | undefined {
  return seoConfig.languages.find(lang => lang.code === locale);
}

/**
 * Get the language direction for a locale
 * 
 * @param locale - The locale code
 * @returns 'ltr' or 'rtl'
 */
export function getLanguageDirection(locale: string): 'ltr' | 'rtl' {
  const config = getLanguageConfig(locale);
  return config?.direction || 'ltr';
}
