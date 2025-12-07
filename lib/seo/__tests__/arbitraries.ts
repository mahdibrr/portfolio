/**
 * Shared Test Generators (Arbitraries) for SEO Property-Based Testing
 * 
 * This module provides fast-check arbitraries for generating test data
 * used across SEO property tests.
 */

import * as fc from 'fast-check';
import type { 
  SEOConfig, 
  AuthorInfo, 
  SocialProfiles, 
  GeoTargeting,
  SupportedLanguage,
  EducationInfo
} from '../config';

// ============================================================================
// Primitive Arbitraries
// ============================================================================

/**
 * Generate a valid non-empty string
 */
export const nonEmptyStringArb = fc.string({ minLength: 1, maxLength: 100 })
  .filter(s => s.trim().length > 0);

/**
 * Generate a valid URL
 */
export const urlArb = fc.webUrl();

/**
 * Generate a valid email address
 */
export const emailArb = fc.emailAddress();

/**
 * Generate a valid locale code (e.g., 'en', 'fr', 'ar')
 */
export const localeCodeArb = fc.constantFrom('en', 'fr', 'ar', 'es', 'de', 'it', 'pt', 'zh', 'ja');

/**
 * Generate a valid region code (ISO 3166-1 alpha-2)
 */
export const regionCodeArb = fc.constantFrom(
  'US', 'GB', 'FR', 'DE', 'TN', 'AE', 'SA', 'CA', 'BE', 'CH', 'IT', 'ES'
);

/**
 * Generate a valid timezone
 */
export const timezoneArb = fc.constantFrom(
  'Africa/Tunis',
  'Europe/Paris',
  'America/New_York',
  'Asia/Dubai',
  'UTC'
);


// ============================================================================
// Composite Arbitraries
// ============================================================================

/**
 * Generate valid education info
 */
export const educationInfoArb: fc.Arbitrary<EducationInfo> = fc.record({
  name: nonEmptyStringArb,
  degree: nonEmptyStringArb,
  field: nonEmptyStringArb,
  location: fc.option(nonEmptyStringArb, { nil: undefined })
});

/**
 * Generate valid author info
 */
export const authorInfoArb: fc.Arbitrary<AuthorInfo> = fc.record({
  name: nonEmptyStringArb,
  jobTitle: nonEmptyStringArb,
  email: emailArb,
  image: fc.constant('/images/profile.jpg'),
  alumniOf: educationInfoArb,
  description: fc.option(nonEmptyStringArb, { nil: undefined })
});

/**
 * Generate valid social profiles (at least one profile required)
 */
export const socialProfilesArb: fc.Arbitrary<SocialProfiles> = fc.record({
  github: urlArb,
  linkedin: urlArb,
  twitter: fc.option(urlArb, { nil: undefined }),
  stackoverflow: fc.option(urlArb, { nil: undefined })
});

/**
 * Generate valid supported language
 */
export const supportedLanguageArb: fc.Arbitrary<SupportedLanguage> = fc.record({
  code: localeCodeArb,
  locale: fc.tuple(localeCodeArb, regionCodeArb).map(([code, region]) => `${code}_${region}`),
  name: nonEmptyStringArb,
  hreflang: localeCodeArb,
  direction: fc.constantFrom('ltr' as const, 'rtl' as const)
});

/**
 * Generate valid geo targeting config
 */
export const geoTargetingArb: fc.Arbitrary<GeoTargeting> = fc.record({
  primaryRegion: regionCodeArb,
  targetRegions: fc.array(regionCodeArb, { minLength: 1, maxLength: 10 }),
  timezone: timezoneArb,
  placename: fc.option(nonEmptyStringArb, { nil: undefined })
});

/**
 * Generate valid SEO config
 */
export const seoConfigArb: fc.Arbitrary<SEOConfig> = fc.record({
  baseUrl: urlArb,
  siteName: nonEmptyStringArb,
  defaultTitle: nonEmptyStringArb,
  defaultDescription: nonEmptyStringArb,
  author: authorInfoArb,
  social: socialProfilesArb,
  languages: fc.array(supportedLanguageArb, { minLength: 1, maxLength: 5 }),
  geo: geoTargetingArb,
  keywords: fc.array(nonEmptyStringArb, { minLength: 1, maxLength: 20 })
});

// ============================================================================
// Partial/Invalid Arbitraries (for testing validation)
// ============================================================================

/**
 * Generate a partial SEO config (may be missing required fields)
 */
export const partialSeoConfigArb: fc.Arbitrary<Partial<SEOConfig>> = fc.record({
  baseUrl: fc.option(urlArb, { nil: undefined }),
  siteName: fc.option(nonEmptyStringArb, { nil: undefined }),
  defaultTitle: fc.option(nonEmptyStringArb, { nil: undefined }),
  defaultDescription: fc.option(nonEmptyStringArb, { nil: undefined }),
  author: fc.option(authorInfoArb, { nil: undefined }),
  social: fc.option(socialProfilesArb, { nil: undefined }),
  languages: fc.option(fc.array(supportedLanguageArb, { minLength: 0, maxLength: 5 }), { nil: undefined }),
  geo: fc.option(geoTargetingArb, { nil: undefined }),
  keywords: fc.option(fc.array(nonEmptyStringArb, { minLength: 0, maxLength: 20 }), { nil: undefined })
});

/**
 * Generate social profiles that may be empty (invalid)
 */
export const emptySocialProfilesArb: fc.Arbitrary<SocialProfiles> = fc.record({
  github: fc.constant(undefined as unknown as string),
  linkedin: fc.constant(undefined as unknown as string),
  twitter: fc.constant(undefined),
  stackoverflow: fc.constant(undefined)
});

// ============================================================================
// Structured Data Arbitraries
// ============================================================================

import type { ProjectData, SkillData, FAQItem, RepositoryData } from '../structured-data';

/**
 * Generate a valid date string (YYYY-MM-DD format)
 */
const validDateStringArb = fc.integer({ min: 2000, max: 2030 }).chain(year =>
  fc.integer({ min: 1, max: 12 }).chain(month =>
    fc.integer({ min: 1, max: 28 }).map(day => {
      const m = month.toString().padStart(2, '0');
      const d = day.toString().padStart(2, '0');
      return `${year}-${m}-${d}`;
    })
  )
);

/**
 * Generate valid project data for CreativeWork schema
 */
export const projectDataArb: fc.Arbitrary<ProjectData> = fc.record({
  name: nonEmptyStringArb,
  description: nonEmptyStringArb,
  technologies: fc.option(fc.array(nonEmptyStringArb, { minLength: 1, maxLength: 10 }), { nil: undefined }),
  dateCreated: fc.option(validDateStringArb, { nil: undefined }),
  dateModified: fc.option(validDateStringArb, { nil: undefined }),
  url: fc.option(urlArb, { nil: undefined }),
  image: fc.option(fc.constant('/images/project.jpg'), { nil: undefined }),
  category: fc.option(fc.constantFrom('web', 'mobile', 'backend', 'fullstack', 'software'), { nil: undefined }),
});

/**
 * Generate valid skill data for ItemList schema
 */
export const skillDataArb: fc.Arbitrary<SkillData> = fc.record({
  name: nonEmptyStringArb,
  proficiency: fc.option(fc.integer({ min: 0, max: 100 }), { nil: undefined }),
  description: fc.option(nonEmptyStringArb, { nil: undefined }),
});

/**
 * Generate valid FAQ item
 */
export const faqItemArb: fc.Arbitrary<FAQItem> = fc.record({
  question: nonEmptyStringArb,
  answer: nonEmptyStringArb,
});

/**
 * Generate valid repository data for SoftwareSourceCode schema
 */
export const repositoryDataArb: fc.Arbitrary<RepositoryData> = fc.record({
  name: nonEmptyStringArb,
  description: fc.option(nonEmptyStringArb, { nil: undefined }),
  programmingLanguage: fc.oneof(
    nonEmptyStringArb,
    fc.array(nonEmptyStringArb, { minLength: 1, maxLength: 5 })
  ),
  codeRepository: fc.option(urlArb, { nil: undefined }),
  license: fc.option(fc.constantFrom('MIT', 'Apache-2.0', 'GPL-3.0', 'BSD-3-Clause'), { nil: undefined }),
  dateCreated: fc.option(validDateStringArb, { nil: undefined }),
  dateModified: fc.option(validDateStringArb, { nil: undefined }),
});

/**
 * Generate array of skills
 */
export const skillsArrayArb = fc.array(skillDataArb, { minLength: 1, maxLength: 20 });

/**
 * Generate array of FAQ items
 */
export const faqsArrayArb = fc.array(faqItemArb, { minLength: 1, maxLength: 10 });

/**
 * Generate array of projects
 */
export const projectsArrayArb = fc.array(projectDataArb, { minLength: 1, maxLength: 10 });

// ============================================================================
// Social Metadata Arbitraries
// ============================================================================

import type { PageConfig } from '../social';

/**
 * Generate a valid ISO date string
 */
export const isoDateStringArb = fc.integer({ min: 2000, max: 2030 }).chain(year =>
  fc.integer({ min: 1, max: 12 }).chain(month =>
    fc.integer({ min: 1, max: 28 }).map(day => {
      const m = month.toString().padStart(2, '0');
      const d = day.toString().padStart(2, '0');
      return `${year}-${m}-${d}T00:00:00.000Z`;
    })
  )
);

/**
 * Generate valid page config for social metadata
 */
export const pageConfigArb: fc.Arbitrary<PageConfig> = fc.record({
  title: fc.option(nonEmptyStringArb, { nil: undefined }),
  description: fc.option(nonEmptyStringArb, { nil: undefined }),
  path: fc.option(fc.constantFrom('/', '/about', '/projects', '/contact', '/blog'), { nil: undefined }),
  image: fc.option(fc.constant('/images/profile.jpg'), { nil: undefined }),
  imageAlt: fc.option(nonEmptyStringArb, { nil: undefined }),
  type: fc.option(fc.constantFrom('website' as const, 'article' as const, 'profile' as const), { nil: undefined }),
  locale: fc.option(fc.constantFrom('en_US', 'fr_FR', 'ar_TN'), { nil: undefined }),
  updatedTime: fc.option(isoDateStringArb, { nil: undefined }),
  twitterCreator: fc.option(fc.constant('@mahdibrr'), { nil: undefined }),
});

// ============================================================================
// Content Validation Arbitraries
// ============================================================================

/**
 * Generate valid HTML heading hierarchy (no skipped levels)
 */
export const validHeadingHierarchyArb: fc.Arbitrary<string> = fc.array(
  fc.integer({ min: 1, max: 6 }),
  { minLength: 1, maxLength: 10 }
).chain(levels => {
  // Ensure first heading is h1
  const validLevels = [1];
  
  for (let i = 1; i < levels.length; i++) {
    const prev = validLevels[i - 1];
    const next = levels[i];
    
    // Can only increase by 1 or decrease by any amount
    if (next <= prev + 1) {
      validLevels.push(next);
    } else {
      // If would skip, just increase by 1
      validLevels.push(prev + 1 <= 6 ? prev + 1 : prev);
    }
  }
  
  return fc.constant(
    validLevels.map((level, i) => 
      `<h${level}>Heading ${i + 1}</h${level}>`
    ).join('\n')
  );
});

/**
 * Generate invalid HTML heading hierarchy (with skipped levels)
 */
export const invalidHeadingHierarchyArb: fc.Arbitrary<string> = fc.tuple(
  fc.integer({ min: 1, max: 4 }),
  fc.integer({ min: 3, max: 6 })
).map(([first, second]) => {
  // Ensure we skip at least one level
  const skip = second > first + 1 ? second : first + 2;
  return `<h${first}>First Heading</h${first}>\n<h${skip}>Second Heading</h${skip}>`;
});

/**
 * Generate HTML with images (some with alt text, some without)
 */
export const htmlWithImagesArb: fc.Arbitrary<string> = fc.array(
  fc.record({
    src: fc.constant('/images/test.jpg'),
    alt: fc.option(nonEmptyStringArb, { nil: undefined }),
    hasAlt: fc.boolean()
  }),
  { minLength: 1, maxLength: 5 }
).map(images => 
  images.map(img => {
    if (img.hasAlt && img.alt) {
      return `<img src="${img.src}" alt="${img.alt}" />`;
    } else {
      return `<img src="${img.src}" />`;
    }
  }).join('\n')
);

/**
 * Generate HTML with valid images (all have alt text)
 */
export const htmlWithValidImagesArb: fc.Arbitrary<string> = fc.array(
  fc.record({
    src: fc.constant('/images/test.jpg'),
    alt: fc.string({ minLength: 5, maxLength: 100 }).filter(s => {
      // Filter out strings that contain quotes or angle brackets that would break HTML
      return !s.includes('"') && !s.includes("'") && !s.includes('<') && !s.includes('>') && s.trim().length >= 5;
    })
  }),
  { minLength: 1, maxLength: 5 }
).map(images => 
  images.map(img => `<img src="${img.src}" alt="${img.alt}" />`).join('\n')
);

/**
 * Generate HTML with internal links
 */
export const htmlWithLinksArb: fc.Arbitrary<string> = fc.array(
  fc.record({
    href: fc.constantFrom('/', '/about', '/projects', '/contact'),
    text: nonEmptyStringArb,
    isGeneric: fc.boolean()
  }),
  { minLength: 1, maxLength: 5 }
).map(links => 
  links.map(link => {
    const anchorText = link.isGeneric 
      ? fc.sample(fc.constantFrom('click here', 'read more', 'link', 'here'), 1)[0]
      : link.text;
    return `<a href="${link.href}">${anchorText}</a>`;
  }).join('\n')
);

/**
 * Generate HTML with valid internal links (descriptive anchor text)
 */
export const htmlWithValidLinksArb: fc.Arbitrary<string> = fc.array(
  fc.record({
    href: fc.constantFrom('/', '/about', '/projects', '/contact'),
    text: fc.string({ minLength: 10, maxLength: 50 }).filter(s => {
      const lower = s.toLowerCase().trim();
      return !['click here', 'read more', 'link', 'here', 'more'].includes(lower);
    })
  }),
  { minLength: 1, maxLength: 5 }
).map(links => 
  links.map(link => `<a href="${link.href}">${link.text}</a>`).join('\n')
);

// ============================================================================
// Content Generators Arbitraries
// ============================================================================

import type { PageTitleConfig, MetaDescriptionConfig } from '../content-generators';

/**
 * Generate valid page title config
 */
export const pageTitleConfigArb: fc.Arbitrary<PageTitleConfig> = fc.record({
  pageName: fc.option(
    fc.string({ minLength: 5, maxLength: 30 }).filter(s => s.trim().length >= 5),
    { nil: undefined }
  ),
  siteName: fc.option(
    fc.string({ minLength: 5, maxLength: 30 }).filter(s => s.trim().length >= 5),
    { nil: undefined }
  ),
  separator: fc.option(fc.constantFrom('|', '-', '•'), { nil: undefined }),
  includeJobTitle: fc.option(fc.boolean(), { nil: undefined }),
  jobTitle: fc.option(
    fc.string({ minLength: 10, maxLength: 30 }).filter(s => s.trim().length >= 10),
    { nil: undefined }
  )
});

/**
 * Generate valid meta description config
 */
export const metaDescriptionConfigArb: fc.Arbitrary<MetaDescriptionConfig> = fc.record({
  content: fc.string({ minLength: 100, maxLength: 200 }).filter(s => {
    // Ensure content has reasonable amount of non-whitespace characters after normalization
    const normalized = s.trim().replace(/\s+/g, ' ');
    return normalized.length >= 50;
  }),
  keywords: fc.option(
    fc.array(
      fc.string({ minLength: 3, maxLength: 20 }).filter(s => s.trim().length >= 3 && s.trim().replace(/\s+/g, ' ').length >= 3),
      { minLength: 1, maxLength: 5 }
    ),
    { nil: undefined }
  ),
  minLength: fc.option(fc.constant(150), { nil: undefined }),
  maxLength: fc.option(fc.constant(160), { nil: undefined })
});
