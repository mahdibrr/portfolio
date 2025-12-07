/**
 * Property-Based Tests for Multi-language SEO Module
 * 
 * Tests universal properties that should hold across all valid inputs
 * for internationalization and localization features.
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import {
  generateHreflangTags,
  getLocalizedMetadata,
  isSupportedLocale,
  getDefaultLocale,
  getSupportedLocaleCodes,
  getLanguageConfig,
  getLanguageDirection,
  getAlternateLanguageUrls
} from '../i18n-seo';
import { seoConfig } from '../config';
import { nonEmptyStringArb, localeCodeArb } from './arbitraries';

// ============================================================================
// Property 4: Multi-language SEO Completeness
// ============================================================================

/**
 * Feature: seo-traffic-enhancement, Property 4: Multi-language SEO Completeness
 * 
 * For any page supporting multiple languages, the generated HTML SHALL include
 * valid hreflang tags for all supported locales, and the HTML lang attribute
 * SHALL match the current locale.
 * 
 * Validates: Requirements 3.1, 3.2, 3.3
 */
describe('Property 4: Multi-language SEO Completeness', () => {
  
  it('generates hreflang tags for all supported locales for any path', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('/', '/about', '/projects', '/contact', '/blog', '/skills'),
        (path) => {
          const tags = generateHreflangTags(path);
          
          // Should have tags for all supported languages plus x-default
          const expectedCount = seoConfig.languages.length + 1; // +1 for x-default
          expect(tags.length).toBe(expectedCount);
          
          // Should include a tag for each supported language
          for (const language of seoConfig.languages) {
            const tag = tags.find(t => t.hreflang === language.hreflang);
            expect(tag).toBeDefined();
            expect(tag?.href).toContain(seoConfig.baseUrl);
          }
          
          // Should include x-default tag
          const xDefaultTag = tags.find(t => t.hreflang === 'x-default');
          expect(xDefaultTag).toBeDefined();
          expect(xDefaultTag?.href).toContain(seoConfig.baseUrl);
        }
      ),
      { numRuns: 100 }
    );
  });
  
  it('generates valid href URLs for all hreflang tags', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('/', '/about', '/projects', '/contact'),
        (path) => {
          const tags = generateHreflangTags(path);
          
          // All hrefs should be valid URLs starting with baseUrl
          for (const tag of tags) {
            expect(tag.href).toMatch(/^https?:\/\//);
            expect(tag.href).toContain(seoConfig.baseUrl);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
  
  it('includes correct hreflang values for all supported locales', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('/', '/about', '/projects'),
        (path) => {
          const tags = generateHreflangTags(path);
          
          // Check that hreflang values match language configs
          for (const language of seoConfig.languages) {
            const tag = tags.find(t => t.hreflang === language.hreflang);
            expect(tag).toBeDefined();
            expect(tag?.hreflang).toBe(language.hreflang);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
  
  it('generates localized metadata with correct locale for any supported locale', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('en', 'fr', 'ar'),
        fc.constantFrom('home', 'about', 'projects', 'contact'),
        (locale, page) => {
          const metadata = getLocalizedMetadata(locale, page);
          
          // Should have all required fields
          expect(metadata.title).toBeTruthy();
          expect(metadata.description).toBeTruthy();
          expect(metadata.locale).toBeTruthy();
          expect(metadata.lang).toBeTruthy();
          expect(metadata.direction).toMatch(/^(ltr|rtl)$/);
          
          // Lang should match the requested locale
          expect(metadata.lang).toBe(locale);
          
          // Should have alternates
          expect(metadata.alternates).toBeDefined();
          expect(metadata.alternates?.canonical).toBeTruthy();
          expect(metadata.alternates?.languages).toBeDefined();
        }
      ),
      { numRuns: 100 }
    );
  });
  
  it('includes alternate language URLs for all supported locales', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('en', 'fr', 'ar'),
        fc.constantFrom('home', 'about', 'projects'),
        (locale, page) => {
          const metadata = getLocalizedMetadata(locale, page);
          
          // Should have alternate URLs for all supported languages
          const alternateLanguages = metadata.alternates?.languages;
          expect(alternateLanguages).toBeDefined();
          
          for (const language of seoConfig.languages) {
            expect(alternateLanguages).toHaveProperty(language.code);
            expect(alternateLanguages?.[language.code]).toContain(seoConfig.baseUrl);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
  
  it('sets correct language direction for RTL and LTR locales', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('en', 'fr', 'ar'),
        (locale) => {
          const metadata = getLocalizedMetadata(locale, 'home');
          const languageConfig = seoConfig.languages.find(l => l.code === locale);
          
          // Direction should match the language config
          expect(metadata.direction).toBe(languageConfig?.direction);
          
          // Arabic should be RTL, others LTR
          if (locale === 'ar') {
            expect(metadata.direction).toBe('rtl');
          } else {
            expect(metadata.direction).toBe('ltr');
          }
        }
      ),
      { numRuns: 100 }
    );
  });
  
  it('generates canonical URL that includes locale prefix for non-default locales', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('en', 'fr', 'ar'),
        fc.constantFrom('home', 'about', 'projects'),
        (locale, page) => {
          const metadata = getLocalizedMetadata(locale, page);
          const canonical = metadata.alternates?.canonical;
          
          expect(canonical).toBeTruthy();
          expect(canonical).toContain(seoConfig.baseUrl);
          
          // Non-English locales should have locale prefix
          if (locale !== 'en') {
            expect(canonical).toContain(`/${locale}`);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});

// ============================================================================
// Additional Utility Function Tests
// ============================================================================

describe('i18n-seo utility functions', () => {
  
  it('correctly identifies supported locales', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('en', 'fr', 'ar'),
        (locale) => {
          expect(isSupportedLocale(locale)).toBe(true);
        }
      ),
      { numRuns: 50 }
    );
  });
  
  it('correctly identifies unsupported locales', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('de', 'es', 'it', 'pt', 'zh', 'ja'),
        (locale) => {
          // These are not in our supported locales
          const isSupported = isSupportedLocale(locale);
          // Only check if it's actually not in the config
          const actuallySupported = seoConfig.languages.some(l => l.code === locale);
          expect(isSupported).toBe(actuallySupported);
        }
      ),
      { numRuns: 50 }
    );
  });
  
  it('returns correct language direction for any supported locale', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('en', 'fr', 'ar'),
        (locale) => {
          const direction = getLanguageDirection(locale);
          expect(direction).toMatch(/^(ltr|rtl)$/);
          
          // Arabic should be RTL
          if (locale === 'ar') {
            expect(direction).toBe('rtl');
          }
        }
      ),
      { numRuns: 50 }
    );
  });
  
  it('returns all supported locale codes', () => {
    const codes = getSupportedLocaleCodes();
    
    expect(codes).toContain('en');
    expect(codes).toContain('fr');
    expect(codes).toContain('ar');
    expect(codes.length).toBe(seoConfig.languages.length);
  });
  
  it('returns default locale', () => {
    const defaultLocale = getDefaultLocale();
    
    expect(defaultLocale).toBeTruthy();
    expect(isSupportedLocale(defaultLocale)).toBe(true);
  });
  
  it('generates alternate language URLs for all supported locales', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('/', '/about', '/projects', '/contact'),
        (path) => {
          const alternates = getAlternateLanguageUrls(path);
          
          // Should have URLs for all supported languages
          for (const language of seoConfig.languages) {
            expect(alternates).toHaveProperty(language.code);
            expect(alternates[language.code]).toContain(seoConfig.baseUrl);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
