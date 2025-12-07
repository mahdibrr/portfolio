/**
 * Property-Based Tests for Content Validation
 * 
 * Tests SEO content validation utilities using property-based testing
 * to ensure correctness across a wide range of inputs.
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import {
  validateHeadingHierarchy,
  validateAltText,
  validateAnchorText,
} from '../content-validation';
import {
  validHeadingHierarchyArb,
  invalidHeadingHierarchyArb,
  htmlWithValidImagesArb,
  htmlWithValidLinksArb,
} from './arbitraries';

/**
 * Feature: seo-traffic-enhancement, Property 9: Heading Hierarchy Validity
 * 
 * For any rendered page content, the heading elements (h1-h6) SHALL follow 
 * a valid hierarchy where no heading level is skipped.
 * 
 * Validates: Requirements 6.1
 */
describe('Property 9: Heading Hierarchy Validity', () => {
  it('validates that valid heading hierarchies pass validation', () => {
    fc.assert(
      fc.property(validHeadingHierarchyArb, (html) => {
        const result = validateHeadingHierarchy(html);
        
        // Valid hierarchies should pass validation
        expect(result.valid).toBe(true);
        expect(result.errors).toHaveLength(0);
      }),
      { numRuns: 100 }
    );
  });

  it('detects invalid heading hierarchies with skipped levels', () => {
    fc.assert(
      fc.property(invalidHeadingHierarchyArb, (html) => {
        const result = validateHeadingHierarchy(html);
        
        // Invalid hierarchies should fail validation
        expect(result.valid).toBe(false);
        expect(result.errors.length).toBeGreaterThan(0);
      }),
      { numRuns: 100 }
    );
  });

  it('ensures first heading is always h1 in valid hierarchies', () => {
    fc.assert(
      fc.property(validHeadingHierarchyArb, (html) => {
        const firstHeadingMatch = html.match(/<h([1-6])/);
        
        if (firstHeadingMatch) {
          const firstLevel = parseInt(firstHeadingMatch[1], 10);
          expect(firstLevel).toBe(1);
        }
      }),
      { numRuns: 100 }
    );
  });

  it('detects when first heading is not h1', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 2, max: 6 }),
        fc.string({ minLength: 1, maxLength: 50 }),
        (level, content) => {
          const html = `<h${level}>${content}</h${level}>`;
          const result = validateHeadingHierarchy(html);
          
          expect(result.valid).toBe(false);
          expect(result.errors.some(e => e.includes('First heading should be h1'))).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });
});

/**
 * Feature: seo-traffic-enhancement, Property 10: Image Alt Text Presence
 * 
 * For any image element in the rendered output, the alt attribute SHALL 
 * be present and contain non-empty descriptive text.
 * 
 * Validates: Requirements 6.2
 */
describe('Property 10: Image Alt Text Presence', () => {
  it('validates that all images with alt text pass validation', () => {
    fc.assert(
      fc.property(htmlWithValidImagesArb, (html) => {
        const result = validateAltText(html);
        
        // All images with valid alt text should pass
        expect(result.valid).toBe(true);
        expect(result.errors).toHaveLength(0);
      }),
      { numRuns: 100 }
    );
  });

  it('detects images without alt attributes', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 50 }),
        (src) => {
          const html = `<img src="${src}" />`;
          const result = validateAltText(html);
          
          expect(result.valid).toBe(false);
          expect(result.errors.some(e => e.includes('missing alt attribute'))).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('detects images with empty alt text', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 50 }).filter(s => !s.includes('"') && !s.includes('<') && !s.includes('>')),
        (src) => {
          const html = `<img src="${src}" alt="" />`;
          const result = validateAltText(html);
          
          expect(result.valid).toBe(false);
          expect(result.errors.some(e => e.includes('empty alt text'))).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('accepts HTML with no images', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 0, maxLength: 100 }).filter(s => !s.includes('<img')),
        (html) => {
          const result = validateAltText(html);
          
          // No images means validation passes
          expect(result.valid).toBe(true);
          expect(result.errors).toHaveLength(0);
        }
      ),
      { numRuns: 100 }
    );
  });
});

/**
 * Feature: seo-traffic-enhancement, Property 11: Anchor Text Quality
 * 
 * For any internal link element, the anchor text SHALL NOT be a generic 
 * phrase and SHALL contain descriptive text.
 * 
 * Validates: Requirements 6.3
 */
describe('Property 11: Anchor Text Quality', () => {
  it('validates that descriptive anchor text passes validation', () => {
    fc.assert(
      fc.property(htmlWithValidLinksArb, (html) => {
        const result = validateAnchorText(html);
        
        // Descriptive anchor text should pass
        expect(result.valid).toBe(true);
        expect(result.errors).toHaveLength(0);
      }),
      { numRuns: 100 }
    );
  });

  it('detects generic anchor text phrases', () => {
    const genericPhrases = ['click here', 'read more', 'link', 'here', 'more'];
    
    fc.assert(
      fc.property(
        fc.constantFrom(...genericPhrases),
        fc.constantFrom('/', '/about', '/projects', '/contact'),
        (phrase, href) => {
          const html = `<a href="${href}">${phrase}</a>`;
          const result = validateAnchorText(html);
          
          expect(result.valid).toBe(false);
          expect(result.errors.some(e => e.includes('generic anchor text'))).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('detects links with empty anchor text', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('/', '/about', '/projects', '/contact'),
        (href) => {
          const html = `<a href="${href}"></a>`;
          const result = validateAnchorText(html);
          
          expect(result.valid).toBe(false);
          expect(result.errors.some(e => e.includes('no anchor text'))).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('ignores external links in validation', () => {
    fc.assert(
      fc.property(
        fc.webUrl(),
        fc.constantFrom('click here', 'read more', 'link'),
        (url, phrase) => {
          const html = `<a href="${url}">${phrase}</a>`;
          const result = validateAnchorText(html);
          
          // External links are not validated, so should pass
          expect(result.valid).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('ignores anchor links and special protocols', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('#section', 'mailto:test@example.com', 'tel:+1234567890'),
        fc.constantFrom('click here', 'read more'),
        (href, phrase) => {
          const html = `<a href="${href}">${phrase}</a>`;
          const result = validateAnchorText(html);
          
          // Special protocols are not validated
          expect(result.valid).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });
});
