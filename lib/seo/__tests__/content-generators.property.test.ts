/**
 * Property-Based Tests for Content Generators
 * 
 * Tests SEO content generators using property-based testing
 * to ensure correctness across a wide range of inputs.
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import {
  generatePageTitle,
  generateMetaDescription,
  validateTitle,
  validateMetaDescription,
} from '../content-generators';
import {
  pageTitleConfigArb,
  metaDescriptionConfigArb,
  nonEmptyStringArb,
} from './arbitraries';

/**
 * Feature: seo-traffic-enhancement, Property 12: Page Title Format
 * 
 * For any page, the title tag SHALL follow the format pattern containing 
 * the page name, separator, and site name, with total length between 30-60 characters.
 * 
 * Validates: Requirements 6.4
 */
describe('Property 12: Page Title Format', () => {
  it('generates titles within 30-60 character range', () => {
    fc.assert(
      fc.property(pageTitleConfigArb, (config) => {
        const title = generatePageTitle(config);
        
        // Title should be within optimal SEO length
        expect(title.length).toBeGreaterThanOrEqual(30);
        expect(title.length).toBeLessThanOrEqual(60);
      }),
      { numRuns: 100 }
    );
  });

  it('includes separator when both page name and site name are provided', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 5, maxLength: 20 }),
        fc.string({ minLength: 5, maxLength: 20 }),
        fc.constantFrom('|', '-', '•'),
        (pageName, siteName, separator) => {
          const title = generatePageTitle({
            pageName,
            siteName,
            separator,
            includeJobTitle: false
          });
          
          // Should include the separator
          expect(title).toContain(separator);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('validates generated titles pass validation', () => {
    fc.assert(
      fc.property(pageTitleConfigArb, (config) => {
        const title = generatePageTitle(config);
        const validation = validateTitle(title);
        
        // Generated titles should always be valid
        expect(validation.valid).toBe(true);
        expect(validation.errors).toHaveLength(0);
      }),
      { numRuns: 100 }
    );
  });

  it('includes site name when provided', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 5, maxLength: 20 }).filter(s => s.trim().length >= 5),
        (siteName) => {
          const title = generatePageTitle({
            siteName,
            includeJobTitle: false
          });
          
          // Should include the site name (trimmed)
          expect(title).toContain(siteName.trim());
        }
      ),
      { numRuns: 100 }
    );
  });

  it('includes job title when includeJobTitle is true', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 10, maxLength: 25 }).filter(s => s.trim().length >= 10),
        (jobTitle) => {
          const title = generatePageTitle({
            siteName: 'Test Site',
            includeJobTitle: true,
            jobTitle
          });
          
          // Should include the job title (trimmed)
          expect(title).toContain(jobTitle.trim());
        }
      ),
      { numRuns: 100 }
    );
  });

  it('handles truncation gracefully for long titles', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 30, maxLength: 50 }),
        fc.string({ minLength: 30, maxLength: 50 }),
        (pageName, siteName) => {
          const title = generatePageTitle({
            pageName,
            siteName,
            includeJobTitle: true,
            jobTitle: 'Full-Stack Developer'
          });
          
          // Should be truncated to max length
          expect(title.length).toBeLessThanOrEqual(60);
          
          // If truncated, should end with ellipsis
          if (title.endsWith('...')) {
            expect(title.length).toBeLessThanOrEqual(60);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});

/**
 * Feature: seo-traffic-enhancement, Property 13: Meta Description Length
 * 
 * For any page, the meta description SHALL contain between 150-160 characters 
 * and include at least one primary keyword.
 * 
 * Validates: Requirements 6.5
 */
describe('Property 13: Meta Description Length', () => {
  it('generates descriptions within 150-160 character range', () => {
    fc.assert(
      fc.property(metaDescriptionConfigArb, (config) => {
        const description = generateMetaDescription(config);
        
        // Description should be within optimal SEO length
        expect(description.length).toBeGreaterThanOrEqual(150);
        expect(description.length).toBeLessThanOrEqual(160);
      }),
      { numRuns: 100 }
    );
  });

  it('validates generated descriptions pass validation', () => {
    fc.assert(
      fc.property(metaDescriptionConfigArb, (config) => {
        const description = generateMetaDescription(config);
        const validation = validateMetaDescription(description, config.keywords);
        
        // Generated descriptions should always be valid
        expect(validation.valid).toBe(true);
        expect(validation.errors).toHaveLength(0);
      }),
      { numRuns: 100 }
    );
  });

  it('includes at least one keyword when keywords are provided', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 100, maxLength: 140 }).filter(s => {
          const normalized = s.trim().replace(/\s+/g, ' ');
          return normalized.length >= 50;
        }),
        fc.array(
          fc.string({ minLength: 3, maxLength: 20 }).filter(s => {
            const normalized = s.trim().replace(/\s+/g, ' ');
            return normalized.length >= 3;
          }),
          { minLength: 1, maxLength: 3 }
        ),
        (content, keywords) => {
          const description = generateMetaDescription({
            content,
            keywords
          });
          
          // Should include at least one keyword (trimmed and normalized)
          const cleanKeywords = keywords.map(k => k.trim().replace(/\s+/g, ' '));
          const hasKeyword = cleanKeywords.some(
            keyword => description.toLowerCase().includes(keyword.toLowerCase())
          );
          
          expect(hasKeyword).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('handles short content by padding appropriately', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 50, maxLength: 100 }),
        fc.array(nonEmptyStringArb, { minLength: 1, maxLength: 3 }),
        (content, keywords) => {
          const description = generateMetaDescription({
            content,
            keywords
          });
          
          // Should be padded to minimum length
          expect(description.length).toBeGreaterThanOrEqual(150);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('handles long content by truncating appropriately', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 200, maxLength: 300 }),
        (content) => {
          const description = generateMetaDescription({
            content
          });
          
          // Should be truncated to maximum length
          expect(description.length).toBeLessThanOrEqual(160);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('preserves content meaning when truncating', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 200, maxLength: 300 }),
        (content) => {
          const description = generateMetaDescription({
            content
          });
          
          // If truncated, should end with ellipsis or period
          if (description.length === 160 || description.endsWith('...')) {
            expect(description.endsWith('...') || description.endsWith('.')).toBe(true);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
