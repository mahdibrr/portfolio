/**
 * Property-Based Tests for Social Metadata Module
 * 
 * **Feature: seo-traffic-enhancement, Property 2: Social Metadata Completeness**
 * **Validates: Requirements 2.1, 2.2, 2.3, 2.6**
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import {
  generateOpenGraph,
  generateTwitterCard,
  generateSocialMetadata,
  validateOpenGraph,
  validateTwitterCard,
  extractTwitterHandle,
  OG_IMAGE_WIDTH,
  OG_IMAGE_HEIGHT,
  TWITTER_MAX_DESCRIPTION,
} from '../social';
import { seoConfigArb, pageConfigArb } from './arbitraries';

describe('Social Metadata - Property 2: Social Metadata Completeness', () => {
  /**
   * **Feature: seo-traffic-enhancement, Property 2: Social Metadata Completeness**
   * **Validates: Requirements 2.1, 2.2, 2.3, 2.6**
   * 
   * Test that any page config produces complete OG and Twitter metadata
   * with all required attributes.
   */
  describe('Open Graph Metadata Generation', () => {
    it('generates valid OG metadata with all required fields for any valid config', () => {
      fc.assert(
        fc.property(
          seoConfigArb,
          pageConfigArb,
          (config, pageConfig) => {
            const og = generateOpenGraph(pageConfig, config);
            
            // Verify all required OG fields are present
            expect(og.title).toBeTruthy();
            expect(og.description).toBeTruthy();
            expect(og.url).toBeTruthy();
            expect(og.siteName).toBeTruthy();
            expect(og.locale).toBeTruthy();
            expect(og.type).toBeTruthy();
            expect(og.images).toBeDefined();
            expect(og.images.length).toBeGreaterThanOrEqual(1);
            
            // Verify image has required properties
            const image = og.images[0];
            expect(image.url).toBeTruthy();
            expect(image.width).toBe(OG_IMAGE_WIDTH);
            expect(image.height).toBe(OG_IMAGE_HEIGHT);
            expect(image.alt).toBeTruthy();
          }
        ),
        { numRuns: 100 }
      );
    });

    it('generates valid URL format for og:url', () => {
      fc.assert(
        fc.property(
          seoConfigArb,
          pageConfigArb,
          (config, pageConfig) => {
            const og = generateOpenGraph(pageConfig, config);
            
            // URL should be a valid URL starting with http(s)
            expect(og.url).toMatch(/^https?:\/\//);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('generates valid image URL format', () => {
      fc.assert(
        fc.property(
          seoConfigArb,
          pageConfigArb,
          (config, pageConfig) => {
            const og = generateOpenGraph(pageConfig, config);
            
            // Image URL should be a valid URL
            expect(og.images[0].url).toMatch(/^https?:\/\//);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('passes validation for any generated OG metadata', () => {
      fc.assert(
        fc.property(
          seoConfigArb,
          pageConfigArb,
          (config, pageConfig) => {
            const og = generateOpenGraph(pageConfig, config);
            
            // Generated metadata should always pass validation
            expect(validateOpenGraph(og)).toBe(true);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('includes alternate locales when multiple unique languages are configured', () => {
      fc.assert(
        fc.property(
          seoConfigArb.filter(c => {
            // Filter to configs with multiple unique locales
            const uniqueLocales = new Set(c.languages.map(l => l.locale));
            return uniqueLocales.size > 1;
          }),
          pageConfigArb,
          (config, pageConfig) => {
            const og = generateOpenGraph(pageConfig, config);
            
            // Get unique locales excluding the current one
            const uniqueAlternates = new Set(
              config.languages.map(l => l.locale).filter(l => l !== og.locale)
            );
            
            // Should have alternate locales if there are unique alternates
            if (uniqueAlternates.size > 0) {
              expect(og.alternateLocale).toBeDefined();
              // Alternate locales should not include the current locale
              expect(og.alternateLocale).not.toContain(og.locale);
            }
          }
        ),
        { numRuns: 50 }
      );
    });
  });

  describe('Twitter Card Metadata Generation', () => {
    it('generates valid Twitter Card metadata with all required fields for any valid config', () => {
      fc.assert(
        fc.property(
          seoConfigArb,
          pageConfigArb,
          (config, pageConfig) => {
            const twitter = generateTwitterCard(pageConfig, config);
            
            // Verify all required Twitter Card fields are present
            expect(twitter.card).toBe('summary_large_image');
            expect(twitter.title).toBeTruthy();
            expect(twitter.description).toBeTruthy();
            expect(twitter.images).toBeDefined();
            expect(twitter.images.length).toBeGreaterThanOrEqual(1);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('truncates description to max length', () => {
      fc.assert(
        fc.property(
          seoConfigArb,
          pageConfigArb,
          (config, pageConfig) => {
            const twitter = generateTwitterCard(pageConfig, config);
            
            // Description should not exceed max length
            expect(twitter.description.length).toBeLessThanOrEqual(TWITTER_MAX_DESCRIPTION);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('generates valid image URL format', () => {
      fc.assert(
        fc.property(
          seoConfigArb,
          pageConfigArb,
          (config, pageConfig) => {
            const twitter = generateTwitterCard(pageConfig, config);
            
            // Image URL should be a valid URL
            expect(twitter.images[0]).toMatch(/^https?:\/\//);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('passes validation for any generated Twitter Card metadata', () => {
      fc.assert(
        fc.property(
          seoConfigArb,
          pageConfigArb,
          (config, pageConfig) => {
            const twitter = generateTwitterCard(pageConfig, config);
            
            // Generated metadata should always pass validation
            expect(validateTwitterCard(twitter)).toBe(true);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Combined Social Metadata Generation', () => {
    it('generates both OG and Twitter metadata for any valid config', () => {
      fc.assert(
        fc.property(
          seoConfigArb,
          pageConfigArb,
          (config, pageConfig) => {
            const social = generateSocialMetadata(pageConfig, config);
            
            // Both OG and Twitter should be present
            expect(social.openGraph).toBeDefined();
            expect(social.twitter).toBeDefined();
            
            // Both should pass validation
            expect(validateOpenGraph(social.openGraph)).toBe(true);
            expect(validateTwitterCard(social.twitter)).toBe(true);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('maintains consistency between OG and Twitter titles', () => {
      fc.assert(
        fc.property(
          seoConfigArb,
          pageConfigArb,
          (config, pageConfig) => {
            const social = generateSocialMetadata(pageConfig, config);
            
            // Titles should be the same
            expect(social.openGraph.title).toBe(social.twitter.title);
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});

describe('Twitter Handle Extraction', () => {
  it('extracts handle from twitter.com URLs', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 3, maxLength: 15 }).filter(s => /^[a-zA-Z0-9_]+$/.test(s)),
        (username) => {
          const url = `https://twitter.com/${username}`;
          const handle = extractTwitterHandle(url);
          
          expect(handle).toBe(`@${username}`);
        }
      ),
      { numRuns: 50 }
    );
  });

  it('extracts handle from x.com URLs', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 3, maxLength: 15 }).filter(s => /^[a-zA-Z0-9_]+$/.test(s)),
        (username) => {
          const url = `https://x.com/${username}`;
          const handle = extractTwitterHandle(url);
          
          expect(handle).toBe(`@${username}`);
        }
      ),
      { numRuns: 50 }
    );
  });

  it('returns handle as-is if already prefixed with @', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 3, maxLength: 15 }).filter(s => /^[a-zA-Z0-9_]+$/.test(s)),
        (username) => {
          const handle = extractTwitterHandle(`@${username}`);
          
          expect(handle).toBe(`@${username}`);
        }
      ),
      { numRuns: 50 }
    );
  });

  it('returns undefined for empty or invalid input', () => {
    expect(extractTwitterHandle('')).toBeUndefined();
    expect(extractTwitterHandle('not-a-url')).toBeUndefined();
  });
});
