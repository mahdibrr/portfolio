/**
 * Color Contrast Compliance Tests
 * 
 * Verifies that all color combinations in the portfolio meet
 * WCAG 2.1 AA standards for accessibility.
 * 
 * **Validates: Requirements 15.3**
 */

import { describe, it, expect } from 'vitest';
import {
  getContrastRatio,
  meetsWCAG_AA,
  verifyColorContrast,
  colorPalette,
} from '../color-contrast';

describe('Color Contrast Utilities', () => {
  describe('getContrastRatio', () => {
    it('calculates correct contrast ratio for black and white', () => {
      const ratio = getContrastRatio('#000000', '#ffffff');
      expect(ratio).toBeCloseTo(21, 0);
    });

    it('calculates correct contrast ratio for same colors', () => {
      const ratio = getContrastRatio('#ffffff', '#ffffff');
      expect(ratio).toBeCloseTo(1, 0);
    });

    it('handles colors in any order', () => {
      const ratio1 = getContrastRatio('#000000', '#ffffff');
      const ratio2 = getContrastRatio('#ffffff', '#000000');
      expect(ratio1).toBe(ratio2);
    });
  });

  describe('meetsWCAG_AA', () => {
    it('passes for high contrast normal text', () => {
      const result = meetsWCAG_AA('#000000', '#ffffff');
      expect(result.passes).toBe(true);
      expect(result.level).toBe('AAA');
    });

    it('fails for low contrast normal text', () => {
      const result = meetsWCAG_AA('#777777', '#888888');
      expect(result.passes).toBe(false);
      expect(result.level).toBe('Fail');
    });

    it('has lower requirements for large text', () => {
      // This combination might fail for normal text but pass for large text
      const normalText = meetsWCAG_AA('#767676', '#ffffff', { isLargeText: false });
      const largeText = meetsWCAG_AA('#767676', '#ffffff', { isLargeText: true });
      
      expect(largeText.required).toBe(3.0);
      expect(normalText.required).toBe(4.5);
    });

    it('has lower requirements for UI components', () => {
      const result = meetsWCAG_AA('#767676', '#ffffff', { isUIComponent: true });
      expect(result.required).toBe(3.0);
    });
  });

  describe('Portfolio Color Palette Compliance', () => {
    it('all color combinations meet WCAG AA standards', () => {
      const { compliant, results } = verifyColorContrast();
      
      // Log any failing combinations for debugging
      const failures = results.filter((r) => !r.result.passes);
      if (failures.length > 0) {
        console.log('\nFailing color combinations:');
        failures.forEach((f) => {
          console.log(`  - ${f.name}: ${f.result.ratio}:1 (required: ${f.result.required}:1)`);
        });
      }
      
      expect(compliant).toBe(true);
    });

    it('primary text on primary background has sufficient contrast', () => {
      const result = meetsWCAG_AA(
        colorPalette.text.primary,
        colorPalette.background.primary
      );
      expect(result.passes).toBe(true);
      expect(result.ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('secondary text on primary background has sufficient contrast', () => {
      const result = meetsWCAG_AA(
        colorPalette.text.secondary,
        colorPalette.background.primary
      );
      expect(result.passes).toBe(true);
      expect(result.ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('white text on primary background has sufficient contrast', () => {
      const result = meetsWCAG_AA(
        colorPalette.text.white,
        colorPalette.background.primary
      );
      expect(result.passes).toBe(true);
      expect(result.ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('cyan accent on primary background has sufficient contrast', () => {
      const result = meetsWCAG_AA(
        colorPalette.accent.cyan,
        colorPalette.background.primary
      );
      expect(result.passes).toBe(true);
    });

    it('focus outline meets UI component contrast requirements', () => {
      const result = meetsWCAG_AA(
        colorPalette.interactive.focus,
        colorPalette.background.primary,
        { isUIComponent: true }
      );
      expect(result.passes).toBe(true);
      expect(result.ratio).toBeGreaterThanOrEqual(3.0);
    });
  });

  describe('Color Palette Structure', () => {
    it('has all required background colors', () => {
      expect(colorPalette.background.primary).toBeDefined();
      expect(colorPalette.background.secondary).toBeDefined();
      expect(colorPalette.background.card).toBeDefined();
    });

    it('has all required text colors', () => {
      expect(colorPalette.text.primary).toBeDefined();
      expect(colorPalette.text.secondary).toBeDefined();
      expect(colorPalette.text.muted).toBeDefined();
      expect(colorPalette.text.white).toBeDefined();
    });

    it('has all required accent colors', () => {
      expect(colorPalette.accent.cyan).toBeDefined();
      expect(colorPalette.accent.blue).toBeDefined();
      expect(colorPalette.accent.purple).toBeDefined();
      expect(colorPalette.accent.emerald).toBeDefined();
    });

    it('has all required interactive state colors', () => {
      expect(colorPalette.interactive.hover).toBeDefined();
      expect(colorPalette.interactive.focus).toBeDefined();
      expect(colorPalette.interactive.active).toBeDefined();
    });
  });
});
