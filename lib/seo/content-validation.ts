/**
 * Content validation utilities for SEO optimization
 * Validates heading hierarchy, alt text, and anchor text quality
 */

// Generic phrases that should not be used as anchor text
const GENERIC_ANCHOR_PHRASES = [
  'click here',
  'read more',
  'link',
  'here',
  'more',
  'this',
  'view',
  'see more',
  'learn more',
  'find out',
  'details',
];

/**
 * Validates that heading hierarchy follows proper structure (no skipped levels)
 * @param html - HTML string to validate
 * @returns Validation result with errors if any
 */
export function validateHeadingHierarchy(html: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  // Extract all heading tags with their levels
  const headingRegex = /<h([1-6])[^>]*>(.*?)<\/h\1>/gi;
  const headings: number[] = [];
  let match;
  
  while ((match = headingRegex.exec(html)) !== null) {
    headings.push(parseInt(match[1], 10));
  }
  
  if (headings.length === 0) {
    errors.push('No headings found in content');
    return { valid: false, errors };
  }
  
  // First heading should be h1
  if (headings[0] !== 1) {
    errors.push(`First heading should be h1, but found h${headings[0]}`);
  }
  
  // Check for skipped levels
  for (let i = 1; i < headings.length; i++) {
    const current = headings[i];
    const previous = headings[i - 1];
    
    // Heading level can only increase by 1 or decrease by any amount
    if (current > previous + 1) {
      errors.push(
        `Heading hierarchy skips from h${previous} to h${current} (skipped h${previous + 1})`
      );
    }
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validates that all images have non-empty descriptive alt text
 * @param html - HTML string to validate
 * @returns Validation result with errors if any
 */
export function validateAltText(html: string): {
  valid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Extract all img tags
  const imgRegex = /<img[^>]*>/gi;
  const images: string[] = [];
  let match;
  
  while ((match = imgRegex.exec(html)) !== null) {
    images.push(match[0]);
  }
  
  if (images.length === 0) {
    return { valid: true, errors, warnings };
  }
  
  images.forEach((img, index) => {
    // Check if alt attribute exists
    const altMatch = img.match(/alt=["']([^"']*)["']/i);
    
    if (!altMatch) {
      errors.push(`Image ${index + 1} is missing alt attribute`);
      return;
    }
    
    const altText = altMatch[1].trim();
    
    // Check if alt text is empty or only whitespace
    if (altText === '' || altText.length === 0) {
      errors.push(`Image ${index + 1} has empty alt text`);
      return;
    }
    
    // Check if alt text is too short (likely not descriptive) - only warn, don't error
    if (altText.length < 5) {
      warnings.push(
        `Image ${index + 1} has very short alt text: "${altText}" (consider making it more descriptive)`
      );
    }
    
    // Check if alt text is just a filename
    if (altText.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
      warnings.push(
        `Image ${index + 1} alt text appears to be a filename: "${altText}" (use descriptive text instead)`
      );
    }
  });
  
  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validates that internal links use descriptive anchor text (not generic phrases)
 * @param html - HTML string to validate
 * @returns Validation result with errors if any
 */
export function validateAnchorText(html: string): {
  valid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Extract all anchor tags with href
  const anchorRegex = /<a[^>]*href=["']([^"']*)["'][^>]*>(.*?)<\/a>/gi;
  let match;
  
  while ((match = anchorRegex.exec(html)) !== null) {
    const href = match[1];
    const anchorText = match[2].replace(/<[^>]*>/g, '').trim(); // Remove inner HTML tags
    
    // Skip external links (only validate internal links)
    if (href.startsWith('http://') || href.startsWith('https://')) {
      continue;
    }
    
    // Skip anchor links and special protocols
    if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      continue;
    }
    
    // Check if anchor text is empty
    if (anchorText === '') {
      errors.push(`Internal link to "${href}" has no anchor text`);
      continue;
    }
    
    // Check if anchor text is a generic phrase
    const lowerAnchorText = anchorText.toLowerCase();
    const isGeneric = GENERIC_ANCHOR_PHRASES.some(phrase => 
      lowerAnchorText === phrase || lowerAnchorText === phrase + '.'
    );
    
    if (isGeneric) {
      errors.push(
        `Internal link to "${href}" uses generic anchor text: "${anchorText}" (use descriptive text instead)`
      );
    }
    
    // Check if anchor text is too short
    if (anchorText.length < 3 && !anchorText.match(/^\d+$/)) {
      warnings.push(
        `Internal link to "${href}" has very short anchor text: "${anchorText}" (consider making it more descriptive)`
      );
    }
  }
  
  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}
