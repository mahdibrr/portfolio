import siteRoutes from "@/data/site-routes.json";
export type Locale = "en" | "fr";
export type Localized = { en: string; fr: string };

export const identity = {
  name: "Mahdi Ben Rhouma",
  email: "mahdi.benrhouma@sesame.com.tn",
  github: "https://github.com/mahdibrr",
  linkedin: "https://www.linkedin.com/in/mahdi-ben-rhouma-180971357/",
  url: "https://mahdibr.online",
};

export function routeFor(locale: Locale, route = "/") {
  const clean = route === "/" ? "" : `/${route.replace(/^\/+|\/+$/g, "")}`;
  return `${locale === "fr" ? "/fr" : ""}${clean}/`;
}

export const copy = {
  en: {
    nav: {
      work: "Selected work",
      openSource: "Open source",
      writing: "Writing",
      services: "Services",
      about: "About",
      contact: "Let’s talk",
      menu: "Open navigation",
      close: "Close navigation",
      language: "Voir le site en français",
    },
    role: "Full-stack developer",
    location: "Based in Tunisia",
    available: "Open to projects & opportunities",
    hero: "I build websites and web applications with Next.js, React and Python. Recent work includes a laundry booking flow, a multilingual company site, and tools for debugging production errors.",
    explore: "Explore my work",
    aboutLink: "A little about me",
    scroll: "Scroll to explore",
    workLabel: "01 / Selected work",
    workTitle: "Work I’ve built.",
    workItalic: "What went into it.",
    workIntro:
      "A few projects that show how I approach interfaces, content and the details that make a website useful.",
    caseLink: "Explore the project",
    visit: "Visit the website",
    allWork: "Back to selected work",
    project: "Project",
    overview: "The context",
    focus: "What the project involves",
    details: "A closer look",
    stack: "Built with",
    prototype: "Interface prototype",
    live: "Live website",
    development: "In development",
    video: "Watch the recorded demo",
    servicesLabel: "02 / How I can help",
    servicesTitle: "Websites. Interfaces.",
    servicesItalic: "The code behind them.",
    servicesIntro:
      "A company website, a product interface or a backend that needs attention. I can help define the next step and build it.",
    servicesLink: "Explore my services",
    service1: "Websites & interfaces",
    service2: "Backend & integrations",
    service3: "Performance & technical SEO",
    service1Desc:
      "Responsive websites, multilingual content, booking flows and dashboards. Clear navigation and careful attention to the small interactions.",
    service2Desc:
      "APIs with Python or Java, authentication, data modelling and connecting the services your product relies on.",
    service3Desc:
      "Crawlable pages, useful metadata, accessible interfaces and a lighter frontend. The foundations of a site that is easier to find and use.",
    aboutLabel: "03 / The person behind the code",
    aboutTitle: "A developer who cares",
    aboutItalic: "about the whole picture.",
    aboutIntro:
      "I’m Mahdi, a developer based in Tunisia with a background in web development at Sesame University. I enjoy working where a practical problem meets a clear, usable interface.",
    aboutBody:
      "My work ranges from a laundry booking prototype to a multilingual company website and a publication for developers. Each has a different audience, and each asks for a different kind of care.",
    aboutCta: "More about me",
    languages: "Working in English & French",
    contactLabel: "04 / Start a conversation",
    contactTitle: "Tell me what",
    contactItalic: "you’re building.",
    contactIntro:
      "Have a project in mind or a role that sounds like a fit? A short note about the context and what you need is a good place to start.",
    emailLabel: "Or write directly",
    footer: "Design & development by Mahdi, in Tunisia.",
    backTop: "Back to top",
    servicesPageTitle: "Full-stack web development.",
    servicesPageItalic: "From the interface inward.",
    servicesPageIntro:
      "Websites and applications shaped around what people need to do. I work with React, Next.js, TypeScript, Python and Java, and I keep the interface and its underlying systems in the same conversation.",
    processLabel: "The working process",
    processTitle: "Clear scope. Close attention.",
    steps: [
      {
        title: "Understand the problem",
        body: "Start with the audience, the main task and the existing constraints. Turn that into a focused scope before adding features.",
      },
      {
        title: "Build the useful version",
        body: "Connect the content, interface and data flow. Make the core journey work on small screens as well as large ones.",
      },
      {
        title: "Check the details",
        body: "Review accessibility, performance and edge cases. Keep deployment and maintenance part of the work, rather than an afterthought.",
      },
    ],
    faqTitle: "A few practical questions",
    faq: [
      {
        question: "Can you work on an existing website?",
        answer:
          "Yes. An existing site or codebase can be reviewed first, then the work can focus on the most useful improvements: a clearer interface, a specific feature, a performance problem or technical SEO.",
      },
      {
        question: "Can a website be built in French and English?",
        answer:
          "Yes. The content, navigation and metadata can be provided at separate language URLs, so visitors and search engines can reach the right version directly.",
      },
      {
        question: "How do we decide the scope and price?",
        answer:
          "Start with a short description of the project, what already exists and what you need next. Scope and budget can then be discussed around those requirements.",
      },
      {
        question: "Where can I see your work?",
        answer:
          "The selected project pages include screenshots, implementation notes and links to live websites where available. The featured product repositories are private.",
      },
    ],
    aboutPageIntro:
      "I’m a full-stack developer based in Tunisia. I work across the visible interface and the code behind it, with a particular interest in web products that make a practical task easier.",
    background: "Background",
    backgroundBody:
      "My background is in Multimedia Informatics and web development at Sesame University. My toolkit includes React and Next.js for interfaces, TypeScript for application code, and FastAPI and Spring Boot for backend work.",
    approach: "What I pay attention to",
    approachBody:
      "The flow through a page, a useful error message, the way a form behaves on a phone, or the structure of a piece of content. Those details are part of the product, and I like working through them alongside the larger technical decisions.",
    workBody:
      "The work here includes completed websites, interface prototypes and projects in progress. I describe them as they are, with real screenshots and a clear distinction between what is available publicly and what is still being developed.",
    skillsTitle: "A practical toolkit",
  },
  fr: {
    nav: {
      work: "Projets",
      openSource: "Open source",
      writing: "Articles",
      services: "Services",
      about: "À propos",
      contact: "Parlons-en",
      menu: "Ouvrir la navigation",
      close: "Fermer la navigation",
      language: "View the website in English",
    },
    role: "Développeur full-stack",
    location: "Basé en Tunisie",
    available: "Ouvert aux projets & opportunités",
    hero: "Je développe des sites et applications web avec Next.js, React et Python. Parmi mes projets : un parcours de réservation de pressing, un site d’entreprise multilingue et des outils de dépannage en production.",
    explore: "Découvrir mes projets",
    aboutLink: "Quelques mots sur moi",
    scroll: "Explorer la suite",
    workLabel: "01 / Projets sélectionnés",
    workTitle: "Des projets concrets.",
    workItalic: "Le travail derrière.",
    workIntro:
      "Quelques projets pour découvrir mon approche des interfaces, du contenu et des détails qui rendent un site utile.",
    caseLink: "Découvrir le projet",
    visit: "Visiter le site",
    allWork: "Revenir aux projets",
    project: "Projet",
    overview: "Le contexte",
    focus: "Les points clés du projet",
    details: "De plus près",
    stack: "Technologies",
    prototype: "Prototype d’interface",
    live: "Site en ligne",
    development: "En développement",
    video: "Voir la démonstration enregistrée",
    servicesLabel: "02 / Comment je peux vous aider",
    servicesTitle: "Sites web. Interfaces.",
    servicesItalic: "Le code qui les relie.",
    servicesIntro:
      "Un site d’entreprise, une interface produit ou un backend à faire évoluer. Je peux vous aider à définir la prochaine étape et à la réaliser.",
    servicesLink: "Découvrir mes services",
    service1: "Sites web & interfaces",
    service2: "Backend & intégrations",
    service3: "Performance & SEO technique",
    service1Desc:
      "Sites responsive, contenus multilingues, parcours de réservation et tableaux de bord. Une navigation claire et des interactions soignées.",
    service2Desc:
      "API en Python ou Java, authentification, modèles de données et connexion des services dont votre produit a besoin.",
    service3Desc:
      "Pages accessibles aux moteurs, métadonnées utiles, interfaces accessibles et frontend plus léger. Les bases d’un site plus facile à trouver et à utiliser.",
    aboutLabel: "03 / La personne derrière le code",
    aboutTitle: "Un développeur attentif",
    aboutItalic: "à l’ensemble du produit.",
    aboutIntro:
      "Je suis Mahdi, développeur basé en Tunisie, avec une formation en développement web à l’Université Sesame. J’aime relier un besoin concret à une interface claire et agréable.",
    aboutBody:
      "Mes projets vont d’un prototype de réservation de pressing à un site d’entreprise multilingue et une publication pour développeurs. Chaque public appelle une approche différente.",
    aboutCta: "En savoir plus",
    languages: "Travail en français & en anglais",
    contactLabel: "04 / Commençons une conversation",
    contactTitle: "Parlez-moi de",
    contactItalic: "votre projet.",
    contactIntro:
      "Vous avez un projet ou une opportunité à partager ? Quelques mots sur le contexte et votre besoin sont un bon point de départ.",
    emailLabel: "Ou écrivez-moi directement",
    footer: "Design & développement par Mahdi, en Tunisie.",
    backTop: "Revenir en haut",
    servicesPageTitle: "Développement web full-stack.",
    servicesPageItalic: "De l’interface au système.",
    servicesPageIntro:
      "Des sites et applications pensés pour ce que leurs utilisateurs doivent accomplir. Je travaille avec React, Next.js, TypeScript, Python et Java, en reliant l’interface aux systèmes qui la font fonctionner.",
    processLabel: "La méthode de travail",
    processTitle: "Un périmètre clair. Des détails soignés.",
    steps: [
      {
        title: "Comprendre le besoin",
        body: "Identifier le public, la tâche principale et les contraintes existantes. En faire un périmètre précis avant d’ajouter des fonctionnalités.",
      },
      {
        title: "Construire la version utile",
        body: "Relier le contenu, l’interface et le parcours des données. Faire fonctionner le parcours essentiel sur mobile comme sur grand écran.",
      },
      {
        title: "Vérifier les détails",
        body: "Revoir l’accessibilité, les performances et les cas limites. Prévoir le déploiement et la maintenance dès la construction.",
      },
    ],
    faqTitle: "Quelques questions pratiques",
    faq: [
      {
        question: "Pouvez-vous intervenir sur un site existant ?",
        answer:
          "Oui. Un site ou un code existant peut être étudié avant de cibler les améliorations utiles : une interface plus claire, une fonctionnalité, un problème de performance ou le SEO technique.",
      },
      {
        question: "Un site peut-il être proposé en français et en anglais ?",
        answer:
          "Oui. Le contenu, la navigation et les métadonnées peuvent disposer d’URL propres à chaque langue, accessibles directement aux visiteurs et aux moteurs de recherche.",
      },
      {
        question: "Comment définir le périmètre et le prix ?",
        answer:
          "Commencez par décrire le projet, ce qui existe déjà et ce dont vous avez besoin. Le périmètre et le budget pourront ensuite être discutés à partir de ces éléments.",
      },
      {
        question: "Où puis-je voir vos projets ?",
        answer:
          "Les pages projets présentent des captures réelles, des notes de réalisation et des liens vers les sites publics lorsqu’ils existent. Les dépôts des produits présentés sont privés.",
      },
    ],
    aboutPageIntro:
      "Je suis développeur full-stack, basé en Tunisie. Je travaille sur l’interface visible comme sur le code qui la fait fonctionner, avec un intérêt particulier pour les produits web qui simplifient une tâche concrète.",
    background: "Parcours",
    backgroundBody:
      "Mon parcours est en Informatique Multimédia et développement web à l’Université Sesame. J’utilise React et Next.js pour les interfaces, TypeScript pour le code applicatif, ainsi que FastAPI et Spring Boot pour le backend.",
    approach: "Ce qui retient mon attention",
    approachBody:
      "Le parcours dans une page, un message d’erreur utile, un formulaire sur téléphone ou la structure d’un contenu. Ces détails font partie du produit et méritent autant d’attention que les décisions techniques plus larges.",
    workBody:
      "Les projets présentés ici comprennent des sites terminés, des prototypes d’interface et des travaux en cours. Je les décris tels qu’ils sont, avec des captures réelles et une distinction claire entre ce qui est public et ce qui est encore en développement.",
    skillsTitle: "Des outils pour construire",
  },
} as const;

export interface Project {
  slug: string;
  name: string;
  type: Localized;
  summary: Localized;
  description: Localized;
  context: Localized;
  focus: Localized[];
  note: Localized;
  stack: string[];
  status: "live" | "prototype" | "development";
  cover: string;
  imageAlt: Localized;
  gallery?: string[];
  video?: string;
  url?: string;
  color: string;
}

export const projects: Project[] = [
  {
    slug: "ghassla",
    name: "Ghassla",
    type: {
      en: "Laundry booking interface",
      fr: "Interface de réservation de pressing",
    },
    summary: {
      en: "Making a laundry booking feel as simple as the service itself.",
      fr: "Rendre une réservation de pressing aussi simple que le service.",
    },
    description: {
      en: "A Next.js laundry booking prototype with service selection, quantities, pricing and appointment slots.",
      fr: "Un prototype de réservation de pressing en Next.js : services, quantités, tarifs et créneaux de rendez-vous.",
    },
    context: {
      en: "Booking a laundry service brings several decisions into one flow: what needs cleaning, how much, which service to choose and when to book. Ghassla explores how those choices can be presented as a manageable sequence instead of one long form.",
      fr: "Réserver un service de pressing rassemble plusieurs décisions : le linge à traiter, les quantités, la prestation et le créneau. Ghassla explore une façon de présenter ces choix par étapes plutôt que dans un long formulaire.",
    },
    focus: [
      {
        en: "A multi-step booking interface keeps service selection, quantities and scheduling in a clear sequence.",
        fr: "Un parcours par étapes relie le choix des services, les quantités et la planification.",
      },
      {
        en: "The booking state tracks selections and calculates the displayed total as quantities change.",
        fr: "L’état de réservation conserve les choix et recalcule le total affiché lorsque les quantités changent.",
      },
      {
        en: "Date and time-slot selection gives the appointment step its own focused interface.",
        fr: "Le choix de la date et du créneau dispose d’une interface dédiée.",
      },
    ],
    note: {
      en: "Interface prototype. The screenshots and recorded demo document the multi-step booking experience.",
      fr: "Prototype d’interface. Les captures et la démonstration documentent le parcours de réservation par étapes.",
    },
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Clerk"],
    status: "prototype",
    cover: "/ghassla/processed/ghassla_12.webp",
    imageAlt: {
      en: "Ghassla laundry service website interface",
      fr: "Interface du site de pressing Ghassla",
    },
    gallery: [
      "/ghassla/processed/ghassla_11.webp",
      "/ghassla/processed/ghassla_13.webp",
    ],
    video: "/ghassla/processed/Vidéo sans titre ‐ Réalisée avec Clipchamp.mp4",
    color: "blue",
  },
  {
    slug: "iloveblogs",
    name: "iloveblogs.blog",
    type: {
      en: "Developer publication & tools",
      fr: "Publication & outils pour développeurs",
    },
    summary: {
      en: "A clearer path from a production error to the explanation that helps.",
      fr: "Un chemin plus clair entre une erreur en production et une explication utile.",
    },
    description: {
      en: "A developer publication with practical troubleshooting guides, topic hubs and browser-based debugging tools.",
      fr: "Une publication pour développeurs avec des guides de dépannage, des rubriques thématiques et des outils dans le navigateur.",
    },
    context: {
      en: "A developer looking for a fix usually starts with a specific error, not a broad topic. iloveblogs.blog brings together troubleshooting articles, organised topic hubs and small tools for errors in Next.js, Supabase, PostgreSQL and TypeScript.",
      fr: "Un développeur cherche souvent une erreur précise plutôt qu’un thème général. iloveblogs.blog rassemble des articles de dépannage, des rubriques thématiques et de petits outils pour Next.js, Supabase, PostgreSQL et TypeScript.",
    },
    focus: [
      {
        en: "Topic hubs and linked articles make related explanations easier to find after the first answer.",
        fr: "Les rubriques et les liens entre articles facilitent la découverte d’explications complémentaires.",
      },
      {
        en: "Browser-based tools turn pasted errors and configuration into a more focused starting point for debugging.",
        fr: "Les outils dans le navigateur utilisent les erreurs et configurations pour orienter le diagnostic.",
      },
      {
        en: "A file-based content structure and Cloudflare deployment keep publication and site maintenance connected.",
        fr: "Une structure de contenu par fichiers et un déploiement Cloudflare relient publication et maintenance du site.",
      },
    ],
    note: {
      en: "Live website. Explore the current troubleshooting guides, topic hubs and debugging tools.",
      fr: "Site en ligne. Découvrez les guides de dépannage, les rubriques et les outils de diagnostic actuels.",
    },
    stack: ["Next.js", "MDX", "TypeScript", "Cloudflare"],
    status: "live",
    cover: "/images/work/iloveblogs.webp",
    imageAlt: {
      en: "The live iloveblogs.blog production troubleshooting homepage",
      fr: "Page d’accueil du site iloveblogs.blog dédié au dépannage en production",
    },
    url: "https://www.iloveblogs.blog",
    color: "sand",
  },
  {
    slug: "travail-en-hauteur",
    name: "Travail en Hauteur",
    type: {
      en: "Multilingual company website",
      fr: "Site d’entreprise multilingue",
    },
    summary: {
      en: "A service website built around finding the right information and making contact.",
      fr: "Un site de services conçu pour trouver l’information utile et prendre contact.",
    },
    description: {
      en: "A multilingual rope-access company website with service pages, project galleries, safety content and quotation enquiries.",
      fr: "Un site multilingue de travaux sur cordes : services, réalisations, informations de sécurité et demandes de devis.",
    },
    context: {
      en: "A rope-access company needs to explain its services and help potential customers understand where to begin. This website brings service information, project photography, safety content and quotation enquiries into a single, navigable experience.",
      fr: "Une entreprise de travaux sur cordes doit expliquer ses prestations et aider ses clients à savoir par où commencer. Ce site réunit les services, les photos de réalisations, les informations de sécurité et les demandes de devis dans une expérience lisible.",
    },
    focus: [
      {
        en: "French, English and Arabic routes make the company’s content accessible to different audiences, including right-to-left Arabic layouts.",
        fr: "Des routes en français, anglais et arabe rendent le contenu accessible à plusieurs publics, avec une mise en page de droite à gauche en arabe.",
      },
      {
        en: "Dedicated service and project pages give visitors a more specific explanation than a single general landing page.",
        fr: "Des pages dédiées aux services et aux réalisations donnent une information plus précise qu’une seule page générale.",
      },
      {
        en: "Quotation and contact links sit alongside the information visitors need before making an enquiry.",
        fr: "Les liens de devis et de contact accompagnent les informations nécessaires avant une demande.",
      },
    ],
    note: {
      en: "Live company website. Service information, project photography and quotation enquiries are available in three languages.",
      fr: "Site d’entreprise en ligne. Les services, les photos de réalisations et les demandes de devis sont accessibles en trois langues.",
    },
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "i18n"],
    status: "live",
    cover: "/images/work/travail-en-hauteur.webp",
    imageAlt: {
      en: "The live Travail en Hauteur company homepage",
      fr: "Page d’accueil du site Travail en Hauteur",
    },
    url: "https://www.travailenhauteur.tn",
    color: "rose",
  },
  {
    slug: "dispatching",
    name: "Dispatching",
    type: {
      en: "Operations interface · work in progress",
      fr: "Interface opérationnelle · en cours",
    },
    summary: {
      en: "Exploring an interface for the moving parts of everyday operations.",
      fr: "Explorer une interface pour les multiples tâches du quotidien opérationnel.",
    },
    description: {
      en: "A dispatching application in development, exploring a responsive operations interface with FastAPI and React.",
      fr: "Une application de dispatching en développement, autour d’une interface responsive avec FastAPI et React.",
    },
    context: {
      en: "Operations interfaces need to present several kinds of information without making every screen feel equally urgent. This work-in-progress project explores a dispatching interface and the backend integration around it.",
      fr: "Une interface opérationnelle doit présenter plusieurs types d’informations sans donner la même urgence à chaque écran. Ce projet en cours explore une interface de dispatching et son intégration backend.",
    },
    focus: [
      {
        en: "The interface explores how operational information can be organised into clear views.",
        fr: "L’interface explore une organisation lisible des informations opérationnelles.",
      },
      {
        en: "The development stack combines a React frontend with Python and FastAPI backend work.",
        fr: "Le travail de développement associe une interface React à un backend Python et FastAPI.",
      },
      {
        en: "The screenshots document the interface during development rather than a finished public service.",
        fr: "Les captures documentent l’interface pendant son développement, plutôt qu’un service public terminé.",
      },
    ],
    note: {
      en: "Work in progress. These screenshots document the dispatching interface during development.",
      fr: "Projet en cours. Ces captures documentent l’interface de dispatching pendant son développement.",
    },
    stack: ["Python", "FastAPI", "React", "WebSocket"],
    status: "development",
    cover: "/projects/dispatching/Screenshot 2025-09-17 194544.webp",
    imageAlt: {
      en: "Dispatching application interface during development",
      fr: "Interface de l’application de dispatching en développement",
    },
    gallery: [
      "/projects/dispatching/Screenshot 2025-09-17 194552.webp",
      "/projects/dispatching/Screenshot 2025-09-17 194700.webp",
    ],
    color: "lilac",
  },
];

export const skillGroups = [
  {
    label: { en: "Interface", fr: "Interface" },
    items: ["React", "Next.js", "TypeScript", "HTML & CSS", "Tailwind CSS"],
  },
  {
    label: { en: "Behind the interface", fr: "Derrière l’interface" },
    items: ["Python", "FastAPI", "Java", "Spring Boot", "PostgreSQL"],
  },
  {
    label: { en: "Delivery", fr: "Mise en ligne" },
    items: ["Git", "GitHub Actions", "Cloudflare", "Docker", "Technical SEO"],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
export const pageRoutes = siteRoutes;
