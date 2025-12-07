/**
 * Property-Based Tests for Sitemap Generation
 * 
 * Tests universal properties that should hold for sitemap generation
 * with multi-language support.
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import sitemap from '@/app/sitemap';
import { seoConfig } from '../config';

// ============================================================================
// Property 5: Sitemap Alternate URLs
// ============================================================================

/**
 * Feature: seo-traffic-enhancement, Property 5: Sitemap Alternate URLs
 * 
 * For any page with multiple language versions, the generated sitemap SHALL
 * include alternate language URLs with correct hreflang annotations for each
 * supported locale.
 * 
 * Validates: Requirements 3.4
 */
describe('Property 5: Sitemap Alternate URLs', () => {
  
  it('includes alternate language URLs for all supported locales in every entry', () => {
    const sitemapEntries = sitemap();
    
    // Every entry should have alternates
    for (const entry of sitemapEntries) {
      expect(entry.alternates).toBeDefined();
      expect(entry.alternates?.languages).toBeDefined();
      
      const languages = entry.alternates?.languages;
      
      // Should have URLs for all supported languages
      for (const language of seoConfig.languages) {
        expect(languages).toHaveProperty(language.hreflang);
        expect(languages?.[language.hreflang]).toContain(seoConfig.baseUrl);
        expect(languages?.[language.hreflang]).toMatch(/^https?:\/\//);
      }
    }
  });
  
  it('generates valid URLs for all alternate languages', () => {
    const sitemapEntries = sitemap();
    
    for (const entry of sitemapEntries) {
      const languages = entry.alternates?.languages;
      
      if (languages) {
        for (const [hreflang, url] of Object.entries(languages)) {
          // URL should be valid
          expect(url).toMatch(/^https?:\/\//);
          expect(url).toContain(seoConfig.baseUrl);
          
          // URL should not have double slashes (except after protocol)
          const pathPart = url.replace(/^https?:\/\//, '');
          expect(pathPart).not.toMatch(/\/\//);
        }
      }
    }
  });
  
  it('includes correct hreflang values matching language config', () => {
    const sitemapEntries = sitemap();
    
    for (const entry of sitemapEntries) {
      const languages = entry.alternates?.languages;
      
      if (languages) {
        // Check that all hreflang values are from our supported languages
        for (const hreflang of Object.keys(languages)) {
          const isSupported = seoConfig.languages.some(
            lang => lang.hreflang === hreflang
          );
          expect(isSupported).toBe(true);
        }
      }
    }
  });
  
  it('includes all required sitemap fields for every entry', () => {
    const sitemapEntries = sitemap();
    
    expect(sitemapEntries.length).toBeGreaterThan(0);
    
    for (const entry of sitemapEntries) {
      // Required fields
      expect(entry.url).toBeTruthy();
      expect(entry.url).toMatch(/^https?:\/\//);
      
      // lastModified should be a valid date
      expect(entry.lastModified).toBeInstanceOf(Date);
      
      // changeFrequency should be valid
      const validFrequencies = [
        'always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'
      ];
      expect(validFrequencies).toContain(entry.changeFrequency);
      
      // priority should be between 0 and 1
      expect(entry.priority).toBeGreaterThanOrEqual(0);
      expect(entry.priority).toBeLessThanOrEqual(1);
    }
  });
  
  it('generates consistent alternate URLs across all entries for the same logical page', () => {
    const sitemapEntries = sitemap();
    
    // Group entries by their base path (without language prefix)
    const entriesByBasePath = new Map<string, typeof sitemapEntries>();
    
    for (const entry of sitemapEntries) {
      // Extract base path by removing language prefixes
      let basePath = entry.url.replace(seoConfig.baseUrl, '');
      
      // Remove language prefix if present
      for (const language of seoConfig.languages) {
        if (language.code !== 'en' && basePath.startsWith(`/${language.code}`)) {
          basePath = basePath.substring(`/${language.code}`.length);
          break;
        }
      }
      
      if (!entriesByBasePath.has(basePath)) {
        entriesByBasePath.set(basePath, []);
      }
      entriesByBasePath.get(basePath)?.push(entry);
    }
    
    // For each group, verify all entries have the same alternates
    for (const [basePath, entries] of entriesByBasePath) {
      if (entries.length > 1) {
        const firstAlternates = entries[0].alternates?.languages;
        
        for (let i = 1; i < entries.length; i++) {
          const currentAlternates = entries[i].alternates?.languages;
          
          // Should have the same set of language keys
          expect(Object.keys(currentAlternates || {})).toEqual(
            Object.keys(firstAlternates || {})
          );
          
          // Should have the same URLs for each language
          for (const lang of Object.keys(firstAlternates || {})) {
            expect(currentAlternates?.[lang]).toBe(firstAlternates?.[lang]);
          }
        }
      }
    }
  });
  
  it('includes entries for all supported languages', () => {
    const sitemapEntries = sitemap();
    
    // Count entries per language
    const entriesPerLanguage = new Map<string, number>();
    
    for (const language of seoConfig.languages) {
      entriesPerLanguage.set(language.code, 0);
    }
    
    for (const entry of sitemapEntries) {
      const url = entry.url.replace(seoConfig.baseUrl, '');
      
      // Check which language this entry is for
      let foundLanguage = 'en'; // default
      
      for (const language of seoConfig.languages) {
        if (language.code !== 'en' && url.startsWith(`/${language.code}`)) {
          foundLanguage = language.code;
          break;
        }
      }
      
      entriesPerLanguage.set(
        foundLanguage,
        (entriesPerLanguage.get(foundLanguage) || 0) + 1
      );
    }
    
    // Each language should have at least one entry
    for (const language of seoConfig.languages) {
      const count = entriesPerLanguage.get(language.code) || 0;
      expect(count).toBeGreaterThan(0);
    }
  });
});

// ============================================================================
// Property 7: Sitemap Entry Integrity
// ============================================================================

/**
 * Feature: seo-traffic-enhancement, Property 7: Sitemap Entry Integrity
 * 
 * For any content page with a modification date, the generated sitemap entry
 * SHALL include a lastmod date that reflects the actual content modification
 * date, and priority SHALL be a valid value between 0.0 and 1.0.
 * 
 * Validates: Requirements 5.1, 13.1
 */
describe('Property 7: Sitemap Entry Integrity', () => {
  
  it('all entries have valid lastmod dates', () => {
    const sitemapEntries = sitemap();
    
    expect(sitemapEntries.length).toBeGreaterThan(0);
    
    for (const entry of sitemapEntries) {
      // lastModified must be present
      expect(entry.lastModified).toBeDefined();
      
      // lastModified must be a valid Date object
      expect(entry.lastModified).toBeInstanceOf(Date);
      
      // Date should not be invalid
      expect(isNaN(entry.lastModified.getTime())).toBe(false);
      
      // Date should be in the past or present (not future)
      const now = new Date();
      expect(entry.lastModified.getTime()).toBeLessThanOrEqual(now.getTime());
    }
  });
  
  it('all entries have valid priority values between 0.0 and 1.0', () => {
    const sitemapEntries = sitemap();
    
    expect(sitemapEntries.length).toBeGreaterThan(0);
    
    for (const entry of sitemapEntries) {
      // priority must be present
      expect(entry.priority).toBeDefined();
      
      // priority must be a number
      expect(typeof entry.priority).toBe('number');
      
      // priority must be between 0.0 and 1.0 (inclusive)
      expect(entry.priority).toBeGreaterThanOrEqual(0.0);
      expect(entry.priority).toBeLessThanOrEqual(1.0);
      
      // priority should not be NaN
      expect(isNaN(entry.priority)).toBe(false);
    }
  });
  
  it('all entries have valid changeFrequency values', () => {
    const sitemapEntries = sitemap();
    
    const validFrequencies = [
      'always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'
    ] as const;
    
    for (const entry of sitemapEntries) {
      // changeFrequency must be present
      expect(entry.changeFrequency).toBeDefined();
      
      // changeFrequency must be one of the valid values
      expect(validFrequencies).toContain(entry.changeFrequency);
    }
  });
  
  it('entries with higher importance have higher priority scores', () => {
    const sitemapEntries = sitemap();
    
    // Find home page entry (should have highest priority)
    const homeEntry = sitemapEntries.find(entry => 
      entry.url === seoConfig.baseUrl || entry.url === `${seoConfig.baseUrl}/`
    );
    
    if (homeEntry) {
      // Home page should have priority of 1.0 or close to it
      expect(homeEntry.priority).toBeGreaterThanOrEqual(0.9);
      
      // All other entries should have equal or lower priority
      for (const entry of sitemapEntries) {
        expect(entry.priority).toBeLessThanOrEqual(homeEntry.priority);
      }
    }
  });
  
  it('lastmod dates are consistent for the same logical page across languages', () => {
    const sitemapEntries = sitemap();
    
    // Group entries by their base path (without language prefix)
    const entriesByBasePath = new Map<string, typeof sitemapEntries>();
    
    for (const entry of sitemapEntries) {
      let basePath = entry.url.replace(seoConfig.baseUrl, '');
      
      // Remove language prefix if present
      for (const language of seoConfig.languages) {
        if (language.code !== 'en' && basePath.startsWith(`/${language.code}`)) {
          basePath = basePath.substring(`/${language.code}`.length);
          break;
        }
      }
      
      if (!entriesByBasePath.has(basePath)) {
        entriesByBasePath.set(basePath, []);
      }
      entriesByBasePath.get(basePath)?.push(entry);
    }
    
    // For each group, verify all entries have the same lastmod date
    for (const [basePath, entries] of entriesByBasePath) {
      if (entries.length > 1) {
        const firstLastMod = entries[0].lastModified.getTime();
        
        for (let i = 1; i < entries.length; i++) {
          const currentLastMod = entries[i].lastModified.getTime();
          expect(currentLastMod).toBe(firstLastMod);
        }
      }
    }
  });
});

// ============================================================================
// Additional Sitemap Tests
// ============================================================================

describe('Sitemap structure and validity', () => {
  
  it('generates a non-empty sitemap', () => {
    const sitemapEntries = sitemap();
    expect(sitemapEntries.length).toBeGreaterThan(0);
  });
  
  it('includes the home page', () => {
    const sitemapEntries = sitemap();
    const homeEntry = sitemapEntries.find(entry => 
      entry.url === seoConfig.baseUrl || entry.url === `${seoConfig.baseUrl}/`
    );
    expect(homeEntry).toBeDefined();
  });
  
  it('assigns highest priority to home page', () => {
    const sitemapEntries = sitemap();
    const homeEntry = sitemapEntries.find(entry => 
      entry.url === seoConfig.baseUrl || entry.url === `${seoConfig.baseUrl}/`
    );
    
    if (homeEntry) {
      expect(homeEntry.priority).toBe(1);
    }
  });
  
  it('uses consistent base URL across all entries', () => {
    const sitemapEntries = sitemap();
    
    for (const entry of sitemapEntries) {
      expect(entry.url).toContain(seoConfig.baseUrl);
      
      if (entry.alternates?.languages) {
        for (const url of Object.values(entry.alternates.languages)) {
          expect(url).toContain(seoConfig.baseUrl);
        }
      }
    }
  });
});
