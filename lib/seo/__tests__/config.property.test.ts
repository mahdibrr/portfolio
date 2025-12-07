/**
 * Property-Based Tests for SEO Configuration
 * 
 * **Feature: seo-traffic-enhancement, Property 1: Schema Generation Validity (partial)**
 * **Validates: Requirements 1.1, 1.6**
 * 
 * Tests that any valid SEO configuration contains all required fields
 * for generating valid structured data schemas.
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { 
  seoConfig, 
  validateSEOConfig, 
  getSameAsLinks,
  getFullUrl,
  getSupportedLocales,
  getLanguageConfig
} from '../config';
import { 
  seoConfigArb, 
  partialSeoConfigArb,
  authorInfoArb,
  socialProfilesArb,
  geoTargetingArb
} from './arbitraries';

describe('SEO Config Property Tests', () => {
  /**
   * Property 1: Schema Generation Validity (partial)
   * For any valid SEO configuration, all required fields must be present
   */
  describe('Property 1: Schema Generation Validity', () => {
    it('valid config always contains all required fields for Person schema', () => {
      fc.assert(
        fc.property(seoConfigArb, (config) => {
          // Person schema requires: name, jobTitle, email, image
          expect(config.author.name).toBeTruthy();
          expect(config.author.jobTitle).toBeTruthy();
          expect(config.author.email).toBeTruthy();
          expect(config.author.image).toBeTruthy();
          
          // Person schema requires alumniOf for education
          expect(config.author.alumniOf).toBeDefined();
          expect(config.author.alumniOf.name).toBeTruthy();
          expect(config.author.alumniOf.degree).toBeTruthy();
          expect(config.author.alumniOf.field).toBeTruthy();
        }),
        { numRuns: 100 }
      );
    });


    it('valid config always has at least one social profile for sameAs links', () => {
      fc.assert(
        fc.property(seoConfigArb, (config) => {
          // At least one social profile must be present
          const hasProfile = 
            config.social.github || 
            config.social.linkedin || 
            config.social.twitter || 
            config.social.stackoverflow;
          expect(hasProfile).toBeTruthy();
        }),
        { numRuns: 100 }
      );
    });

    it('valid config always has at least one supported language', () => {
      fc.assert(
        fc.property(seoConfigArb, (config) => {
          expect(config.languages.length).toBeGreaterThan(0);
          
          // Each language must have required fields
          for (const lang of config.languages) {
            expect(lang.code).toBeTruthy();
            expect(lang.locale).toBeTruthy();
            expect(lang.name).toBeTruthy();
            expect(lang.hreflang).toBeTruthy();
            expect(['ltr', 'rtl']).toContain(lang.direction);
          }
        }),
        { numRuns: 100 }
      );
    });

    it('valid config always has geo targeting with primary region', () => {
      fc.assert(
        fc.property(seoConfigArb, (config) => {
          expect(config.geo.primaryRegion).toBeTruthy();
          expect(config.geo.timezone).toBeTruthy();
          expect(config.geo.targetRegions.length).toBeGreaterThan(0);
        }),
        { numRuns: 100 }
      );
    });

    it('valid config always has base URL and site metadata', () => {
      fc.assert(
        fc.property(seoConfigArb, (config) => {
          expect(config.baseUrl).toBeTruthy();
          expect(config.siteName).toBeTruthy();
          expect(config.defaultTitle).toBeTruthy();
          expect(config.defaultDescription).toBeTruthy();
        }),
        { numRuns: 100 }
      );
    });
  });

  describe('validateSEOConfig function', () => {
    it('returns true for any valid complete config', () => {
      fc.assert(
        fc.property(seoConfigArb, (config) => {
          expect(validateSEOConfig(config)).toBe(true);
        }),
        { numRuns: 100 }
      );
    });

    it('returns false when required fields are missing', () => {
      // Test with empty object
      expect(validateSEOConfig({})).toBe(false);
      
      // Test with partial configs missing required fields
      expect(validateSEOConfig({ baseUrl: 'https://example.com' })).toBe(false);
      expect(validateSEOConfig({ 
        baseUrl: 'https://example.com',
        siteName: 'Test'
      })).toBe(false);
    });
  });

  describe('Utility functions', () => {
    it('getSameAsLinks returns array of valid URLs for any config with social profiles', () => {
      // Test with default config
      const links = getSameAsLinks();
      expect(Array.isArray(links)).toBe(true);
      expect(links.length).toBeGreaterThan(0);
      
      // All links should be strings
      for (const link of links) {
        expect(typeof link).toBe('string');
        expect(link.length).toBeGreaterThan(0);
      }
    });

    it('getFullUrl always returns URL starting with base URL', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 0, maxLength: 50 }),
          (path) => {
            const fullUrl = getFullUrl(path);
            expect(fullUrl.startsWith(seoConfig.baseUrl)).toBe(true);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('getSupportedLocales returns non-empty array', () => {
      const locales = getSupportedLocales();
      expect(Array.isArray(locales)).toBe(true);
      expect(locales.length).toBeGreaterThan(0);
    });

    it('getLanguageConfig returns config for valid locale codes', () => {
      const locales = getSupportedLocales();
      for (const locale of locales) {
        const config = getLanguageConfig(locale);
        expect(config).toBeDefined();
        expect(config?.code).toBe(locale);
      }
    });

    it('getLanguageConfig returns undefined for invalid locale codes', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 5, maxLength: 10 }), // Generate strings unlikely to be valid locales
          (invalidCode) => {
            const locales = getSupportedLocales();
            if (!locales.includes(invalidCode)) {
              expect(getLanguageConfig(invalidCode)).toBeUndefined();
            }
          }
        ),
        { numRuns: 50 }
      );
    });
  });

  describe('Default seoConfig validation', () => {
    it('default config passes validation', () => {
      expect(validateSEOConfig(seoConfig)).toBe(true);
    });

    it('default config has all required Person schema fields', () => {
      expect(seoConfig.author.name).toBe('Mahdi Ben Rhouma');
      expect(seoConfig.author.jobTitle).toBe('Full-Stack Developer');
      expect(seoConfig.author.email).toBeTruthy();
      expect(seoConfig.author.image).toBeTruthy();
      expect(seoConfig.author.alumniOf.name).toBe('Sesame University');
    });

    it('default config has social profiles for sameAs', () => {
      expect(seoConfig.social.github).toBeTruthy();
      expect(seoConfig.social.linkedin).toBeTruthy();
    });

    it('default config has geo targeting for Tunisia', () => {
      expect(seoConfig.geo.primaryRegion).toBe('TN');
      expect(seoConfig.geo.timezone).toBe('Africa/Tunis');
    });
  });
});
