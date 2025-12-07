/**
 * Social Metadata Module
 * Generates Open Graph and Twitter Card metadata for social sharing
 * 
 * Requirements: 2.1, 2.2, 2.3, 2.6
 */

import { seoConfig, getFullUrl, type SEOConfig } from './config';

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Open Graph metadata configuration
 */
export interface OpenGraphMetadata {
  title: string;
  description: string;
  url: string;
  siteName: string;
  locale: string;
  type: 'website' | 'article' | 'profile';
  images: OpenGraphImage[];
  updatedTime?: string;
  alternateLocale?: string[];
}

/**
 * Open Graph image configuration
 */
export interface OpenGraphImage {
  url: string;
  width: number;
  height: number;
  alt: string;
  type?: string;
}

/**
 * Twitter Card metadata configuration
 */
export interface TwitterCardMetadata {
  card: 'summary' | 'summary_large_image' | 'app' | 'player';
  site?: string;
  creator?: string;
  title: string;
  description: string;
  images: string[];
}

/**
 * Page configuration for generating social metadata
 */
export interface PageConfig {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article' | 'profile';
  locale?: string;
  updatedTime?: string;
  twitterCreator?: string;
}

/**
 * Combined social metadata
 */
export interface SocialMetadata {
  openGraph: OpenGraphMetadata;
  twitter: TwitterCardMetadata;
}

// ============================================================================
// Constants
// ============================================================================

/**
 * Default OG image dimensions (1200x630 is optimal for most platforms)
 */
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

/**
 * Maximum description length for Twitter (200 characters recommended)
 */
export const TWITTER_MAX_DESCRIPTION = 200;

// ============================================================================
// Generator Functions
// ============================================================================

/**
 * Generate Open Graph metadata for a page
 * 
 * Requirements: 2.1, 2.3, 2.6
 * 
 * @param pageConfig - Page-specific configuration
 * @param config - Optional SEO config, defaults to seoConfig
 * @returns OpenGraphMetadata object
 */
export function generateOpenGraph(
  pageConfig: PageConfig = {},
  config: SEOConfig = seoConfig
): OpenGraphMetadata {
  const {
    title = config.defaultTitle,
    description = config.defaultDescription,
    path = '/',
    image = config.author.image,
    imageAlt = `${config.author.name} - ${config.author.jobTitle}`,
    type = 'website',
    locale = config.languages[0]?.locale || 'en_US',
    updatedTime,
  } = pageConfig;

  // Build the full URL for the page
  const url = getFullUrl(path);
  
  // Build the full image URL
  const imageUrl = image.startsWith('http') ? image : getFullUrl(image);
  
  // Get alternate locales (all locales except the current one)
  const alternateLocale = config.languages
    .map(lang => lang.locale)
    .filter(loc => loc !== locale);

  const openGraph: OpenGraphMetadata = {
    title,
    description,
    url,
    siteName: config.siteName,
    locale,
    type,
    images: [
      {
        url: imageUrl,
        width: OG_IMAGE_WIDTH,
        height: OG_IMAGE_HEIGHT,
        alt: imageAlt,
        type: 'image/png',
      },
    ],
  };

  // Add optional fields
  if (updatedTime) {
    openGraph.updatedTime = updatedTime;
  }

  if (alternateLocale.length > 0) {
    openGraph.alternateLocale = alternateLocale;
  }

  return openGraph;
}

/**
 * Generate Twitter Card metadata for a page
 * 
 * Requirements: 2.2
 * 
 * @param pageConfig - Page-specific configuration
 * @param config - Optional SEO config, defaults to seoConfig
 * @returns TwitterCardMetadata object
 */
export function generateTwitterCard(
  pageConfig: PageConfig = {},
  config: SEOConfig = seoConfig
): TwitterCardMetadata {
  const {
    title = config.defaultTitle,
    description = config.defaultDescription,
    image = config.author.image,
    twitterCreator,
  } = pageConfig;

  // Build the full image URL
  const imageUrl = image.startsWith('http') ? image : getFullUrl(image);
  
  // Truncate description if needed (Twitter recommends under 200 chars)
  const truncatedDescription = description.length > TWITTER_MAX_DESCRIPTION
    ? description.substring(0, TWITTER_MAX_DESCRIPTION - 3) + '...'
    : description;

  // Get Twitter handle from social profiles if available
  const twitterSite = config.social.twitter
    ? extractTwitterHandle(config.social.twitter)
    : undefined;

  const twitterCard: TwitterCardMetadata = {
    card: 'summary_large_image',
    title,
    description: truncatedDescription,
    images: [imageUrl],
  };

  // Add optional fields
  if (twitterSite) {
    twitterCard.site = twitterSite;
  }

  if (twitterCreator) {
    twitterCard.creator = twitterCreator;
  } else if (twitterSite) {
    twitterCard.creator = twitterSite;
  }

  return twitterCard;
}

/**
 * Generate combined social metadata (Open Graph + Twitter Card)
 * 
 * Requirements: 2.1, 2.2, 2.3, 2.6
 * 
 * @param pageConfig - Page-specific configuration
 * @param config - Optional SEO config, defaults to seoConfig
 * @returns SocialMetadata object with both OG and Twitter metadata
 */
export function generateSocialMetadata(
  pageConfig: PageConfig = {},
  config: SEOConfig = seoConfig
): SocialMetadata {
  return {
    openGraph: generateOpenGraph(pageConfig, config),
    twitter: generateTwitterCard(pageConfig, config),
  };
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Extract Twitter handle from a Twitter URL
 * 
 * @param url - Twitter profile URL
 * @returns Twitter handle with @ prefix, or undefined
 */
export function extractTwitterHandle(url: string): string | undefined {
  if (!url) return undefined;
  
  // Handle various Twitter URL formats
  const patterns = [
    /twitter\.com\/([^/?]+)/i,
    /x\.com\/([^/?]+)/i,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      const handle = match[1];
      // Skip if it's a reserved path
      if (['home', 'explore', 'notifications', 'messages', 'settings'].includes(handle.toLowerCase())) {
        continue;
      }
      return handle.startsWith('@') ? handle : `@${handle}`;
    }
  }
  
  // If it's already a handle
  if (url.startsWith('@')) {
    return url;
  }
  
  return undefined;
}

/**
 * Validate that Open Graph metadata has all required fields
 * 
 * @param og - Open Graph metadata to validate
 * @returns true if valid, false otherwise
 */
export function validateOpenGraph(og: Partial<OpenGraphMetadata>): boolean {
  const requiredFields: (keyof OpenGraphMetadata)[] = [
    'title',
    'description',
    'url',
    'siteName',
    'locale',
    'type',
    'images',
  ];

  for (const field of requiredFields) {
    if (og[field] === undefined || og[field] === null) {
      return false;
    }
  }

  // Validate images array
  if (!og.images || og.images.length === 0) {
    return false;
  }

  // Validate first image has required fields
  const firstImage = og.images[0];
  if (!firstImage.url || !firstImage.width || !firstImage.height || !firstImage.alt) {
    return false;
  }

  return true;
}

/**
 * Validate that Twitter Card metadata has all required fields
 * 
 * @param twitter - Twitter Card metadata to validate
 * @returns true if valid, false otherwise
 */
export function validateTwitterCard(twitter: Partial<TwitterCardMetadata>): boolean {
  const requiredFields: (keyof TwitterCardMetadata)[] = [
    'card',
    'title',
    'description',
    'images',
  ];

  for (const field of requiredFields) {
    if (twitter[field] === undefined || twitter[field] === null) {
      return false;
    }
  }

  // Validate images array
  if (!twitter.images || twitter.images.length === 0) {
    return false;
  }

  return true;
}

/**
 * Convert social metadata to Next.js Metadata format
 * 
 * @param social - Social metadata object
 * @returns Object compatible with Next.js Metadata API
 */
export function toNextMetadata(social: SocialMetadata): {
  openGraph: Record<string, unknown>;
  twitter: Record<string, unknown>;
} {
  const { openGraph, twitter } = social;

  return {
    openGraph: {
      title: openGraph.title,
      description: openGraph.description,
      url: openGraph.url,
      siteName: openGraph.siteName,
      locale: openGraph.locale,
      type: openGraph.type,
      images: openGraph.images.map(img => ({
        url: img.url,
        width: img.width,
        height: img.height,
        alt: img.alt,
      })),
      ...(openGraph.updatedTime && { modifiedTime: openGraph.updatedTime }),
      ...(openGraph.alternateLocale && { alternateLocale: openGraph.alternateLocale }),
    },
    twitter: {
      card: twitter.card,
      title: twitter.title,
      description: twitter.description,
      images: twitter.images,
      ...(twitter.site && { site: twitter.site }),
      ...(twitter.creator && { creator: twitter.creator }),
    },
  };
}

export default {
  generateOpenGraph,
  generateTwitterCard,
  generateSocialMetadata,
  extractTwitterHandle,
  validateOpenGraph,
  validateTwitterCard,
  toNextMetadata,
};
