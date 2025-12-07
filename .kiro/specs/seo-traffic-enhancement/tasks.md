# Implementation Plan

- [x] 1. Set up SEO infrastructure and core modules





  - [x] 1.1 Create SEO configuration module


    - Create `lib/seo/config.ts` with centralized SEO configuration
    - Define TypeScript interfaces for SEOConfig, AuthorInfo, SocialProfiles, GeoTargeting
    - Export default configuration with all site metadata
    - _Requirements: 1.1, 1.6, 8.1_

  - [x] 1.2 Write property test for SEO config validation


    - **Property 1: Schema Generation Validity (partial)**
    - Verify config contains all required fields for any valid input
    - **Validates: Requirements 1.1, 1.6**


  - [x] 1.3 Set up testing infrastructure

    - Install fast-check for property-based testing
    - Configure Vitest for property tests
    - Create `lib/seo/__tests__/arbitraries.ts` with shared test generators
    - _Requirements: Testing infrastructure_



- [x] 2. Implement structured data generation



  - [x] 2.1 Create Person schema generator




    - Create `lib/seo/structured-data.ts`
    - Implement `generatePersonSchema()` function
    - Include name, jobTitle, email, image, alumniOf, knowsAbout, sameAs fields
    - _Requirements: 1.1, 1.6, 1.7_


  - [x] 2.2 Write property test for Person schema

    - **Property 1: Schema Generation Validity**
    - Test that any valid config produces valid Person schema with all required fields
    - **Validates: Requirements 1.1, 1.6, 1.7**

  - [x] 2.3 Create CreativeWork schema generator

    - Implement `generateCreativeWorkSchema()` for projects
    - Include name, description, creator, dateCreated, programmingLanguage fields
    - _Requirements: 1.2_


  - [x] 2.4 Write property test for CreativeWork schema
    - **Property 1: Schema Generation Validity (continued)**
    - Test that any project data produces valid CreativeWork schema
    - **Validates: Requirements 1.2**

  - [x] 2.5 Create ItemList schema generator for skills

    - Implement `generateItemListSchema()` for skills section
    - Include itemListElement with skill names and proficiency
    - _Requirements: 1.3_


  - [x] 2.6 Create ContactPoint and FAQ schema generators
    - Implement `generateContactPointSchema()` for contact section
    - Implement `generateFAQSchema()` for FAQ content
    - _Requirements: 1.4, 11.1_


  - [x] 2.7 Write property test for FAQ schema
    - **Property 14: FAQ Schema Structure**
    - Test that any FAQ data produces valid FAQPage schema with Question/Answer pairs

    - **Validates: Requirements 11.1**

  - [x] 2.8 Create SoftwareSourceCode schema generator
    - Implement `generateSoftwareSchema()` for code repositories
    - Include programmingLanguage, codeRepository, license fields
    - _Requirements: 1.8, 9.1_


  - [x] 2.9 Integrate structured data into page component


    - Update `app/page.tsx` to use new schema generators
    - Add all schema types to JSON-LD script tag
    - _Requirements: 1.1-1.8_


- [ ] 3. Checkpoint - Ensure all tests pass






  - Ensure all tests pass, ask the user if questions arise.


- [-] 4. Implement social sharing optimization



  - [x] 4.1 Create social metadata module

    - Create `lib/seo/social.ts`
    - Implement `generateOpenGraph()` function with all required OG tags
    - Implement `generateTwitterCard()` function
    - _Requirements: 2.1, 2.2, 2.3, 2.6_


  - [ ] 4.2 Write property test for social metadata

    - **Property 2: Social Metadata Completeness**
    - Test that any page config produces complete OG and Twitter metadata
    - **Validates: Requirements 2.1, 2.2, 2.3, 2.6**

  - [ ] 4.3 Create OG image generation utility
    - Create `app/api/og/route.tsx` for dynamic OG image generation
    - Use @vercel/og for image generation
    - Include name, title, technologies, and profile photo
    - _Requirements: 2.1, 2.5_

  - [ ] 4.4 Write property test for OG image size
    - **Property 3: OG Image Size Constraint**
    - Test that generated images are under 300KB and 1200x630px
    - **Validates: Requirements 2.5**

  - [ ] 4.5 Update layout metadata with social tags
    - Update `app/layout.tsx` with enhanced Open Graph configuration
    - Add Twitter card configuration
    - Add Facebook app_id if available
    - _Requirements: 2.1-2.6_


- [x] 5. Implement multi-language SEO support







  - [x] 5.1 Create i18n SEO module


    - Create `lib/seo/i18n-seo.ts`
    - Implement `generateHreflangTags()` function
    - Implement `getLocalizedMetadata()` function
    - Support en, fr, ar locales
    - _Requirements: 3.1, 3.2, 3.3_

  - [x] 5.2 Write property test for hreflang tags


    - **Property 4: Multi-language SEO Completeness**
    - Test that any supported locale generates valid hreflang tags for all locales
    - **Validates: Requirements 3.1, 3.2, 3.3**

  - [x] 5.3 Create localized translations for SEO


    - Create `lib/seo/translations.ts` with meta descriptions in en, fr, ar
    - Include localized keywords for each language
    - _Requirements: 3.2, 3.7_

  - [x] 5.4 Update sitemap with alternate language URLs


    - Update `app/sitemap.ts` to include hreflang alternates
    - Add all supported locales to each sitemap entry
    - _Requirements: 3.4_

  - [x] 5.5 Write property test for sitemap alternates


    - **Property 5: Sitemap Alternate URLs**
    - Test that sitemap includes correct alternates for all locales
    - **Validates: Requirements 3.4**

  - [x] 5.6 Add geo-targeting meta tags


    - Add geo.region, geo.placename meta tags for Tunisia
    - Include regional targeting for France, MENA countries
    - _Requirements: 3.5, 3.6, 8.1_

- [x] 6. Checkpoint - Ensure all tests pass









  - Ensure all tests pass, ask the user if questions arise.


- [-] 7. Implement content optimization







  - [x] 7.1 Create content validation utilities

    - Create `lib/seo/content-validation.ts`
    - Implement `validateHeadingHierarchy()` function
    - Implement `validateAltText()` function
    - Implement `validateAnchorText()` function
    - _Requirements: 6.1, 6.2, 6.3_

  - [x] 7.2 Write property test for heading hierarchy


    - **Property 9: Heading Hierarchy Validity**
    - Test that rendered content has valid heading hierarchy (no skipped levels)
    - **Validates: Requirements 6.1**


  - [ ] 7.3 Write property test for image alt text
    - **Property 10: Image Alt Text Presence**
    - Test that all images have non-empty descriptive alt text
    - **Validates: Requirements 6.2**


  - [ ] 7.4 Write property test for anchor text quality
    - **Property 11: Anchor Text Quality**
    - Test that internal links don't use generic anchor text
    - **Validates: Requirements 6.3**

  - [x] 7.5 Create title and description generators


    - Implement `generatePageTitle()` with format pattern
    - Implement `generateMetaDescription()` with length constraints
    - _Requirements: 6.4, 6.5_

  - [-] 7.6 Write property test for page title format

    - **Property 12: Page Title Format**
    - Test that titles follow format pattern and are 30-60 characters
    - **Validates: Requirements 6.4**

  - [ ] 7.7 Write property test for meta description length

    - **Property 13: Meta Description Length**
    - Test that descriptions are 150-160 characters with keywords
    - **Validates: Requirements 6.5**

  - [ ] 7.8 Update page content with optimized headings and alt text
    - Review and update all image alt attributes in `app/page.tsx`
    - Ensure heading hierarchy is correct throughout
    - Update internal link anchor text
    - _Requirements: 6.1, 6.2, 6.3_



- [x] 8. Implement sitemap and robots enhancements





  - [x] 8.1 Enhance sitemap generation


    - Update `app/sitemap.ts` with lastmod dates from content
    - Add priority scores based on page importance
    - Include changeFrequency for each entry
    - _Requirements: 5.1_

  - [x] 8.2 Write property test for sitemap integrity


    - **Property 7: Sitemap Entry Integrity**
    - Test that entries have valid lastmod, priority (0.0-1.0)
    - **Validates: Requirements 5.1, 13.1**


  - [x] 8.3 Enhance robots.txt configuration

    - Update `app/robots.ts` with crawl-delay
    - Ensure sitemap location is correct
    - Add allow/disallow rules as needed
    - _Requirements: 5.2_


  - [x] 8.4 Implement canonical URL handling

    - Add self-referencing canonical tags to all pages
    - Create utility function for canonical URL generation
    - _Requirements: 5.3_


  - [x] 8.5 Write property test for canonical URLs

    - **Property 8: Canonical URL Self-Reference**
    - Test that canonical tag matches page URL
    - **Validates: Requirements 5.3**

  - [x] 8.6 Create custom 404 error page


    - Create `app/not-found.tsx` with navigation and search suggestions
    - Include links to popular content
    - _Requirements: 5.4_



- [x] 9. Checkpoint - Ensure all tests pass






  - Ensure all tests pass, ask the user if questions arise.



- [ ] 10. Implement PWA and mobile optimization



  - [x] 10.1 Enhance PWA manifest


    - Update `app/manifest.ts` with complete configuration
    - Add all required icon sizes (192x192, 512x512, maskable)
    - Include categories, lang, dir fields
    - _Requirements: 12.2_


  - [ ] 10.2 Write property test for PWA manifest

    - **Property 15: PWA Manifest Validity**
    - Test that manifest includes all required fields and icon sizes
    - **Validates: Requirements 12.2**

  - [ ] 10.3 Implement service worker for offline support
    - Create basic service worker for caching key pages
    - Cache critical assets for offline access
    - _Requirements: 12.3_

  - [ ] 10.4 Optimize mobile viewport and touch targets
    - Ensure all interactive elements are minimum 48x48px
    - Verify viewport meta tag configuration
    - _Requirements: 12.1, 12.5_

- [x] 11. Implement accessibility enhancements





  - [x] 11.1 Add ARIA labels to interactive elements


    - Review all buttons, links, and form inputs
    - Add aria-label or aria-labelledby where needed
    - Ensure visible focus indicators
    - _Requirements: 15.1, 15.2_

  - [x] 11.2 Write property test for accessibility


    - **Property 16: Accessibility ARIA Labels**
    - Test that interactive elements have accessible names
    - **Validates: Requirements 15.1, 15.4**

  - [x] 11.3 Implement reduced motion support


    - Add prefers-reduced-motion media query handling
    - Provide alternatives for animated content
    - _Requirements: 15.7_

  - [x] 11.4 Verify color contrast compliance


    - Check all text meets WCAG 2.1 AA contrast ratios
    - Update colors if needed for compliance
    - _Requirements: 15.3_





- [ ] 12. Implement analytics and tracking




  - [x] 12.1 Configure Google Search Console verification


    - Add verification meta tag to layout
    - Document verification process in SEO_SETUP.md
    - _Requirements: 10.1_


  - [ ] 12.2 Implement Core Web Vitals reporting

    - Create `lib/seo/web-vitals.ts` for metrics reporting
    - Send LCP, CLS, INP metrics to analytics
    - _Requirements: 10.3_

  - [ ] 12.3 Set up conversion tracking
    - Track contact form submissions
    - Track email and social profile clicks
    - _Requirements: 10.6_

  - [ ] 12.4 Configure Bing Webmaster Tools
    - Add Bing verification meta tag
    - Document setup process
    - _Requirements: 10.7_



- [-] 13. Implement performance optimizations

  - [ ] 13.1 Optimize image loading
    - Ensure all images use Next.js Image component
    - Add srcset for responsive images
    - Implement lazy loading for below-fold images
    - _Requirements: 4.4_

  - [ ] 13.2 Optimize font loading
    - Verify font-display: swap is configured
    - Preload critical fonts
    - _Requirements: 4.8_

  - [ ] 13.3 Implement critical CSS inlining
    - Ensure above-the-fold styles are inlined
    - Defer non-critical CSS loading
    - _Requirements: 4.5_

  - [ ] 13.4 Verify code splitting configuration
    - Ensure dynamic imports are used for heavy components
    - Verify bundle sizes are optimized
    - _Requirements: 4.6_

- [ ] 14. Final integration and documentation
  - [ ] 14.1 Update SEO_SETUP.md documentation
    - Document all new SEO features
    - Add verification checklist
    - Include testing instructions
    - _Requirements: Documentation_

  - [ ] 14.2 Create SEO validation script
    - Create script to validate all schemas
    - Add to CI/CD pipeline
    - _Requirements: 1.5_

  - [ ] 14.3 Run Lighthouse audit and fix issues
    - Achieve 90+ performance score on mobile
    - Achieve 90+ accessibility score
    - Fix any identified issues
    - _Requirements: 4.7, 15.8_


- [x] 15. Final Checkpoint - Ensure all tests pass





  - Ensure all tests pass, ask the user if questions arise.

