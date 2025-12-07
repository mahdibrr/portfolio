/**
 * Property-Based Tests for Canonical URL Generation
 * 
 * Tests universal properties that should hold for canonical URL generation.
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { 
  generateCanonicalUrl, 
  normalizeCanonicalUrl, 
  extractLocaleFromPath 
} from '../canonical';
import { seoConfig } from '../config';

// ============================================================================
// Property 8: Canonical URL Self-Reference
// ============================================================================

/**
 * Feature: seo-traffic-enhancement, Property 8: Canonical URL Self-Reference
 * 
 * For any page URL, the canonical link tag SHALL contain a URL that matches
 * the page's canonical URL (self-referencing).
 * 
 * Validates: Requirements 5.3
 */
describe('Property 8: Canonical URL Self-Reference', () => {
  
  it('generates canonical URLs that start with the base URL', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 0, maxLength: 50 }).filter(s => !s.includes('?') && !s.includes('#')),
        (path) => {
          const canonical = generateCanonicalUrl(path);
          expect(canonical).toContain(seoConfig.baseUrl);
          expect(canonical).toMatch(/^https?:\/\//);
        }
      ),
      { numRuns: 100 }
    );
  });
  
  it('generates canonical URLs without query parameters', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 30 }).filter(s => !s.includes('?') && !s.includes('#')),
        (path) => {
          const canonical = generateCanonicalUrl(path);
          expect(canonical).not.toContain('?');
        }
      ),
      { numRuns: 100 }
    );
  });
  
  it('generates canonical URLs without fragments', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 30 }).filter(s => !s.includes('?') && !s.includes('#')),
        (path) => {
          const canonical = generateCanonicalUrl(path);
          expect(canonical).not.toContain('#');
        }
      ),
      { numRuns: 100 }
    );
  });
  
  it('normalizes paths to start with forward slash', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 30 }).filter(s => !s.includes('?') && !s.includes('#') && s !== '/'),
        (path) => {
          const canonical = generateCanonicalUrl(path);
          const pathPart = canonical.replace(seoConfig.baseUrl, '');
          
          if (pathPart.length > 0) {
            expect(pathPart).toMatch(/^\//);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
  
  it('removes trailing slashes except for root path', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 2, maxLength: 30 }).filter(s => !s.includes('?') && !s.includes('#')),
        (path) => {
          const canonical = generateCanonicalUrl(path);
          const pathPart = canonical.replace(seoConfig.baseUrl, '');
          
          // If not root path, should not end with /
          if (pathPart !== '/') {
            expect(pathPart).not.toMatch(/\/$/);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
  
  it('includes locale prefix for non-default locales', () => {
    const nonDefaultLocales = seoConfig.languages
      .filter(lang => lang.code !== 'en')
      .map(lang => lang.code);
    
    fc.assert(
      fc.property(
        fc.constantFrom(...nonDefaultLocales),
        fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes('?') && !s.includes('#')),
        (locale, path) => {
          const canonical = generateCanonicalUrl(path, locale);
          expect(canonical).toContain(`/${locale}/`);
        }
      ),
      { numRuns: 50 }
    );
  });
  
  it('does not include locale prefix for default locale (en)', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes('?') && !s.includes('#') && !s.startsWith('/en')),
        (path) => {
          const canonical = generateCanonicalUrl(path, 'en');
          expect(canonical).not.toContain('/en/');
        }
      ),
      { numRuns: 100 }
    );
  });
  
  it('normalizes URLs by removing query parameters and fragments', () => {
    fc.assert(
      fc.property(
        fc.webUrl(),
        (url) => {
          const normalized = normalizeCanonicalUrl(url);
          expect(normalized).not.toContain('?');
          expect(normalized).not.toContain('#');
        }
      ),
      { numRuns: 100 }
    );
  });
  
  it('extracts correct locale from paths with locale prefixes', () => {
    const supportedLocales = seoConfig.languages.map(lang => lang.code);
    
    fc.assert(
      fc.property(
        fc.constantFrom(...supportedLocales.filter(l => l !== 'en')),
        fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes('?') && !s.includes('#')),
        (locale, path) => {
          const fullPath = `/${locale}/${path}`;
          const extracted = extractLocaleFromPath(fullPath);
          expect(extracted).toBe(locale);
        }
      ),
      { numRuns: 50 }
    );
  });
  
  it('returns default locale for paths without locale prefix', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 20 }).filter(s => 
          !s.includes('?') && 
          !s.includes('#') && 
          !s.startsWith('/fr') && 
          !s.startsWith('/ar')
        ),
        (path) => {
          const extracted = extractLocaleFromPath(path);
          expect(extracted).toBe('en');
        }
      ),
      { numRuns: 100 }
    );
  });
});

// ============================================================================
// Unit Tests for Canonical URL Generation
// ============================================================================

describe('Canonical URL generation - specific cases', () => {
  
  it('generates correct canonical URL for root path', () => {
    const canonical = generateCanonicalUrl('/');
    expect(canonical).toBe(`${seoConfig.baseUrl}/`);
  });
  
  it('generates correct canonical URL for about page', () => {
    const canonical = generateCanonicalUrl('/about');
    expect(canonical).toBe(`${seoConfig.baseUrl}/about`);
  });
  
  it('generates correct canonical URL with French locale', () => {
    const canonical = generateCanonicalUrl('/about', 'fr');
    expect(canonical).toBe(`${seoConfig.baseUrl}/fr/about`);
  });
  
  it('generates correct canonical URL with Arabic locale', () => {
    const canonical = generateCanonicalUrl('/contact', 'ar');
    expect(canonical).toBe(`${seoConfig.baseUrl}/ar/contact`);
  });
  
  it('handles paths without leading slash', () => {
    const canonical = generateCanonicalUrl('projects');
    expect(canonical).toBe(`${seoConfig.baseUrl}/projects`);
  });
  
  it('removes trailing slash from non-root paths', () => {
    const canonical = generateCanonicalUrl('/about/');
    expect(canonical).toBe(`${seoConfig.baseUrl}/about`);
  });
  
  it('normalizes URL with query parameters', () => {
    const url = `${seoConfig.baseUrl}/page?param=value`;
    const normalized = normalizeCanonicalUrl(url);
    expect(normalized).toBe(`${seoConfig.baseUrl}/page`);
  });
  
  it('normalizes URL with fragment', () => {
    const url = `${seoConfig.baseUrl}/page#section`;
    const normalized = normalizeCanonicalUrl(url);
    expect(normalized).toBe(`${seoConfig.baseUrl}/page`);
  });
  
  it('normalizes URL with both query and fragment', () => {
    const url = `${seoConfig.baseUrl}/page?param=value#section`;
    const normalized = normalizeCanonicalUrl(url);
    expect(normalized).toBe(`${seoConfig.baseUrl}/page`);
  });
  
  it('extracts French locale from path', () => {
    const locale = extractLocaleFromPath('/fr/about');
    expect(locale).toBe('fr');
  });
  
  it('extracts Arabic locale from path', () => {
    const locale = extractLocaleFromPath('/ar/contact');
    expect(locale).toBe('ar');
  });
  
  it('returns default locale for English path', () => {
    const locale = extractLocaleFromPath('/about');
    expect(locale).toBe('en');
  });
  
  it('returns default locale for root path', () => {
    const locale = extractLocaleFromPath('/');
    expect(locale).toBe('en');
  });
});
