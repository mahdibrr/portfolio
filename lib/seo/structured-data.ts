/**
 * Structured Data Generator Module
 * Generates JSON-LD schemas for SEO structured data
 * 
 * Requirements: 1.1, 1.2, 1.3, 1.4, 1.6, 1.7, 1.8, 9.1, 11.1
 */

import { seoConfig, getFullUrl, getSameAsLinks, type SEOConfig, type AuthorInfo } from './config';

// ============================================================================
// Schema Type Definitions
// ============================================================================

/**
 * Base schema with context and type
 */
interface BaseSchema {
  '@context': 'https://schema.org';
  '@type': string;
}

/**
 * Person schema for author/developer information
 */
export interface PersonSchema extends BaseSchema {
  '@type': 'Person';
  name: string;
  jobTitle: string;
  description?: string;
  url: string;
  email: string;
  image: string;
  alumniOf: EducationalOrganizationSchema;
  knowsAbout: string[];
  sameAs: string[];
  address?: PostalAddressSchema;
  workLocation?: PlaceSchema;
}

/**
 * Educational organization schema
 */
export interface EducationalOrganizationSchema {
  '@type': 'EducationalOrganization';
  name: string;
  address?: PostalAddressSchema;
}

/**
 * Postal address schema
 */
export interface PostalAddressSchema {
  '@type': 'PostalAddress';
  addressLocality?: string;
  addressRegion?: string;
  addressCountry?: string;
}

/**
 * Place schema for work location
 */
export interface PlaceSchema {
  '@type': 'Place';
  name?: string;
  address?: PostalAddressSchema;
}


/**
 * CreativeWork schema for projects
 */
export interface CreativeWorkSchema extends BaseSchema {
  '@type': 'CreativeWork' | 'SoftwareApplication';
  name: string;
  description: string;
  creator: PersonReferenceSchema;
  dateCreated?: string;
  dateModified?: string;
  programmingLanguage?: string[];
  applicationCategory?: string;
  url?: string;
  image?: string;
}

/**
 * Person reference for creator field
 */
export interface PersonReferenceSchema {
  '@type': 'Person';
  name: string;
  url?: string;
}

/**
 * ItemList schema for skills
 */
export interface ItemListSchema extends BaseSchema {
  '@type': 'ItemList';
  name: string;
  description?: string;
  numberOfItems: number;
  itemListElement: ListItemSchema[];
}

/**
 * ListItem schema for individual skill items
 */
export interface ListItemSchema {
  '@type': 'ListItem';
  position: number;
  name: string;
  description?: string;
}

/**
 * ContactPoint schema
 */
export interface ContactPointSchema extends BaseSchema {
  '@type': 'ContactPoint';
  contactType: string;
  email?: string;
  url?: string;
  availableLanguage?: string[];
}

/**
 * FAQPage schema
 */
export interface FAQPageSchema extends BaseSchema {
  '@type': 'FAQPage';
  mainEntity: QuestionSchema[];
}

/**
 * Question schema for FAQ
 */
export interface QuestionSchema {
  '@type': 'Question';
  name: string;
  acceptedAnswer: AnswerSchema;
}

/**
 * Answer schema for FAQ
 */
export interface AnswerSchema {
  '@type': 'Answer';
  text: string;
}

/**
 * SoftwareSourceCode schema for repositories
 */
export interface SoftwareSourceCodeSchema extends BaseSchema {
  '@type': 'SoftwareSourceCode';
  name: string;
  description?: string;
  programmingLanguage: string | string[];
  codeRepository?: string;
  license?: string;
  author?: PersonReferenceSchema;
  dateCreated?: string;
  dateModified?: string;
}

/**
 * EducationalOccupationalCredential schema
 */
export interface EducationalCredentialSchema extends BaseSchema {
  '@type': 'EducationalOccupationalCredential';
  name: string;
  credentialCategory: string;
  educationalLevel?: string;
  recognizedBy?: EducationalOrganizationSchema;
}

// ============================================================================
// Input Types for Schema Generators
// ============================================================================

/**
 * Project data for CreativeWork schema
 */
export interface ProjectData {
  name: string;
  description: string;
  technologies?: string[];
  dateCreated?: string;
  dateModified?: string;
  url?: string;
  image?: string;
  category?: string;
}

/**
 * Skill data for ItemList schema
 */
export interface SkillData {
  name: string;
  proficiency?: number;
  description?: string;
}

/**
 * FAQ item data
 */
export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Repository data for SoftwareSourceCode schema
 */
export interface RepositoryData {
  name: string;
  description?: string;
  programmingLanguage: string | string[];
  codeRepository?: string;
  license?: string;
  dateCreated?: string;
  dateModified?: string;
}


// ============================================================================
// Schema Generator Functions
// ============================================================================

/**
 * Generate Person schema for the portfolio owner
 * 
 * Requirements: 1.1, 1.6, 1.7
 * 
 * @param config - Optional SEO config, defaults to seoConfig
 * @param skills - Optional array of skills for knowsAbout field
 * @returns PersonSchema object
 */
export function generatePersonSchema(
  config: SEOConfig = seoConfig,
  skills: string[] = []
): PersonSchema {
  const { author, geo } = config;
  
  // Build alumniOf schema
  const alumniOf: EducationalOrganizationSchema = {
    '@type': 'EducationalOrganization',
    name: author.alumniOf.name,
  };
  
  // Add location to alumniOf if available
  if (author.alumniOf.location) {
    alumniOf.address = {
      '@type': 'PostalAddress',
      addressLocality: author.alumniOf.location,
    };
  }
  
  // Build the Person schema
  const personSchema: PersonSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    jobTitle: author.jobTitle,
    url: config.baseUrl,
    email: author.email,
    image: getFullUrl(author.image),
    alumniOf,
    knowsAbout: skills.length > 0 ? skills : config.keywords,
    sameAs: getSameAsLinks(),
  };
  
  // Add optional description
  if (author.description) {
    personSchema.description = author.description;
  }
  
  // Add address if geo placename is available
  if (geo.placename) {
    personSchema.address = {
      '@type': 'PostalAddress',
      addressLocality: geo.placename,
      addressCountry: geo.primaryRegion,
    };
    
    personSchema.workLocation = {
      '@type': 'Place',
      name: geo.placename,
      address: personSchema.address,
    };
  }
  
  return personSchema;
}

/**
 * Generate CreativeWork schema for a project
 * 
 * Requirements: 1.2
 * 
 * @param project - Project data
 * @param config - Optional SEO config
 * @returns CreativeWorkSchema object
 */
export function generateCreativeWorkSchema(
  project: ProjectData,
  config: SEOConfig = seoConfig
): CreativeWorkSchema {
  const schema: CreativeWorkSchema = {
    '@context': 'https://schema.org',
    '@type': project.category === 'software' ? 'SoftwareApplication' : 'CreativeWork',
    name: project.name,
    description: project.description,
    creator: {
      '@type': 'Person',
      name: config.author.name,
      url: config.baseUrl,
    },
  };
  
  // Add optional fields
  if (project.dateCreated) {
    schema.dateCreated = project.dateCreated;
  }
  
  if (project.dateModified) {
    schema.dateModified = project.dateModified;
  }
  
  if (project.technologies && project.technologies.length > 0) {
    schema.programmingLanguage = project.technologies;
  }
  
  if (project.url) {
    schema.url = project.url;
  }
  
  if (project.image) {
    schema.image = project.image.startsWith('http') ? project.image : getFullUrl(project.image);
  }
  
  if (project.category) {
    schema.applicationCategory = project.category;
  }
  
  return schema;
}

/**
 * Generate ItemList schema for skills
 * 
 * Requirements: 1.3
 * 
 * @param skills - Array of skill data
 * @param listName - Name for the skill list
 * @returns ItemListSchema object
 */
export function generateItemListSchema(
  skills: SkillData[],
  listName: string = 'Technical Skills'
): ItemListSchema {
  const itemListElement: ListItemSchema[] = skills.map((skill, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: skill.name,
    ...(skill.description && { description: skill.description }),
  }));
  
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    numberOfItems: skills.length,
    itemListElement,
  };
}


/**
 * Generate ContactPoint schema
 * 
 * Requirements: 1.4
 * 
 * @param config - Optional SEO config
 * @returns ContactPointSchema object
 */
export function generateContactPointSchema(
  config: SEOConfig = seoConfig
): ContactPointSchema {
  const availableLanguages = config.languages.map(lang => lang.name);
  
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPoint',
    contactType: 'professional',
    email: config.author.email,
    url: config.baseUrl,
    availableLanguage: availableLanguages,
  };
}

/**
 * Generate FAQPage schema
 * 
 * Requirements: 11.1
 * 
 * @param faqs - Array of FAQ items
 * @returns FAQPageSchema object
 */
export function generateFAQSchema(faqs: FAQItem[]): FAQPageSchema {
  const mainEntity: QuestionSchema[] = faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  }));
  
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
  };
}

/**
 * Generate SoftwareSourceCode schema for repositories
 * 
 * Requirements: 1.8, 9.1
 * 
 * @param repo - Repository data
 * @param config - Optional SEO config
 * @returns SoftwareSourceCodeSchema object
 */
export function generateSoftwareSchema(
  repo: RepositoryData,
  config: SEOConfig = seoConfig
): SoftwareSourceCodeSchema {
  const schema: SoftwareSourceCodeSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: repo.name,
    programmingLanguage: repo.programmingLanguage,
    author: {
      '@type': 'Person',
      name: config.author.name,
      url: config.baseUrl,
    },
  };
  
  // Add optional fields
  if (repo.description) {
    schema.description = repo.description;
  }
  
  if (repo.codeRepository) {
    schema.codeRepository = repo.codeRepository;
  }
  
  if (repo.license) {
    schema.license = repo.license;
  }
  
  if (repo.dateCreated) {
    schema.dateCreated = repo.dateCreated;
  }
  
  if (repo.dateModified) {
    schema.dateModified = repo.dateModified;
  }
  
  return schema;
}

/**
 * Generate EducationalOccupationalCredential schema
 * 
 * Requirements: 1.7
 * 
 * @param config - Optional SEO config
 * @returns EducationalCredentialSchema object
 */
export function generateEducationSchema(
  config: SEOConfig = seoConfig
): EducationalCredentialSchema {
  const { author } = config;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalCredential',
    name: author.alumniOf.degree,
    credentialCategory: 'degree',
    educationalLevel: author.alumniOf.field,
    recognizedBy: {
      '@type': 'EducationalOrganization',
      name: author.alumniOf.name,
      ...(author.alumniOf.location && {
        address: {
          '@type': 'PostalAddress',
          addressLocality: author.alumniOf.location,
        },
      }),
    },
  };
}

// ============================================================================
// Combined Schema Generator
// ============================================================================

/**
 * Generate all structured data schemas for the portfolio
 * 
 * @param options - Options for schema generation
 * @returns Array of all schema objects
 */
export function generateAllSchemas(options: {
  skills?: SkillData[];
  projects?: ProjectData[];
  faqs?: FAQItem[];
  repositories?: RepositoryData[];
  config?: SEOConfig;
} = {}): BaseSchema[] {
  const config = options.config || seoConfig;
  const schemas: BaseSchema[] = [];
  
  // Always include Person schema
  const skillNames = options.skills?.map(s => s.name) || [];
  schemas.push(generatePersonSchema(config, skillNames));
  
  // Always include Education schema
  schemas.push(generateEducationSchema(config));
  
  // Always include ContactPoint schema
  schemas.push(generateContactPointSchema(config));
  
  // Add skills ItemList if provided
  if (options.skills && options.skills.length > 0) {
    schemas.push(generateItemListSchema(options.skills));
  }
  
  // Add CreativeWork schemas for projects
  if (options.projects) {
    for (const project of options.projects) {
      schemas.push(generateCreativeWorkSchema(project, config));
    }
  }
  
  // Add FAQ schema if provided
  if (options.faqs && options.faqs.length > 0) {
    schemas.push(generateFAQSchema(options.faqs));
  }
  
  // Add SoftwareSourceCode schemas for repositories
  if (options.repositories) {
    for (const repo of options.repositories) {
      schemas.push(generateSoftwareSchema(repo, config));
    }
  }
  
  return schemas;
}

export default {
  generatePersonSchema,
  generateCreativeWorkSchema,
  generateItemListSchema,
  generateContactPointSchema,
  generateFAQSchema,
  generateSoftwareSchema,
  generateEducationSchema,
  generateAllSchemas,
};
