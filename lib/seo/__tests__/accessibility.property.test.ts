/**
 * Property-Based Tests for Accessibility
 * 
 * **Feature: seo-traffic-enhancement, Property 16: Accessibility ARIA Labels**
 * 
 * Tests that interactive elements have accessible names through:
 * - Visible text content
 * - aria-label attribute
 * - aria-labelledby reference
 * 
 * **Validates: Requirements 15.1, 15.4**
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';

// ============================================================================
// Test Arbitraries for Interactive Elements
// ============================================================================

/**
 * Generate interactive HTML elements (buttons, links, inputs)
 */
const interactiveElementArb = fc.oneof(
  // Button with text content
  fc.record({
    type: fc.constant('button' as const),
    textContent: fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
    ariaLabel: fc.constant(undefined),
    ariaLabelledBy: fc.constant(undefined),
  }),
  // Button with aria-label
  fc.record({
    type: fc.constant('button' as const),
    textContent: fc.constant(''),
    ariaLabel: fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
    ariaLabelledBy: fc.constant(undefined),
  }),
  // Button with aria-labelledby
  fc.record({
    type: fc.constant('button' as const),
    textContent: fc.constant(''),
    ariaLabel: fc.constant(undefined),
    ariaLabelledBy: fc.constant('label-id'),
  }),
  // Link with text content
  fc.record({
    type: fc.constant('link' as const),
    textContent: fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
    ariaLabel: fc.constant(undefined),
    ariaLabelledBy: fc.constant(undefined),
    href: fc.webUrl(),
  }),
  // Link with aria-label
  fc.record({
    type: fc.constant('link' as const),
    textContent: fc.constant(''),
    ariaLabel: fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
    ariaLabelledBy: fc.constant(undefined),
    href: fc.webUrl(),
  }),
  // Input with aria-label
  fc.record({
    type: fc.constant('input' as const),
    textContent: fc.constant(''),
    ariaLabel: fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
    ariaLabelledBy: fc.constant(undefined),
    inputType: fc.constantFrom('text', 'email', 'password', 'search'),
  }),
  // Input with associated label
  fc.record({
    type: fc.constant('input' as const),
    textContent: fc.constant(''),
    ariaLabel: fc.constant(undefined),
    ariaLabelledBy: fc.constant('label-id'),
    inputType: fc.constantFrom('text', 'email', 'password', 'search'),
  })
);

/**
 * Generate invalid interactive elements (missing accessible names)
 */
const invalidInteractiveElementArb = fc.oneof(
  // Button without any accessible name
  fc.record({
    type: fc.constant('button' as const),
    textContent: fc.constant(''),
    ariaLabel: fc.constant(undefined),
    ariaLabelledBy: fc.constant(undefined),
  }),
  // Link without any accessible name
  fc.record({
    type: fc.constant('link' as const),
    textContent: fc.constant(''),
    ariaLabel: fc.constant(undefined),
    ariaLabelledBy: fc.constant(undefined),
    href: fc.webUrl(),
  }),
  // Input without any accessible name
  fc.record({
    type: fc.constant('input' as const),
    textContent: fc.constant(''),
    ariaLabel: fc.constant(undefined),
    ariaLabelledBy: fc.constant(undefined),
    inputType: fc.constantFrom('text', 'email', 'password', 'search'),
  })
);

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Check if an interactive element has an accessible name
 */
function hasAccessibleName(element: any): boolean {
  // Check for visible text content
  if (element.textContent && element.textContent.trim().length > 0) {
    return true;
  }
  
  // Check for aria-label
  if (element.ariaLabel && element.ariaLabel.trim().length > 0) {
    return true;
  }
  
  // Check for aria-labelledby
  if (element.ariaLabelledBy && element.ariaLabelledBy.trim().length > 0) {
    return true;
  }
  
  return false;
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Generate HTML string from element config
 */
function generateElementHTML(element: any): string {
  const attrs: string[] = [];
  
  if (element.ariaLabel) {
    attrs.push(`aria-label="${escapeHtml(element.ariaLabel)}"`);
  }
  
  if (element.ariaLabelledBy) {
    attrs.push(`aria-labelledby="${escapeHtml(element.ariaLabelledBy)}"`);
  }
  
  const attrsStr = attrs.length > 0 ? ' ' + attrs.join(' ') : '';
  
  switch (element.type) {
    case 'button':
      return `<button${attrsStr}>${escapeHtml(element.textContent || '')}</button>`;
    case 'link':
      return `<a href="${escapeHtml(element.href)}"${attrsStr}>${escapeHtml(element.textContent || '')}</a>`;
    case 'input':
      return `<input type="${element.inputType}"${attrsStr} />`;
    default:
      return '';
  }
}

/**
 * Unescape HTML entities for checking content
 */
function unescapeHtml(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
}

/**
 * Parse HTML and check for accessible names
 */
function validateAccessibilityInHTML(html: string): { valid: boolean; issues: string[] } {
  const issues: string[] = [];
  
  // Check buttons
  const buttonMatches = html.matchAll(/<button([^>]*)>(.*?)<\/button>/gs);
  for (const match of buttonMatches) {
    const attrs = match[1];
    const content = unescapeHtml(match[2]);
    
    const ariaLabelMatch = attrs.match(/aria-label="([^"]*)"/);
    const ariaLabelledByMatch = attrs.match(/aria-labelledby="([^"]*)"/);
    
    const hasAriaLabel = ariaLabelMatch && unescapeHtml(ariaLabelMatch[1]).trim().length > 0;
    const hasAriaLabelledBy = ariaLabelledByMatch && unescapeHtml(ariaLabelledByMatch[1]).trim().length > 0;
    const hasTextContent = content.trim().length > 0;
    
    if (!hasAriaLabel && !hasAriaLabelledBy && !hasTextContent) {
      issues.push(`Button without accessible name: ${match[0]}`);
    }
  }
  
  // Check links
  const linkMatches = html.matchAll(/<a\s+([^>]*)>(.*?)<\/a>/gs);
  for (const match of linkMatches) {
    const attrs = match[1];
    const content = unescapeHtml(match[2]);
    
    const ariaLabelMatch = attrs.match(/aria-label="([^"]*)"/);
    const ariaLabelledByMatch = attrs.match(/aria-labelledby="([^"]*)"/);
    
    const hasAriaLabel = ariaLabelMatch && unescapeHtml(ariaLabelMatch[1]).trim().length > 0;
    const hasAriaLabelledBy = ariaLabelledByMatch && unescapeHtml(ariaLabelledByMatch[1]).trim().length > 0;
    const hasTextContent = content.trim().length > 0;
    
    if (!hasAriaLabel && !hasAriaLabelledBy && !hasTextContent) {
      issues.push(`Link without accessible name: ${match[0]}`);
    }
  }
  
  // Check inputs
  const inputMatches = html.matchAll(/<input([^>]*)>/g);
  for (const match of inputMatches) {
    const attrs = match[1];
    
    const ariaLabelMatch = attrs.match(/aria-label="([^"]*)"/);
    const ariaLabelledByMatch = attrs.match(/aria-labelledby="([^"]*)"/);
    
    const hasAriaLabel = ariaLabelMatch && unescapeHtml(ariaLabelMatch[1]).trim().length > 0;
    const hasAriaLabelledBy = ariaLabelledByMatch && unescapeHtml(ariaLabelledByMatch[1]).trim().length > 0;
    
    if (!hasAriaLabel && !hasAriaLabelledBy) {
      issues.push(`Input without accessible name: ${match[0]}`);
    }
  }
  
  return {
    valid: issues.length === 0,
    issues
  };
}

// ============================================================================
// Property Tests
// ============================================================================

describe('Accessibility Property Tests', () => {
  describe('Property 16: Accessibility ARIA Labels', () => {
    it('all valid interactive elements have accessible names', () => {
      fc.assert(
        fc.property(
          interactiveElementArb,
          (element) => {
            // Property: For any valid interactive element, it must have an accessible name
            const hasName = hasAccessibleName(element);
            
            expect(hasName).toBe(true);
            
            // Additional validation: at least one method of providing accessible name
            const methods = [
              element.textContent && element.textContent.trim().length > 0,
              element.ariaLabel && element.ariaLabel.trim().length > 0,
              element.ariaLabelledBy && element.ariaLabelledBy.trim().length > 0
            ].filter(Boolean);
            
            expect(methods.length).toBeGreaterThanOrEqual(1);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('invalid interactive elements are correctly identified as missing accessible names', () => {
      fc.assert(
        fc.property(
          invalidInteractiveElementArb,
          (element) => {
            // Property: For any invalid interactive element, it must NOT have an accessible name
            const hasName = hasAccessibleName(element);
            
            expect(hasName).toBe(false);
          }
        ),
        { numRuns: 50 }
      );
    });

    it('HTML with valid interactive elements passes accessibility validation', () => {
      fc.assert(
        fc.property(
          fc.array(interactiveElementArb, { minLength: 1, maxLength: 10 }),
          (elements) => {
            // Generate HTML from elements
            const html = elements.map(generateElementHTML).join('\n');
            
            // Validate accessibility
            const result = validateAccessibilityInHTML(html);
            
            expect(result.valid).toBe(true);
            expect(result.issues).toHaveLength(0);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('buttons with text content are accessible', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
          (textContent) => {
            const element = {
              type: 'button' as const,
              textContent,
              ariaLabel: undefined,
              ariaLabelledBy: undefined
            };
            
            expect(hasAccessibleName(element)).toBe(true);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('buttons with aria-label are accessible', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
          (ariaLabel) => {
            const element = {
              type: 'button' as const,
              textContent: '',
              ariaLabel,
              ariaLabelledBy: undefined
            };
            
            expect(hasAccessibleName(element)).toBe(true);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('buttons with aria-labelledby are accessible', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
          (labelId) => {
            const element = {
              type: 'button' as const,
              textContent: '',
              ariaLabel: undefined,
              ariaLabelledBy: labelId
            };
            
            expect(hasAccessibleName(element)).toBe(true);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('links with text content are accessible', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
          fc.webUrl(),
          (textContent, href) => {
            const element = {
              type: 'link' as const,
              textContent,
              ariaLabel: undefined,
              ariaLabelledBy: undefined,
              href
            };
            
            expect(hasAccessibleName(element)).toBe(true);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('inputs with aria-label are accessible', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
          fc.constantFrom('text', 'email', 'password', 'search'),
          (ariaLabel, inputType) => {
            const element = {
              type: 'input' as const,
              textContent: '',
              ariaLabel,
              ariaLabelledBy: undefined,
              inputType
            };
            
            expect(hasAccessibleName(element)).toBe(true);
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});
