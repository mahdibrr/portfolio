/**
 * SEO Configuration Module
 * Centralized SEO configuration for the portfolio website
 * 
 * Requirements: 1.1, 1.6, 8.1
 */

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Education information for structured data
 */
export interface EducationInfo {
  name: string;
  degree: string;
  field: string;
  location?: string;
}

/**
 * Author information for Person schema
 */
export interface AuthorInfo {
  name: string;
  jobTitle: string;
  email: string;
  image: string;
  alumniOf: EducationInfo;
  description?: string;
}

/**
 * Social profile links for sameAs property
 */
export interface SocialProfiles {
  github: string;
  linkedin: string;
  twitter?: string;
  stackoverflow?: string;
}

/**
 * Supported language configuration
 */
export interface SupportedLanguage {
  code: string;      // 'en', 'fr', 'ar'
  locale: string;    // 'en_US', 'fr_FR', 'ar_TN'
  name: string;
  hreflang: string;
  direction: 'ltr' | 'rtl';
}

/**
 * Geographic targeting configuration
 */
export interface GeoTargeting {
  primaryRegion: string;
  targetRegions: string[];
  timezone: string;
  placename?: string;
}


/**
 * Main SEO configuration interface
 */
export interface SEOConfig {
  baseUrl: string;
  siteName: string;
  defaultTitle: string;
  defaultDescription: string;
  author: AuthorInfo;
  social: SocialProfiles;
  languages: SupportedLanguage[];
  geo: GeoTargeting;
  keywords: string[];
}

// ============================================================================
// Default Configuration
// ============================================================================

/**
 * Default SEO configuration for the portfolio
 */
export const seoConfig: SEOConfig = {
  baseUrl: 'https://mahdibr.online',
  siteName: 'Mahdi Ben Rhouma Portfolio',
  defaultTitle: 'Mahdi Ben Rhouma - Full-Stack Developer',
  defaultDescription: 'Full-stack developer specializing in React, Next.js, FastAPI, and Spring Boot. Available for freelance and full-time opportunities.',
  author: {
    name: 'Mahdi Ben Rhouma',
    jobTitle: 'Full-Stack Developer',
    email: 'mahdi.benrhouma@sesame.com.tn',
    image: '/images/profile.jpg',
    description: 'Full-stack developer with expertise in modern web technologies including React, Next.js, FastAPI, and Spring Boot.',
    alumniOf: {
      name: 'Sesame University',
      degree: 'LIM3 - License in Multimedia Informatics',
      field: 'Web Development',
      location: 'Tunis, Tunisia'
    }
  },
  social: {
    github: 'https://github.com/mahdibrr',
    linkedin: 'https://www.linkedin.com/in/mahdi-ben-rhouma-180971357/',
    stackoverflow: undefined,
    twitter: undefined
  },
  languages: [
    { 
      code: 'en', 
      locale: 'en_US', 
      name: 'English', 
      hreflang: 'en',
      direction: 'ltr'
    },
    { 
      code: 'fr', 
      locale: 'fr_FR', 
      name: 'Français', 
      hreflang: 'fr',
      direction: 'ltr'
    },
    { 
      code: 'ar', 
      locale: 'ar_TN', 
      name: 'العربية', 
      hreflang: 'ar',
      direction: 'rtl'
    }
  ],
  geo: {
    primaryRegion: 'TN',
    targetRegions: ['TN', 'FR', 'BE', 'CH', 'CA', 'AE', 'SA'],
    timezone: 'Africa/Tunis',
    placename: 'Tunis, Tunisia'
  },
  keywords: [
    'full-stack developer',
    'React developer',
    'Next.js developer',
    'FastAPI developer',
    'Spring Boot developer',
    'web developer Tunisia',
    'développeur web',
    'hire developer',
    'freelance developer'
  ]
};

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Get the full URL for a given path
 */
export function getFullUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${seoConfig.baseUrl}${cleanPath}`;
}

/**
 * Get author's sameAs links array for structured data
 */
export function getSameAsLinks(): string[] {
  const links: string[] = [];
  
  if (seoConfig.social.github) {
    links.push(seoConfig.social.github);
  }
  if (seoConfig.social.linkedin) {
    links.push(seoConfig.social.linkedin);
  }
  if (seoConfig.social.twitter) {
    links.push(seoConfig.social.twitter);
  }
  if (seoConfig.social.stackoverflow) {
    links.push(seoConfig.social.stackoverflow);
  }
  
  return links;
}

/**
 * Get supported locale codes
 */
export function getSupportedLocales(): string[] {
  return seoConfig.languages.map(lang => lang.code);
}

/**
 * Get language config by code
 */
export function getLanguageConfig(code: string): SupportedLanguage | undefined {
  return seoConfig.languages.find(lang => lang.code === code);
}

/**
 * Validate that a config object has all required SEO fields
 */
export function validateSEOConfig(config: Partial<SEOConfig>): boolean {
  const requiredFields: (keyof SEOConfig)[] = [
    'baseUrl',
    'siteName', 
    'defaultTitle',
    'defaultDescription',
    'author',
    'social',
    'languages',
    'geo'
  ];
  
  for (const field of requiredFields) {
    if (config[field] === undefined || config[field] === null) {
      return false;
    }
  }
  
  // Validate author has required fields
  if (config.author) {
    const authorRequired: (keyof AuthorInfo)[] = ['name', 'jobTitle', 'email', 'image', 'alumniOf'];
    for (const field of authorRequired) {
      if (!config.author[field]) {
        return false;
      }
    }
  }
  
  // Validate social has at least one profile
  if (config.social) {
    const hasProfile = config.social.github || config.social.linkedin || 
                       config.social.twitter || config.social.stackoverflow;
    if (!hasProfile) {
      return false;
    }
  }
  
  // Validate languages array is not empty
  if (config.languages && config.languages.length === 0) {
    return false;
  }
  
  // Validate geo has required fields
  if (config.geo) {
    if (!config.geo.primaryRegion || !config.geo.timezone) {
      return false;
    }
  }
  
  return true;
}

export default seoConfig;
