/**
 * Property-Based Tests for Structured Data Generation
 * 
 * **Feature: seo-traffic-enhancement, Property 1: Schema Generation Validity**
 * **Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.6, 1.7, 1.8, 9.1, 11.1**
 * 
 * Tests that any valid input produces valid JSON-LD schemas according to Schema.org specifications.
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import {
  generatePersonSchema,
  generateCreativeWorkSchema,
  generateItemListSchema,
  generateContactPointSchema,
  generateFAQSchema,
  generateSoftwareSchema,
  generateEducationSchema,
  generateAllSchemas,
  type PersonSchema,
  type CreativeWorkSchema,
  type ItemListSchema,
  type ContactPointSchema,
  type FAQPageSchema,
  type SoftwareSourceCodeSchema,
} from '../structured-data';
import {
  seoConfigArb,
  projectDataArb,
  skillDataArb,
  skillsArrayArb,
  faqItemArb,
  faqsArrayArb,
  repositoryDataArb,
  nonEmptyStringArb,
} from './arbitraries';

describe('Structured Data Property Tests', () => {
  /**
   * Property 1: Schema Generation Validity - Person Schema
   * For any valid SEO config, generatePersonSchema produces valid Person schema
   * 
   * **Feature: seo-traffic-enhancement, Property 1: Schema Generation Validity**
   * **Validates: Requirements 1.1, 1.6, 1.7**
   */
  describe('Property 1: Person Schema Generation Validity', () => {
    it('generates valid Person schema with all required fields for any valid config', () => {
      fc.assert(
        fc.property(seoConfigArb, (config) => {
          const schema = generatePersonSchema(config);
          
          // Verify @context and @type
          expect(schema['@context']).toBe('https://schema.org');
          expect(schema['@type']).toBe('Person');
          
          // Verify required Person fields
          expect(schema.name).toBeTruthy();
          expect(typeof schema.name).toBe('string');
          
          expect(schema.jobTitle).toBeTruthy();
          expect(typeof schema.jobTitle).toBe('string');
          
          expect(schema.email).toBeTruthy();
          expect(typeof schema.email).toBe('string');
          
          expect(schema.url).toBeTruthy();
          expect(typeof schema.url).toBe('string');
          
          expect(schema.image).toBeTruthy();
          expect(typeof schema.image).toBe('string');
        }),
        { numRuns: 100 }
      );
    });

    it('always includes alumniOf with EducationalOrganization type', () => {
      fc.assert(
        fc.property(seoConfigArb, (config) => {
          const schema = generatePersonSchema(config);
          
          expect(schema.alumniOf).toBeDefined();
          expect(schema.alumniOf['@type']).toBe('EducationalOrganization');
          expect(schema.alumniOf.name).toBeTruthy();
        }),
        { numRuns: 100 }
      );
    });

    it('always includes knowsAbout array', () => {
      fc.assert(
        fc.property(seoConfigArb, (config) => {
          const schema = generatePersonSchema(config);
          
          expect(Array.isArray(schema.knowsAbout)).toBe(true);
        }),
        { numRuns: 100 }
      );
    });

    it('always includes sameAs array with social profile links', () => {
      fc.assert(
        fc.property(seoConfigArb, (config) => {
          const schema = generatePersonSchema(config);
          
          expect(Array.isArray(schema.sameAs)).toBe(true);
          // Should have at least one social link since config requires at least one
          expect(schema.sameAs.length).toBeGreaterThan(0);
        }),
        { numRuns: 100 }
      );
    });

    it('uses provided skills for knowsAbout when given', () => {
      fc.assert(
        fc.property(
          seoConfigArb,
          fc.array(nonEmptyStringArb, { minLength: 1, maxLength: 10 }),
          (config, skills) => {
            const schema = generatePersonSchema(config, skills);
            
            expect(schema.knowsAbout).toEqual(skills);
          }
        ),
        { numRuns: 100 }
      );
    });
  });


  /**
   * Property 1: Schema Generation Validity - CreativeWork Schema
   * For any valid project data, generateCreativeWorkSchema produces valid CreativeWork schema
   * 
   * **Feature: seo-traffic-enhancement, Property 1: Schema Generation Validity (continued)**
   * **Validates: Requirements 1.2**
   */
  describe('Property 1: CreativeWork Schema Generation Validity', () => {
    it('generates valid CreativeWork schema with all required fields for any project', () => {
      fc.assert(
        fc.property(projectDataArb, seoConfigArb, (project, config) => {
          const schema = generateCreativeWorkSchema(project, config);
          
          // Verify @context and @type
          expect(schema['@context']).toBe('https://schema.org');
          expect(['CreativeWork', 'SoftwareApplication']).toContain(schema['@type']);
          
          // Verify required fields
          expect(schema.name).toBeTruthy();
          expect(schema.name).toBe(project.name);
          
          expect(schema.description).toBeTruthy();
          expect(schema.description).toBe(project.description);
          
          // Verify creator reference
          expect(schema.creator).toBeDefined();
          expect(schema.creator['@type']).toBe('Person');
          expect(schema.creator.name).toBe(config.author.name);
        }),
        { numRuns: 100 }
      );
    });

    it('includes programmingLanguage when technologies are provided', () => {
      fc.assert(
        fc.property(
          projectDataArb.filter(p => Boolean(p.technologies && p.technologies.length > 0)),
          seoConfigArb,
          (project, config) => {
            const schema = generateCreativeWorkSchema(project, config);
            
            expect(schema.programmingLanguage).toBeDefined();
            expect(schema.programmingLanguage).toEqual(project.technologies);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  /**
   * Property 1: Schema Generation Validity - ItemList Schema
   * For any valid skills array, generateItemListSchema produces valid ItemList schema
   * 
   * **Feature: seo-traffic-enhancement, Property 1: Schema Generation Validity (continued)**
   * **Validates: Requirements 1.3**
   */
  describe('Property 1: ItemList Schema Generation Validity', () => {
    it('generates valid ItemList schema with correct number of items', () => {
      fc.assert(
        fc.property(skillsArrayArb, (skills) => {
          const schema = generateItemListSchema(skills);
          
          // Verify @context and @type
          expect(schema['@context']).toBe('https://schema.org');
          expect(schema['@type']).toBe('ItemList');
          
          // Verify numberOfItems matches actual items
          expect(schema.numberOfItems).toBe(skills.length);
          expect(schema.itemListElement.length).toBe(skills.length);
        }),
        { numRuns: 100 }
      );
    });

    it('generates ListItem elements with correct positions', () => {
      fc.assert(
        fc.property(skillsArrayArb, (skills) => {
          const schema = generateItemListSchema(skills);
          
          // Verify each item has correct position (1-indexed)
          schema.itemListElement.forEach((item, index) => {
            expect(item['@type']).toBe('ListItem');
            expect(item.position).toBe(index + 1);
            expect(item.name).toBe(skills[index].name);
          });
        }),
        { numRuns: 100 }
      );
    });
  });

  /**
   * Property 1: Schema Generation Validity - ContactPoint Schema
   * For any valid config, generateContactPointSchema produces valid ContactPoint schema
   * 
   * **Feature: seo-traffic-enhancement, Property 1: Schema Generation Validity (continued)**
   * **Validates: Requirements 1.4**
   */
  describe('Property 1: ContactPoint Schema Generation Validity', () => {
    it('generates valid ContactPoint schema with all required fields', () => {
      fc.assert(
        fc.property(seoConfigArb, (config) => {
          const schema = generateContactPointSchema(config);
          
          // Verify @context and @type
          expect(schema['@context']).toBe('https://schema.org');
          expect(schema['@type']).toBe('ContactPoint');
          
          // Verify required fields
          expect(schema.contactType).toBe('professional');
          expect(schema.email).toBe(config.author.email);
          expect(schema.url).toBe(config.baseUrl);
        }),
        { numRuns: 100 }
      );
    });

    it('includes available languages from config', () => {
      fc.assert(
        fc.property(seoConfigArb, (config) => {
          const schema = generateContactPointSchema(config);
          
          expect(Array.isArray(schema.availableLanguage)).toBe(true);
          expect(schema.availableLanguage?.length).toBe(config.languages.length);
        }),
        { numRuns: 100 }
      );
    });
  });


  /**
   * Property 14: FAQ Schema Structure
   * For any FAQ data, generateFAQSchema produces valid FAQPage schema with Question/Answer pairs
   * 
   * **Feature: seo-traffic-enhancement, Property 14: FAQ Schema Structure**
   * **Validates: Requirements 11.1**
   */
  describe('Property 14: FAQ Schema Structure', () => {
    it('generates valid FAQPage schema with Question/Answer pairs for any FAQ data', () => {
      fc.assert(
        fc.property(faqsArrayArb, (faqs) => {
          const schema = generateFAQSchema(faqs);
          
          // Verify @context and @type
          expect(schema['@context']).toBe('https://schema.org');
          expect(schema['@type']).toBe('FAQPage');
          
          // Verify mainEntity array
          expect(Array.isArray(schema.mainEntity)).toBe(true);
          expect(schema.mainEntity.length).toBe(faqs.length);
        }),
        { numRuns: 100 }
      );
    });

    it('each FAQ item has valid Question and Answer structure', () => {
      fc.assert(
        fc.property(faqsArrayArb, (faqs) => {
          const schema = generateFAQSchema(faqs);
          
          schema.mainEntity.forEach((item, index) => {
            // Verify Question structure
            expect(item['@type']).toBe('Question');
            expect(item.name).toBe(faqs[index].question);
            expect(item.name).toBeTruthy();
            
            // Verify Answer structure
            expect(item.acceptedAnswer).toBeDefined();
            expect(item.acceptedAnswer['@type']).toBe('Answer');
            expect(item.acceptedAnswer.text).toBe(faqs[index].answer);
            expect(item.acceptedAnswer.text).toBeTruthy();
          });
        }),
        { numRuns: 100 }
      );
    });

    it('handles single FAQ item correctly', () => {
      fc.assert(
        fc.property(faqItemArb, (faq) => {
          const schema = generateFAQSchema([faq]);
          
          expect(schema.mainEntity.length).toBe(1);
          expect(schema.mainEntity[0].name).toBe(faq.question);
          expect(schema.mainEntity[0].acceptedAnswer.text).toBe(faq.answer);
        }),
        { numRuns: 100 }
      );
    });
  });

  /**
   * Property 1: Schema Generation Validity - SoftwareSourceCode Schema
   * For any valid repository data, generateSoftwareSchema produces valid SoftwareSourceCode schema
   * 
   * **Feature: seo-traffic-enhancement, Property 1: Schema Generation Validity (continued)**
   * **Validates: Requirements 1.8, 9.1**
   */
  describe('Property 1: SoftwareSourceCode Schema Generation Validity', () => {
    it('generates valid SoftwareSourceCode schema with all required fields', () => {
      fc.assert(
        fc.property(repositoryDataArb, seoConfigArb, (repo, config) => {
          const schema = generateSoftwareSchema(repo, config);
          
          // Verify @context and @type
          expect(schema['@context']).toBe('https://schema.org');
          expect(schema['@type']).toBe('SoftwareSourceCode');
          
          // Verify required fields
          expect(schema.name).toBe(repo.name);
          expect(schema.programmingLanguage).toEqual(repo.programmingLanguage);
          
          // Verify author reference
          expect(schema.author).toBeDefined();
          expect(schema.author?.['@type']).toBe('Person');
          expect(schema.author?.name).toBe(config.author.name);
        }),
        { numRuns: 100 }
      );
    });

    it('includes optional fields when provided', () => {
      fc.assert(
        fc.property(
          repositoryDataArb.filter(r => Boolean(r.codeRepository)),
          seoConfigArb,
          (repo, config) => {
            const schema = generateSoftwareSchema(repo, config);
            
            expect(schema.codeRepository).toBe(repo.codeRepository);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  /**
   * Property 1: Schema Generation Validity - Education Schema
   * For any valid config, generateEducationSchema produces valid EducationalOccupationalCredential schema
   * 
   * **Feature: seo-traffic-enhancement, Property 1: Schema Generation Validity (continued)**
   * **Validates: Requirements 1.7**
   */
  describe('Property 1: Education Schema Generation Validity', () => {
    it('generates valid EducationalOccupationalCredential schema', () => {
      fc.assert(
        fc.property(seoConfigArb, (config) => {
          const schema = generateEducationSchema(config);
          
          // Verify @context and @type
          expect(schema['@context']).toBe('https://schema.org');
          expect(schema['@type']).toBe('EducationalOccupationalCredential');
          
          // Verify required fields
          expect(schema.name).toBe(config.author.alumniOf.degree);
          expect(schema.credentialCategory).toBe('degree');
          expect(schema.educationalLevel).toBe(config.author.alumniOf.field);
          
          // Verify recognizedBy
          expect(schema.recognizedBy).toBeDefined();
          expect(schema.recognizedBy?.['@type']).toBe('EducationalOrganization');
          expect(schema.recognizedBy?.name).toBe(config.author.alumniOf.name);
        }),
        { numRuns: 100 }
      );
    });
  });

  /**
   * Combined schema generation test
   */
  describe('generateAllSchemas', () => {
    it('always includes Person, Education, and ContactPoint schemas', () => {
      fc.assert(
        fc.property(seoConfigArb, (config) => {
          const schemas = generateAllSchemas({ config });
          
          // Should have at least 3 schemas (Person, Education, ContactPoint)
          expect(schemas.length).toBeGreaterThanOrEqual(3);
          
          // Verify types are present
          const types = schemas.map(s => s['@type']);
          expect(types).toContain('Person');
          expect(types).toContain('EducationalOccupationalCredential');
          expect(types).toContain('ContactPoint');
        }),
        { numRuns: 100 }
      );
    });
  });
});
