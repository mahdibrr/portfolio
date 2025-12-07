/**
 * Content generators for SEO-optimized titles and descriptions
 * Generates page titles and meta descriptions following SEO best practices
 */

/**
 * Configuration for page title generation
 */
export interface PageTitleConfig {
  pageName?: string;
  siteName?: string;
  separator?: string;
  includeJobTitle?: boolean;
  jobTitle?: string;
}

/**
 * Configuration for meta description generation
 */
export interface MetaDescriptionConfig {
  content: string;
  keywords?: string[];
  minLength?: number;
  maxLength?: number;
}

/**
 * Generates an SEO-optimized page title following the format pattern
 * Format: [Page Name] | [Site Name] - [Job Title]
 * 
 * Ensures title is between 30-60 characters for optimal SEO
 * 
 * @param config - Configuration for title generation
 * @returns Formatted page title
 */
export function generatePageTitle(config: PageTitleConfig): string {
  const {
    pageName,
    siteName = 'Mahdi Ben Rhouma',
    separator = '|',
    includeJobTitle = true,
    jobTitle = 'Full-Stack Developer'
  } = config;
  
  // Trim and normalize inputs
  const cleanPageName = pageName?.trim();
  const cleanSiteName = siteName?.trim();
  const cleanJobTitle = jobTitle?.trim();
  
  let title = '';
  
  // Build title components - accept any non-empty trimmed string
  if (cleanPageName && cleanPageName.length > 0) {
    title = cleanPageName;
  }
  
  if (cleanSiteName && cleanSiteName.length > 0) {
    if (title) {
      title += ` ${separator} ${cleanSiteName}`;
    } else {
      title = cleanSiteName;
    }
  }
  
  if (includeJobTitle && cleanJobTitle && cleanJobTitle.length > 0) {
    if (title) {
      title += ` - ${cleanJobTitle}`;
    } else {
      title = cleanJobTitle;
    }
  }
  
  // Fallback if title is still empty
  if (!title || title.length === 0) {
    title = 'Mahdi Ben Rhouma - Full-Stack Developer';
  }
  
  // Ensure title is within optimal length (30-60 characters)
  if (title.length < 30) {
    // If too short, try to pad with additional components
    const defaultJobTitle = 'Full-Stack Developer';
    const defaultSiteName = 'Mahdi Ben Rhouma';
    
    // Try adding job title if not already included
    if (!includeJobTitle && cleanJobTitle && !title.includes(cleanJobTitle)) {
      const withJobTitle = `${title} - ${cleanJobTitle}`;
      if (withJobTitle.length <= 60) {
        title = withJobTitle;
      }
    } else if (!title.includes(defaultJobTitle)) {
      // Try adding default job title
      const withJobTitle = `${title} - ${defaultJobTitle}`;
      if (withJobTitle.length >= 30 && withJobTitle.length <= 60) {
        title = withJobTitle;
      }
    }
    
    // If still too short, pad with default site name
    if (title.length < 30 && !title.includes(defaultSiteName)) {
      const withSiteName = `${defaultSiteName} ${separator} ${title}`;
      if (withSiteName.length >= 30 && withSiteName.length <= 60) {
        title = withSiteName;
      }
    }
    
    // Last resort: use complete default
    if (title.length < 30) {
      title = 'Mahdi Ben Rhouma - Full-Stack Developer';
    }
  }
  
  if (title.length > 60) {
    // If too long, truncate intelligently at word boundary
    const truncated = title.substring(0, 57);
    const lastSpace = truncated.lastIndexOf(' ');
    
    if (lastSpace > 30) {
      title = truncated.substring(0, lastSpace) + '...';
    } else {
      title = truncated + '...';
    }
  }
  
  return title;
}

/**
 * Generates an SEO-optimized meta description
 * Ensures description is between 150-160 characters and includes keywords
 * 
 * @param config - Configuration for description generation
 * @returns Formatted meta description
 */
export function generateMetaDescription(config: MetaDescriptionConfig): string {
  const {
    content,
    keywords = [],
    minLength = 150,
    maxLength = 160
  } = config;
  
  // Default description that's exactly 153 characters (within 150-160 range)
  const DEFAULT_DESCRIPTION = 'Full-stack developer specializing in React, Next.js, FastAPI, Spring Boot. Building modern web applications with clean code. Available for opportunities.';
  
  // Normalize whitespace: trim and replace multiple spaces/newlines with single space
  let description = content.trim().replace(/\s+/g, ' ');
  
  // Fallback for empty or whitespace-only content
  if (!description || description.length === 0) {
    description = DEFAULT_DESCRIPTION;
  }
  
  // Clean keywords
  const cleanKeywords = keywords.map(k => k.trim()).filter(k => k.length > 0);
  
  // If description is too short, try to add keywords naturally
  if (description.length < minLength && cleanKeywords.length > 0) {
    // Add keywords that aren't already in the description
    const missingKeywords = cleanKeywords.filter(
      keyword => !description.toLowerCase().includes(keyword.toLowerCase())
    );
    
    if (missingKeywords.length > 0) {
      // Add keywords separated by commas
      const keywordPhrase = missingKeywords.slice(0, 3).join(', ');
      
      // Check if we can add keywords without exceeding max length
      const withKeywords = `${description}. Specializing in ${keywordPhrase}.`;
      
      if (withKeywords.length >= minLength && withKeywords.length <= maxLength) {
        description = withKeywords;
      } else if (withKeywords.length < maxLength) {
        // Try adding just one keyword at a time
        for (const keyword of missingKeywords) {
          const withKeyword = `${description}. ${keyword}.`;
          if (withKeyword.length >= minLength && withKeyword.length <= maxLength) {
            description = withKeyword;
            break;
          } else if (withKeyword.length < maxLength) {
            description = withKeyword;
          }
        }
      }
    }
  }
  
  // If still too short, pad with generic but relevant content
  if (description.length < minLength) {
    const padding = ' Contact for opportunities.';
    const withPadding = description + padding;
    
    if (withPadding.length >= minLength && withPadding.length <= maxLength) {
      description = withPadding;
    } else if (withPadding.length < minLength) {
      // Need more padding
      const morePadding = ' Available for freelance and full-time work.';
      const withMorePadding = description + padding + morePadding;
      
      if (withMorePadding.length >= minLength && withMorePadding.length <= maxLength) {
        description = withMorePadding;
      }
    }
  }
  
  // If still too short after padding, use the default
  if (description.length < minLength) {
    description = DEFAULT_DESCRIPTION;
  }
  
  // If too long, truncate at word boundary
  if (description.length > maxLength) {
    const truncated = description.substring(0, maxLength - 3);
    const lastSpace = truncated.lastIndexOf(' ');
    
    if (lastSpace > minLength - 10) {
      description = truncated.substring(0, lastSpace) + '...';
    } else {
      description = truncated + '...';
    }
  }
  
  return description;
}

/**
 * Validates that a title meets SEO requirements
 * 
 * @param title - Title to validate
 * @returns Validation result
 */
export function validateTitle(title: string): {
  valid: boolean;
  length: number;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];
  const length = title.length;
  
  if (length < 30) {
    errors.push(`Title is too short (${length} characters). Minimum is 30 characters.`);
  }
  
  if (length > 60) {
    errors.push(`Title is too long (${length} characters). Maximum is 60 characters.`);
  }
  
  if (!title.includes('|') && !title.includes('-')) {
    warnings.push('Title should include a separator (| or -) for better structure.');
  }
  
  return {
    valid: errors.length === 0,
    length,
    errors,
    warnings
  };
}

/**
 * Validates that a meta description meets SEO requirements
 * 
 * @param description - Description to validate
 * @param keywords - Keywords that should be present
 * @returns Validation result
 */
export function validateMetaDescription(
  description: string,
  keywords: string[] = []
): {
  valid: boolean;
  length: number;
  hasKeywords: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];
  const length = description.length;
  
  if (length < 150) {
    errors.push(`Description is too short (${length} characters). Minimum is 150 characters.`);
  }
  
  if (length > 160) {
    errors.push(`Description is too long (${length} characters). Maximum is 160 characters.`);
  }
  
  // Check if at least one keyword is present
  const hasKeywords = keywords.length === 0 || keywords.some(
    keyword => description.toLowerCase().includes(keyword.toLowerCase())
  );
  
  if (!hasKeywords && keywords.length > 0) {
    warnings.push('Description should include at least one primary keyword.');
  }
  
  return {
    valid: errors.length === 0,
    length,
    hasKeywords,
    errors,
    warnings
  };
}
