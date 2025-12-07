/**
 * Geo-Targeting Module
 * Generates geographic targeting meta tags for regional SEO
 * 
 * Requirements: 3.5, 3.6, 8.1
 */

import { seoConfig } from './config';

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Geographic meta tag
 */
export interface GeoMetaTag {
  name: string;
  content: string;
}

// ============================================================================
// Geo-Targeting Meta Tags Generation
// ============================================================================

/**
 * Generate geo-targeting meta tags for regional SEO
 * 
 * Includes geo.region, geo.placename, and regional targeting information
 * for Tunisia, France, and MENA countries.
 * 
 * @returns Array of geo-targeting meta tags
 * 
 * Requirements: 3.5, 3.6, 8.1
 */
export function generateGeoTargetingTags(): GeoMetaTag[] {
  const tags: GeoMetaTag[] = [];
  
  // Primary region (Tunisia)
  tags.push({
    name: 'geo.region',
    content: seoConfig.geo.primaryRegion
  });
  
  // Placename (city/location)
  if (seoConfig.geo.placename) {
    tags.push({
      name: 'geo.placename',
      content: seoConfig.geo.placename
    });
  }
  
  // Geographic position (Tunis coordinates)
  tags.push({
    name: 'geo.position',
    content: '36.8065;10.1815' // Tunis, Tunisia coordinates
  });
  
  tags.push({
    name: 'ICBM',
    content: '36.8065, 10.1815' // Alternative format for geo coordinates
  });
  
  // Target regions for international reach
  tags.push({
    name: 'geo.target',
    content: seoConfig.geo.targetRegions.join(', ')
  });
  
  return tags;
}

/**
 * Get geo-targeting meta tags as HTML meta elements
 * 
 * @returns Array of meta tag objects suitable for Next.js metadata
 */
export function getGeoMetaTags(): Array<{ name: string; content: string }> {
  return generateGeoTargetingTags();
}

/**
 * Get regional targeting description
 * 
 * @returns Human-readable description of target regions
 */
export function getRegionalTargetingDescription(): string {
  const regions = seoConfig.geo.targetRegions;
  const regionNames: Record<string, string> = {
    'TN': 'Tunisia',
    'FR': 'France',
    'BE': 'Belgium',
    'CH': 'Switzerland',
    'CA': 'Canada',
    'AE': 'United Arab Emirates',
    'SA': 'Saudi Arabia',
    'MA': 'Morocco',
    'DZ': 'Algeria',
    'EG': 'Egypt',
    'QA': 'Qatar',
    'KW': 'Kuwait',
    'BH': 'Bahrain',
    'OM': 'Oman',
    'JO': 'Jordan',
    'LB': 'Lebanon'
  };
  
  const names = regions.map(code => regionNames[code] || code);
  
  if (names.length === 0) return '';
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  
  const lastRegion = names[names.length - 1];
  const otherRegions = names.slice(0, -1).join(', ');
  
  return `${otherRegions}, and ${lastRegion}`;
}

/**
 * Check if a region code is in the target regions
 * 
 * @param regionCode - ISO 3166-1 alpha-2 region code
 * @returns True if the region is targeted
 */
export function isTargetRegion(regionCode: string): boolean {
  return seoConfig.geo.targetRegions.includes(regionCode.toUpperCase());
}

/**
 * Get timezone information
 * 
 * @returns Timezone string
 */
export function getTimezone(): string {
  return seoConfig.geo.timezone;
}

/**
 * Get primary region code
 * 
 * @returns Primary region ISO code
 */
export function getPrimaryRegion(): string {
  return seoConfig.geo.primaryRegion;
}

/**
 * Get all target region codes
 * 
 * @returns Array of target region codes
 */
export function getTargetRegions(): string[] {
  return seoConfig.geo.targetRegions;
}
