/**
 * Color Contrast Utilities for WCAG 2.1 AA Compliance
 * 
 * This module provides utilities to check color contrast ratios
 * to ensure accessibility compliance with WCAG 2.1 AA standards.
 * 
 * WCAG 2.1 AA Requirements:
 * - Normal text (< 18pt or < 14pt bold): 4.5:1 contrast ratio
 * - Large text (>= 18pt or >= 14pt bold): 3:1 contrast ratio
 * - UI components and graphics: 3:1 contrast ratio
 */

/**
 * Convert hex color to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Calculate relative luminance of a color
 * Formula from WCAG 2.1: https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */
function getRelativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const sRGB = c / 255;
    return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 * Formula from WCAG 2.1: https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
 */
export function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) {
    throw new Error('Invalid color format. Use hex format (e.g., #FFFFFF)');
  }

  const l1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if contrast ratio meets WCAG 2.1 AA standards
 */
export function meetsWCAG_AA(
  foreground: string,
  background: string,
  options: {
    isLargeText?: boolean;
    isUIComponent?: boolean;
  } = {}
): {
  passes: boolean;
  ratio: number;
  required: number;
  level: 'AA' | 'AAA' | 'Fail';
} {
  const ratio = getContrastRatio(foreground, background);
  const { isLargeText = false, isUIComponent = false } = options;

  let required: number;
  if (isUIComponent) {
    required = 3.0;
  } else if (isLargeText) {
    required = 3.0;
  } else {
    required = 4.5;
  }

  const passes = ratio >= required;
  
  // Determine level
  let level: 'AA' | 'AAA' | 'Fail';
  if (isLargeText) {
    level = ratio >= 4.5 ? 'AAA' : ratio >= 3.0 ? 'AA' : 'Fail';
  } else {
    level = ratio >= 7.0 ? 'AAA' : ratio >= 4.5 ? 'AA' : 'Fail';
  }

  return {
    passes,
    ratio: Math.round(ratio * 100) / 100,
    required,
    level,
  };
}

/**
 * Portfolio color palette with WCAG compliance verification
 */
export const colorPalette = {
  // Background colors
  background: {
    primary: '#050505', // Main background
    secondary: '#0f172a', // Slate-900
    card: '#1e293b', // Slate-800
  },
  
  // Text colors
  text: {
    primary: '#e2e8f0', // Slate-200 - Main text
    secondary: '#94a3b8', // Slate-400 - Secondary text
    muted: '#64748b', // Slate-500 - Muted text
    white: '#ffffff', // Pure white for emphasis
  },
  
  // Accent colors
  accent: {
    cyan: '#06b6d4', // Cyan-500 - Primary accent
    blue: '#3b82f6', // Blue-500 - Secondary accent
    purple: '#a855f7', // Purple-500 - Tertiary accent
    emerald: '#10b981', // Emerald-500 - Success
  },
  
  // Interactive states
  interactive: {
    hover: '#0891b2', // Cyan-600
    focus: '#06b6d4', // Cyan-500
    active: '#0e7490', // Cyan-700
  },
} as const;

/**
 * Verify all color combinations in the portfolio meet WCAG AA standards
 */
export function verifyColorContrast(): {
  compliant: boolean;
  results: Array<{
    name: string;
    foreground: string;
    background: string;
    result: ReturnType<typeof meetsWCAG_AA>;
  }>;
} {
  const combinations = [
    // Primary text on backgrounds
    {
      name: 'Primary text on primary background',
      foreground: colorPalette.text.primary,
      background: colorPalette.background.primary,
    },
    {
      name: 'Primary text on secondary background',
      foreground: colorPalette.text.primary,
      background: colorPalette.background.secondary,
    },
    {
      name: 'Primary text on card background',
      foreground: colorPalette.text.primary,
      background: colorPalette.background.card,
    },
    
    // Secondary text on backgrounds
    {
      name: 'Secondary text on primary background',
      foreground: colorPalette.text.secondary,
      background: colorPalette.background.primary,
    },
    {
      name: 'Secondary text on secondary background',
      foreground: colorPalette.text.secondary,
      background: colorPalette.background.secondary,
    },
    
    // White text on backgrounds
    {
      name: 'White text on primary background',
      foreground: colorPalette.text.white,
      background: colorPalette.background.primary,
    },
    
    // Accent colors on backgrounds (for links and buttons)
    {
      name: 'Cyan accent on primary background',
      foreground: colorPalette.accent.cyan,
      background: colorPalette.background.primary,
    },
    {
      name: 'Blue accent on primary background',
      foreground: colorPalette.accent.blue,
      background: colorPalette.background.primary,
    },
    
    // Interactive states
    {
      name: 'Focus outline (cyan) on primary background',
      foreground: colorPalette.interactive.focus,
      background: colorPalette.background.primary,
      isUIComponent: true,
    },
  ];

  const results = combinations.map((combo) => ({
    name: combo.name,
    foreground: combo.foreground,
    background: combo.background,
    result: meetsWCAG_AA(combo.foreground, combo.background, {
      isUIComponent: combo.isUIComponent,
    }),
  }));

  const compliant = results.every((r) => r.result.passes);

  return { compliant, results };
}

/**
 * Generate a contrast report for documentation
 */
export function generateContrastReport(): string {
  const { compliant, results } = verifyColorContrast();
  
  let report = '# Color Contrast Compliance Report\n\n';
  report += `Overall Compliance: ${compliant ? '✅ PASS' : '❌ FAIL'}\n\n`;
  report += '## Color Combinations\n\n';
  
  results.forEach((result) => {
    const status = result.result.passes ? '✅' : '❌';
    report += `### ${status} ${result.name}\n`;
    report += `- Foreground: ${result.foreground}\n`;
    report += `- Background: ${result.background}\n`;
    report += `- Contrast Ratio: ${result.result.ratio}:1\n`;
    report += `- Required: ${result.result.required}:1\n`;
    report += `- Level: ${result.result.level}\n\n`;
  });
  
  return report;
}
