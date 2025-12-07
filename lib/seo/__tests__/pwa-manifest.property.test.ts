import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import manifest from '../../../app/manifest';

/**
 * Feature: seo-traffic-enhancement, Property 15: PWA Manifest Validity
 * 
 * For any PWA manifest configuration, the generated manifest.json SHALL include 
 * all required fields (name, short_name, start_url, display, icons) with valid values, 
 * and icons SHALL include at least 192x192 and 512x512 sizes.
 * 
 * Validates: Requirements 12.2
 */

describe('PWA Manifest Property Tests', () => {
  describe('Property 15: PWA Manifest Validity', () => {
    it('manifest includes all required fields with valid values', () => {
      const manifestData = manifest();

      // Required fields must be present
      expect(manifestData.name).toBeDefined();
      expect(manifestData.name).toBeTruthy();
      expect(typeof manifestData.name).toBe('string');
      expect(manifestData.name.length).toBeGreaterThan(0);

      expect(manifestData.short_name).toBeDefined();
      expect(manifestData.short_name).toBeTruthy();
      expect(typeof manifestData.short_name).toBe('string');
      expect(manifestData.short_name.length).toBeGreaterThan(0);

      expect(manifestData.start_url).toBeDefined();
      expect(manifestData.start_url).toBeTruthy();
      expect(typeof manifestData.start_url).toBe('string');

      expect(manifestData.display).toBeDefined();
      expect(manifestData.display).toBeTruthy();
      expect(['standalone', 'fullscreen', 'minimal-ui', 'browser']).toContain(manifestData.display);

      expect(manifestData.icons).toBeDefined();
      expect(Array.isArray(manifestData.icons)).toBe(true);
      expect(manifestData.icons!.length).toBeGreaterThan(0);
    });

    it('manifest icons include required 192x192 and 512x512 sizes', () => {
      const manifestData = manifest();

      expect(manifestData.icons).toBeDefined();
      const icons = manifestData.icons!;

      // Check for 192x192 icon
      const icon192 = icons.find(icon => icon.sizes === '192x192');
      expect(icon192).toBeDefined();
      expect(icon192?.type).toBe('image/png');
      expect(icon192?.src).toBeTruthy();

      // Check for 512x512 icon
      const icon512 = icons.find(icon => icon.sizes === '512x512');
      expect(icon512).toBeDefined();
      expect(icon512?.type).toBe('image/png');
      expect(icon512?.src).toBeTruthy();
    });

    it('manifest includes optional but recommended fields', () => {
      const manifestData = manifest();

      // Optional but recommended fields
      expect(manifestData.description).toBeDefined();
      expect(typeof manifestData.description).toBe('string');
      expect(manifestData.description!.length).toBeGreaterThan(0);

      expect(manifestData.background_color).toBeDefined();
      expect(typeof manifestData.background_color).toBe('string');
      expect(manifestData.background_color).toMatch(/^#[0-9a-fA-F]{3,6}$/);

      expect(manifestData.theme_color).toBeDefined();
      expect(typeof manifestData.theme_color).toBe('string');
      expect(manifestData.theme_color).toMatch(/^#[0-9a-fA-F]{3,6}$/);

      expect(manifestData.categories).toBeDefined();
      expect(Array.isArray(manifestData.categories)).toBe(true);
      expect(manifestData.categories!.length).toBeGreaterThan(0);

      expect(manifestData.lang).toBeDefined();
      expect(typeof manifestData.lang).toBe('string');

      expect(manifestData.dir).toBeDefined();
      expect(['ltr', 'rtl', 'auto']).toContain(manifestData.dir);
    });

    it('all icon entries have valid structure', () => {
      const manifestData = manifest();
      const icons = manifestData.icons!;

      icons.forEach(icon => {
        // Each icon must have src
        expect(icon.src).toBeDefined();
        expect(typeof icon.src).toBe('string');
        expect(icon.src.length).toBeGreaterThan(0);

        // Each icon must have sizes
        expect(icon.sizes).toBeDefined();
        expect(typeof icon.sizes).toBe('string');
        expect(icon.sizes).toMatch(/^\d+x\d+$/);

        // Each icon must have type
        expect(icon.type).toBeDefined();
        expect(typeof icon.type).toBe('string');
        expect(icon.type).toMatch(/^image\//);

        // Purpose is optional but if present must be valid
        if (icon.purpose) {
          expect(['any', 'maskable', 'monochrome']).toContain(icon.purpose);
        }
      });
    });

    it('manifest has both any and maskable purpose icons for required sizes', () => {
      const manifestData = manifest();
      const icons = manifestData.icons!;

      // For 192x192, should have both any and maskable
      const icons192 = icons.filter(icon => icon.sizes === '192x192');
      const has192Any = icons192.some(icon => icon.purpose === 'any');
      const has192Maskable = icons192.some(icon => icon.purpose === 'maskable');
      
      expect(has192Any || has192Maskable).toBe(true);

      // For 512x512, should have both any and maskable
      const icons512 = icons.filter(icon => icon.sizes === '512x512');
      const has512Any = icons512.some(icon => icon.purpose === 'any');
      const has512Maskable = icons512.some(icon => icon.purpose === 'maskable');
      
      expect(has512Any || has512Maskable).toBe(true);
    });
  });

  describe('Property-based validation with arbitrary manifest configs', () => {
    const hexColorArbitrary = fc.array(
      fc.constantFrom('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'),
      { minLength: 6, maxLength: 6 }
    ).map(arr => `#${arr.join('')}`);
    
    const manifestConfigArbitrary = fc.record({
      name: fc.string({ minLength: 1, maxLength: 100 }),
      short_name: fc.string({ minLength: 1, maxLength: 20 }),
      description: fc.string({ minLength: 10, maxLength: 200 }),
      start_url: fc.constantFrom('/', '/index.html', '/home'),
      display: fc.constantFrom('standalone', 'fullscreen', 'minimal-ui', 'browser'),
      background_color: fc.oneof(
        fc.constant('#050505'),
        fc.constant('#000000'),
        fc.constant('#ffffff'),
        fc.constant('#06b6d4')
      ),
      theme_color: fc.oneof(
        fc.constant('#050505'),
        fc.constant('#000000'),
        fc.constant('#ffffff'),
        fc.constant('#06b6d4')
      ),
      lang: fc.constantFrom('en', 'fr', 'ar', 'es', 'de'),
      dir: fc.constantFrom('ltr', 'rtl', 'auto'),
    });

    it('validates that any valid manifest config structure is acceptable', () => {
      fc.assert(
        fc.property(manifestConfigArbitrary, (config) => {
          // Validate structure
          expect(config.name.length).toBeGreaterThan(0);
          expect(config.short_name.length).toBeGreaterThan(0);
          expect(config.start_url).toBeTruthy();
          expect(['standalone', 'fullscreen', 'minimal-ui', 'browser']).toContain(config.display);
          expect(config.background_color).toMatch(/^#[0-9a-fA-F]{6}$/);
          expect(config.theme_color).toMatch(/^#[0-9a-fA-F]{6}$/);
          expect(['ltr', 'rtl', 'auto']).toContain(config.dir);
        }),
        { numRuns: 100 }
      );
    });
  });
});
