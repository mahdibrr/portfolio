/**
 * SEO Translations Module
 * Localized meta descriptions, titles, and keywords for supported languages
 * 
 * Requirements: 3.2, 3.7
 */

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Translation set for a specific page
 */
export interface PageTranslations {
  title: string;
  description: string;
  keywords: string[];
}

/**
 * Complete translations for all pages in a language
 */
export interface LanguageTranslations {
  locale: string;
  pages: {
    home: PageTranslations;
    about: PageTranslations;
    projects: PageTranslations;
    skills: PageTranslations;
    contact: PageTranslations;
  };
  common: {
    siteName: string;
    authorName: string;
    jobTitle: string;
  };
}

// ============================================================================
// English Translations
// ============================================================================

export const enTranslations: LanguageTranslations = {
  locale: 'en_US',
  pages: {
    home: {
      title: 'Mahdi Ben Rhouma - Full-Stack Developer | React, Next.js, FastAPI',
      description: 'Full-stack developer specializing in React, Next.js, FastAPI, and Spring Boot. Available for freelance and full-time opportunities in Tunisia, France, and remote.',
      keywords: [
        'full-stack developer',
        'React developer',
        'Next.js developer',
        'FastAPI developer',
        'Spring Boot developer',
        'web developer Tunisia',
        'hire developer',
        'freelance developer',
        'remote developer',
        'JavaScript developer',
        'TypeScript developer',
        'Python developer',
        'Java developer'
      ]
    },
    about: {
      title: 'About Mahdi Ben Rhouma - Full-Stack Developer',
      description: 'Learn about Mahdi Ben Rhouma, a full-stack developer from Tunisia with expertise in modern web technologies. Graduate of Sesame University with experience in React, Next.js, and backend development.',
      keywords: [
        'about developer',
        'developer profile',
        'Sesame University',
        'Tunisia developer',
        'web developer background',
        'developer experience',
        'full-stack engineer'
      ]
    },
    projects: {
      title: 'Projects Portfolio - Mahdi Ben Rhouma',
      description: 'Explore web development projects by Mahdi Ben Rhouma featuring React, Next.js, FastAPI, and Spring Boot. Real-world applications showcasing modern development practices.',
      keywords: [
        'web development projects',
        'React projects',
        'Next.js portfolio',
        'FastAPI applications',
        'Spring Boot projects',
        'developer portfolio',
        'code examples',
        'project showcase'
      ]
    },
    skills: {
      title: 'Technical Skills - Mahdi Ben Rhouma',
      description: 'Technical skills and expertise: React, Next.js, TypeScript, FastAPI, Python, Spring Boot, Java, PostgreSQL, MongoDB, Docker, and modern web development tools.',
      keywords: [
        'React skills',
        'Next.js expertise',
        'TypeScript developer',
        'FastAPI skills',
        'Python developer',
        'Spring Boot expertise',
        'Java developer',
        'database skills',
        'Docker skills',
        'web development skills'
      ]
    },
    contact: {
      title: 'Contact Mahdi Ben Rhouma - Hire Full-Stack Developer',
      description: 'Get in touch with Mahdi Ben Rhouma for freelance projects, full-time opportunities, or collaboration. Available for remote work and on-site in Tunisia.',
      keywords: [
        'hire developer',
        'contact developer',
        'freelance developer',
        'developer for hire',
        'remote developer',
        'Tunisia developer contact',
        'web developer hire'
      ]
    }
  },
  common: {
    siteName: 'Mahdi Ben Rhouma Portfolio',
    authorName: 'Mahdi Ben Rhouma',
    jobTitle: 'Full-Stack Developer'
  }
};

// ============================================================================
// French Translations
// ============================================================================

export const frTranslations: LanguageTranslations = {
  locale: 'fr_FR',
  pages: {
    home: {
      title: 'Mahdi Ben Rhouma - Développeur Full-Stack | React, Next.js, FastAPI',
      description: 'Développeur full-stack spécialisé en React, Next.js, FastAPI et Spring Boot. Disponible pour missions freelance et opportunités CDI en Tunisie, France et à distance.',
      keywords: [
        'développeur full-stack',
        'développeur React',
        'développeur Next.js',
        'développeur FastAPI',
        'développeur Spring Boot',
        'développeur web Tunisie',
        'embaucher développeur',
        'développeur freelance',
        'développeur remote',
        'développeur JavaScript',
        'développeur TypeScript',
        'développeur Python',
        'développeur Java'
      ]
    },
    about: {
      title: 'À propos de Mahdi Ben Rhouma - Développeur Full-Stack',
      description: 'Découvrez Mahdi Ben Rhouma, développeur full-stack tunisien expert en technologies web modernes. Diplômé de l\'Université Sesame avec expérience en React, Next.js et développement backend.',
      keywords: [
        'à propos développeur',
        'profil développeur',
        'Université Sesame',
        'développeur Tunisie',
        'parcours développeur web',
        'expérience développeur',
        'ingénieur full-stack'
      ]
    },
    projects: {
      title: 'Portfolio de Projets - Mahdi Ben Rhouma',
      description: 'Explorez les projets de développement web de Mahdi Ben Rhouma avec React, Next.js, FastAPI et Spring Boot. Applications réelles démontrant les pratiques modernes de développement.',
      keywords: [
        'projets développement web',
        'projets React',
        'portfolio Next.js',
        'applications FastAPI',
        'projets Spring Boot',
        'portfolio développeur',
        'exemples de code',
        'vitrine projets'
      ]
    },
    skills: {
      title: 'Compétences Techniques - Mahdi Ben Rhouma',
      description: 'Compétences et expertise techniques : React, Next.js, TypeScript, FastAPI, Python, Spring Boot, Java, PostgreSQL, MongoDB, Docker et outils de développement web modernes.',
      keywords: [
        'compétences React',
        'expertise Next.js',
        'développeur TypeScript',
        'compétences FastAPI',
        'développeur Python',
        'expertise Spring Boot',
        'développeur Java',
        'compétences bases de données',
        'compétences Docker',
        'compétences développement web'
      ]
    },
    contact: {
      title: 'Contacter Mahdi Ben Rhouma - Embaucher Développeur Full-Stack',
      description: 'Contactez Mahdi Ben Rhouma pour projets freelance, opportunités CDI ou collaboration. Disponible pour travail à distance et sur site en Tunisie.',
      keywords: [
        'embaucher développeur',
        'contacter développeur',
        'développeur freelance',
        'développeur à embaucher',
        'développeur remote',
        'contact développeur Tunisie',
        'embauche développeur web'
      ]
    }
  },
  common: {
    siteName: 'Portfolio Mahdi Ben Rhouma',
    authorName: 'Mahdi Ben Rhouma',
    jobTitle: 'Développeur Full-Stack'
  }
};

// ============================================================================
// Arabic Translations
// ============================================================================

export const arTranslations: LanguageTranslations = {
  locale: 'ar_TN',
  pages: {
    home: {
      title: 'مهدي بن رحومة - مطور ويب متكامل | React, Next.js, FastAPI',
      description: 'مطور ويب متكامل متخصص في React و Next.js و FastAPI و Spring Boot. متاح للعمل الحر والوظائف بدوام كامل في تونس وفرنسا والعمل عن بعد.',
      keywords: [
        'مطور ويب متكامل',
        'مطور React',
        'مطور Next.js',
        'مطور FastAPI',
        'مطور Spring Boot',
        'مطور ويب تونس',
        'توظيف مطور',
        'مطور حر',
        'مطور عن بعد',
        'مطور JavaScript',
        'مطور TypeScript',
        'مطور Python',
        'مطور Java'
      ]
    },
    about: {
      title: 'عن مهدي بن رحومة - مطور ويب متكامل',
      description: 'تعرف على مهدي بن رحومة، مطور ويب متكامل من تونس خبير في تقنيات الويب الحديثة. خريج جامعة سمسم مع خبرة في React و Next.js والتطوير الخلفي.',
      keywords: [
        'عن المطور',
        'ملف المطور',
        'جامعة سمسم',
        'مطور تونس',
        'خلفية مطور الويب',
        'خبرة المطور',
        'مهندس متكامل'
      ]
    },
    projects: {
      title: 'معرض المشاريع - مهدي بن رحومة',
      description: 'استكشف مشاريع تطوير الويب لمهدي بن رحومة باستخدام React و Next.js و FastAPI و Spring Boot. تطبيقات واقعية تعرض ممارسات التطوير الحديثة.',
      keywords: [
        'مشاريع تطوير الويب',
        'مشاريع React',
        'معرض Next.js',
        'تطبيقات FastAPI',
        'مشاريع Spring Boot',
        'معرض المطور',
        'أمثلة الكود',
        'عرض المشاريع'
      ]
    },
    skills: {
      title: 'المهارات التقنية - مهدي بن رحومة',
      description: 'المهارات والخبرات التقنية: React و Next.js و TypeScript و FastAPI و Python و Spring Boot و Java و PostgreSQL و MongoDB و Docker وأدوات تطوير الويب الحديثة.',
      keywords: [
        'مهارات React',
        'خبرة Next.js',
        'مطور TypeScript',
        'مهارات FastAPI',
        'مطور Python',
        'خبرة Spring Boot',
        'مطور Java',
        'مهارات قواعد البيانات',
        'مهارات Docker',
        'مهارات تطوير الويب'
      ]
    },
    contact: {
      title: 'اتصل بمهدي بن رحومة - توظيف مطور ويب متكامل',
      description: 'تواصل مع مهدي بن رحومة للمشاريع الحرة أو فرص العمل بدوام كامل أو التعاون. متاح للعمل عن بعد وفي الموقع في تونس.',
      keywords: [
        'توظيف مطور',
        'اتصل بالمطور',
        'مطور حر',
        'مطور للتوظيف',
        'مطور عن بعد',
        'اتصال مطور تونس',
        'توظيف مطور ويب'
      ]
    }
  },
  common: {
    siteName: 'معرض مهدي بن رحومة',
    authorName: 'مهدي بن رحومة',
    jobTitle: 'مطور ويب متكامل'
  }
};

// ============================================================================
// Translation Registry
// ============================================================================

/**
 * Registry of all available translations
 */
export const translations: Record<string, LanguageTranslations> = {
  en: enTranslations,
  fr: frTranslations,
  ar: arTranslations
};

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Get translations for a specific locale
 * 
 * @param locale - The locale code (e.g., 'en', 'fr', 'ar')
 * @returns Language translations or English as fallback
 */
export function getTranslations(locale: string): LanguageTranslations {
  return translations[locale] || translations.en;
}

/**
 * Get page translations for a specific locale and page
 * 
 * @param locale - The locale code
 * @param page - The page identifier
 * @returns Page translations or home page as fallback
 */
export function getPageTranslations(
  locale: string,
  page: keyof LanguageTranslations['pages']
): PageTranslations {
  const langTranslations = getTranslations(locale);
  return langTranslations.pages[page] || langTranslations.pages.home;
}

/**
 * Get localized title for a page
 * 
 * @param locale - The locale code
 * @param page - The page identifier
 * @returns Localized page title
 */
export function getLocalizedTitle(
  locale: string,
  page: keyof LanguageTranslations['pages'] = 'home'
): string {
  const pageTranslations = getPageTranslations(locale, page);
  return pageTranslations.title;
}

/**
 * Get localized description for a page
 * 
 * @param locale - The locale code
 * @param page - The page identifier
 * @returns Localized page description
 */
export function getLocalizedDescription(
  locale: string,
  page: keyof LanguageTranslations['pages'] = 'home'
): string {
  const pageTranslations = getPageTranslations(locale, page);
  return pageTranslations.description;
}

/**
 * Get localized keywords for a page
 * 
 * @param locale - The locale code
 * @param page - The page identifier
 * @returns Array of localized keywords
 */
export function getLocalizedKeywords(
  locale: string,
  page: keyof LanguageTranslations['pages'] = 'home'
): string[] {
  const pageTranslations = getPageTranslations(locale, page);
  return pageTranslations.keywords;
}

/**
 * Get common translations (site name, author name, job title)
 * 
 * @param locale - The locale code
 * @returns Common translations
 */
export function getCommonTranslations(locale: string) {
  const langTranslations = getTranslations(locale);
  return langTranslations.common;
}
