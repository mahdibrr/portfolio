import type { Project, Localized } from "./portfolio";

const l = (en: string, fr: string): Localized => ({ en, fr });
const team = l(
  "Developer and team member",
  "Développeur et membre de l’équipe",
);

export const currentProjects: Project[] = [
  {
    slug: "tukai",
    name: "Tukai",
    type: l(
      "AI workspace & product interfaces",
      "Espace IA & interfaces produit",
    ),
    role: team,
    team: true,
    period: "2026",
    summary: l(
      "AI tools made usable in a Tunisian workspace.",
      "Des outils IA dans un espace de travail tunisien.",
    ),
    description: l(
      "A multi-model AI product for chat, media creation and document-based work, with a public website and developer access.",
      "Un produit IA multi-modèles pour la conversation, la création de médias et le travail documentaire, avec un site public et un accès développeur.",
    ),
    context: l(
      "Tukai brings conversations, creative tools and access to several model providers into one account. I work with the Tukhnanutha team on the product’s interfaces, integrations and developer tooling. The work includes the public-facing experience as well as the application behind it.",
      "Tukai réunit conversations, outils créatifs et accès à plusieurs fournisseurs de modèles dans un seul compte. Je travaille avec l’équipe Tukhnanutha sur les interfaces, les intégrations et l’outillage développeur, du site public à l’application.",
    ),
    focus: [
      l(
        "A workspace for conversations, projects and image, video, audio and 3D tools.",
        "Un espace pour les conversations, les projets et les outils d’image, vidéo, audio et 3D.",
      ),
      l(
        "Raya gives the product a Tunisian language and interaction layer, alongside document retrieval and model selection.",
        "Raya apporte une couche de langage et d’interaction tunisienne, avec recherche documentaire et choix des modèles.",
      ),
      l(
        "Developer documentation, API compatibility and connector interfaces make the product usable beyond its chat screen.",
        "Documentation développeur, compatibilité API et interfaces de connecteurs étendent les usages au-delà du chat.",
      ),
    ],
    note: l(
      "Live team product. Public website and workspace screenshots, with my role across interfaces and integrations.",
      "Produit d’équipe en ligne. Captures du site public et de l’espace de travail, avec mon rôle sur les interfaces et intégrations.",
    ),
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "NestJS",
      "FastAPI",
      "PostgreSQL",
      "Cloudflare",
    ],
    status: "live",
    cover: "/images/work/tukai.webp",
    gallery: ["/images/work/tukai-workspace.webp"],
    imageCaptions: [
      l(
        "The public Tukai product website.",
        "Le site public du produit Tukai.",
      ),
      l(
        "An empty conversation view in the Tukai workspace.",
        "Une vue de conversation vide dans l’espace Tukai.",
      ),
    ],
    imageAlt: l(
      "The current public Tukai AI product website",
      "Le site public actuel du produit IA Tukai",
    ),
    url: "https://tuk-ai.com/",
    color: "sand",
    related: [
      {
        name: l("Open the workspace", "Ouvrir l’espace de travail"),
        url: "https://chat.tuk-ai.com/",
      },
      {
        name: l("Tukai Developers", "Tukai Developers"),
        url: "/work/tukai-developers/",
      },
      { name: l("Tukai Pro", "Tukai Pro"), url: "/work/tukai-pro/" },
    ],
  },
  {
    slug: "tukai-pro",
    name: "Tukai Pro",
    type: l(
      "Browser-based 3D & CAD editor",
      "Éditeur 3D & CAO dans le navigateur",
    ),
    role: team,
    team: true,
    period: "2026",
    summary: l(
      "Scene editing and CAD, directly in the browser.",
      "Édition de scènes et CAO, directement dans le navigateur.",
    ),
    description: l(
      "A Three.js editor with scene tools, parametric CAD, animation, import/export and an AI tool interface.",
      "Un éditeur Three.js avec outils de scène, CAO paramétrique, animation, import/export et interface d’outils IA.",
    ),
    context: l(
      "A browser editor has to keep the scene, tools and background work understandable while the model grows. Tukai Pro combines a 3D viewport with scene controls, CAD features and an assistant interface. My team contributions include server-assisted compute integration, job lifecycle and application reliability.",
      "Un éditeur dans le navigateur doit garder la scène, les outils et les traitements compréhensibles lorsque le modèle grandit. Tukai Pro associe vue 3D, réglages de scène, fonctions CAO et assistance. Mes contributions d’équipe portent notamment sur le calcul serveur, le cycle des tâches et la fiabilité applicative.",
    ),
    focus: [
      l(
        "Scene selection, transforms, lighting and camera controls share a command-based undo/redo model.",
        "Sélection, transformations, éclairage et caméras s’appuient sur des commandes annulables.",
      ),
      l(
        "OpenCascade and mesh tools support parametric geometry, while import and export keep their own supported format lists.",
        "OpenCascade et les outils de maillage permettent la géométrie paramétrique, avec des formats d’import et d’export distincts.",
      ),
      l(
        "Background compute and access checks support heavier tools without turning the editing surface into a technical console.",
        "Calcul en arrière-plan et contrôles d’accès accompagnent les outils plus lourds sans transformer l’éditeur en console technique.",
      ),
    ],
    note: l(
      "Live team editor. The screenshot shows a local demonstration scene in the full editor interface.",
      "Éditeur d’équipe en ligne. La capture présente une scène de démonstration locale dans l’interface complète de l’éditeur.",
    ),
    stack: [
      "Three.js",
      "JavaScript",
      "Vite",
      "OpenCascade",
      "Manifold",
      "WebAssembly",
    ],
    status: "live",
    cover: "/images/work/tukai-pro.webp",
    imageCaptions: [
      l(
        "A clean local demonstration scene in the editor.",
        "Une scène de démonstration locale dans l’éditeur.",
      ),
    ],
    imageAlt: l(
      "Tukai Pro browser editor with a demonstration 3D scene",
      "Éditeur Tukai Pro avec une scène 3D de démonstration",
    ),
    url: "https://pro.tuk-ai.com/",
    color: "lilac",
    related: [
      { name: l("Tukai workspace", "Espace Tukai"), url: "/work/tukai/" },
    ],
  },
  {
    slug: "tukhnanutha",
    name: "Tukhnanutha",
    type: l("Technology group website", "Site d’un groupe technologique"),
    role: team,
    team: true,
    period: "2026",
    summary: l(
      "A clear public entry point to the group’s work.",
      "Un point d’entrée public vers les activités du groupe.",
    ),
    description: l(
      "The public group website: company information, service areas, editorial content and partner enquiries.",
      "Le site public du groupe : présentation des entités, domaines de services, contenus éditoriaux et demandes de partenaires.",
    ),
    context: l(
      "Tukhnanutha is the group I work with. Its public website explains the organisation, its specialist companies and the products people can actually open, including Tukai. The implementation combines a prerendered Angular site with a Cloudflare edge layer and a separate educational front assembled into the same deployment.",
      "Tukhnanutha est le groupe avec lequel je travaille. Son site public présente l’organisation, ses entités spécialisées et les produits accessibles, dont Tukai. La réalisation associe un site Angular prérendu, une couche Cloudflare et un site éducatif assemblé dans le même déploiement.",
    ),
    focus: [
      l(
        "Typed company and service data supports consistent content across the public pages.",
        "Des données typées d’entités et de services assurent la cohérence des pages publiques.",
      ),
      l(
        "Prerendered routes, compiled editorial content and sitemap generation make the site readable before client-side navigation.",
        "Routes prérendues, contenus éditoriaux compilés et sitemaps rendent le site lisible avant la navigation côté client.",
      ),
      l(
        "The Cloudflare layer handles host-based delivery, redirects and security headers for the group and educational sites.",
        "La couche Cloudflare gère les domaines, redirections et en-têtes des sites du groupe et de formation.",
      ),
    ],
    note: l(
      "Live group website. Presented as team work and affiliation, with public screenshots of the group overview, specialist divisions and Porteur.",
      "Site du groupe en ligne. Présenté comme travail d’équipe et affiliation, avec des captures publiques de la présentation du groupe, de ses divisions et du Porteur.",
    ),
    stack: ["Angular", "TypeScript", "GSAP", "Cloudflare Workers", "Next.js"],
    status: "live",
    cover: "/images/work/tukhnanutha.webp",
    gallery: [
      "/images/work/tukhnanutha-overview.webp",
      "/images/work/tukhnanutha-divisions.webp",
      "/images/work/tukhnanutha-porteur.webp",
    ],
    imageCaptions: [
      l(
        "The group website’s opening introduction.",
        "L’introduction du site du groupe.",
      ),
      l("The public group overview.", "La présentation publique du groupe."),
      l(
        "Specialist divisions and their service areas.",
        "Les divisions spécialisées et leurs domaines de services.",
      ),
      l(
        "The Porteur presentation on the group website.",
        "La présentation du Porteur sur le site du groupe.",
      ),
    ],
    imageAlt: l(
      "The public Tukhnanutha technology group homepage",
      "L’accueil public du groupe technologique Tukhnanutha",
    ),
    url: "https://www.tukhnanutha.com/",
    color: "rose",
    related: [
      { name: l("Tukai", "Tukai"), url: "/work/tukai/" },
      {
        name: l("Nuthora Edu", "Nuthora Edu"),
        url: "https://edu.nuthora.com/",
      },
      {
        name: l("People / JumPark Équipe", "People / JumPark Équipe"),
        url: "/work/people/",
      },
    ],
  },
  {
    slug: "tukai-developers",
    name: "Tukai Developers",
    type: l(
      "Public API documentation & developer portal",
      "Documentation API & portail développeur",
    ),
    role: team,
    team: true,
    period: "2026",
    summary: l(
      "From the first request to a usable integration.",
      "Du premier appel à une intégration utilisable.",
    ),
    description: l(
      "A bilingual developer portal for Tukai’s API, model catalogue, CLI and integration examples.",
      "Un portail bilingue pour l’API Tukai, le catalogue de modèles, la CLI et les exemples d’intégration.",
    ),
    context: l(
      "A developer needs an actual base URL, a working request shape and a clear account boundary. I worked on Tukai’s public developer portal to bring those details into one place. Documentation is public; account settings and API keys stay in the workspace’s console.",
      "Un développeur a besoin d’une URL réelle, du bon format de requête et d’une séparation claire du compte. J’ai travaillé sur le portail public Tukai pour réunir ces informations. La documentation est publique ; réglages et clés API restent dans la console de l’espace de travail.",
    ),
    focus: [
      l(
        "French and English documentation with quickstarts, compatibility notes and integration examples.",
        "Documentation française et anglaise avec démarrage rapide, notes de compatibilité et exemples.",
      ),
      l(
        "Examples in curl, PowerShell, TypeScript and Python, plus an integration context visitors can copy.",
        "Exemples en curl, PowerShell, TypeScript et Python, avec un contexte d’intégration à copier.",
      ),
      l(
        "Model discovery, CLI guidance and a clear path to the existing account console.",
        "Catalogue de modèles, guide CLI et accès explicite à la console du compte existant.",
      ),
    ],
    note: l(
      "Live bilingual developer portal, with public documentation and integration examples.",
      "Portail développeur bilingue en ligne, avec documentation publique et exemples d’intégration.",
    ),
    stack: ["Next.js", "React", "TypeScript", "MDX", "Cloudflare Workers"],
    status: "live",
    cover: "/images/work/tukai-developers.webp",
    imageAlt: l(
      "Tukai Developers public documentation and API quickstart",
      "Documentation publique Tukai Developers et démarrage API",
    ),
    url: "https://developers.tuk-ai.com/",
    color: "blue",
    related: [
      { name: l("Tukai product", "Produit Tukai"), url: "/work/tukai/" },
    ],
  },
  {
    slug: "vtc-a-votre-service",
    name: "VTC À Votre Service",
    type: l("Chauffeur service website", "Site de chauffeur privé"),
    role: l("Full-stack development", "Développement full-stack"),
    period: "2026",
    summary: l(
      "A service website that gets visitors to the right enquiry.",
      "Un site de services qui facilite la bonne demande.",
    ),
    description: l(
      "A chauffeur website with service and location pages, reservation enquiries and direct contact routes.",
      "Un site de chauffeur avec pages de services et de zones, demandes de réservation et contact direct.",
    ),
    context: l(
      "Airport transfers, business travel and longer trips call for different information. The website gives each service and location its own context, then puts the enquiry, phone and WhatsApp options within reach. The reservation flow helps visitors describe the trip and contact the chauffeur service.",
      "Transferts d’aéroport, déplacements professionnels et longs trajets nécessitent des informations différentes. Le site donne un contexte à chaque service et zone, puis rend accessibles demande, téléphone et WhatsApp. Le parcours de réservation permet de décrire le trajet et de contacter le service.",
    ),
    focus: [
      l(
        "Service and location pages give visitors specific information for their journey.",
        "Les pages de services et de zones apportent les informations adaptées au trajet.",
      ),
      l(
        "Reservation and quotation enquiries connect to telephone and contextual WhatsApp contact.",
        "Les demandes de réservation et de devis sont reliées au téléphone et à WhatsApp.",
      ),
      l(
        "A responsive Next.js interface, structured page metadata and Cloudflare delivery support the site’s public pages.",
        "Interface Next.js responsive, métadonnées de pages et diffusion Cloudflare accompagnent le site public.",
      ),
    ],
    note: l(
      "Live client website. Captured from the public homepage.",
      "Site client en ligne. Capture de l’accueil public.",
    ),
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Cloudflare Workers",
    ],
    status: "live",
    cover: "/images/work/vtc-a-votre-service.webp",
    imageAlt: l(
      "VTC À Votre Service chauffeur website homepage",
      "Accueil du site de chauffeur VTC À Votre Service",
    ),
    url: "https://www.vtc9560.fr/",
    color: "sand",
  },
  {
    slug: "bsk-le-robuste",
    name: "BSK Le Robuste",
    type: l("Editorial brand website & CMS", "Site de marque éditorial & CMS"),
    role: l("Full-stack development", "Développement full-stack"),
    period: "2026",
    summary: l(
      "Materials, craft and collections in an editorial website.",
      "Matières, savoir-faire et collections dans un site éditorial.",
    ),
    description: l(
      "A Tunisian artisan brand website with collections, materials, a magazine, gallery and an editable content system.",
      "Un site de marque artisanale tunisienne avec collections, matières, magazine, galerie et gestion éditable des contenus.",
    ),
    context: l(
      "The workshop’s work is better understood through the material, the collection and the making process. BSK Le Robuste uses an editorial presentation for those details, supported by a CMS for the homepage, catalogue and media. Product and collection pages lead visitors to contact the workshop.",
      "Le travail de l’atelier se comprend à travers la matière, la collection et le geste. BSK Le Robuste adopte une présentation éditoriale, soutenue par un CMS pour l’accueil, le catalogue et les médias. Les pages de pièces et de collections orientent vers le contact avec l’atelier.",
    ),
    focus: [
      l(
        "An editorial layout gives collections, materials and workshop photography their own space.",
        "Une mise en page éditoriale donne leur place aux collections, matières et photographies de l’atelier.",
      ),
      l(
        "Content management covers homepage composition, catalogue entries, magazine articles and the media library.",
        "La gestion de contenu couvre composition de l’accueil, catalogue, articles et médiathèque.",
      ),
      l(
        "Cloudflare Workers, D1 and R2 support page delivery, structured content and media storage.",
        "Cloudflare Workers, D1 et R2 assurent diffusion des pages, contenu structuré et stockage des médias.",
      ),
    ],
    note: l(
      "Live website at its Cloudflare production address. The screenshot is a local homepage preview with the site’s original photography.",
      "Site en ligne sur son adresse de production Cloudflare. La capture présente un aperçu local de l’accueil avec les photographies originales du site.",
    ),
    stack: ["Next.js", "React", "Prisma", "Cloudflare D1", "Cloudflare R2"],
    status: "live",
    cover: "/images/work/bsk-le-robuste.webp",
    imageCaptions: [
      l(
        "Complete homepage opening, previewed with the site’s original photography.",
        "Ouverture complète de l’accueil, avec les photographies originales du site.",
      ),
    ],
    imageAlt: l(
      "BSK Le Robuste editorial artisan brand homepage",
      "Accueil éditorial de la marque artisanale BSK Le Robuste",
    ),
    url: "https://bsklerobuste.mami65724.workers.dev/",
    color: "rose",
  },
  {
    slug: "people",
    name: "People / JumPark Équipe",
    type: l(
      "Staff & operations platform",
      "Plateforme d’équipe & d’opérations",
    ),
    role: team,
    team: true,
    period: "2026",
    summary: l(
      "Organisation, planning and daily operations in one staff tool.",
      "Organisation, planning et opérations dans un outil d’équipe.",
    ),
    description: l(
      "A local MVP for staff organisation, scoped permissions, planning, incidents and operational coordination.",
      "Un MVP local pour l’organisation d’équipe, les permissions, le planning, les incidents et la coordination opérationnelle.",
    ),
    context: l(
      "People is team work within the Tukhnanutha context, with a JumPark staff interface. The implementation brings the organisation tree, planning and everyday operational tasks into one PWA. It is a functional local MVP, not a publicly deployed service; the portfolio presents its development state explicitly.",
      "People est un travail d’équipe dans le contexte Tukhnanutha, avec une interface pour l’équipe JumPark. La réalisation réunit organigramme, planning et tâches opérationnelles dans une PWA. C’est un MVP local fonctionnel, pas un service déployé publiquement ; son état est indiqué ici.",
    ),
    focus: [
      l(
        "Organisation structure and scoped permissions determine the staff views and available actions.",
        "Structure de l’organisation et permissions définissent les vues et actions de chaque membre.",
      ),
      l(
        "Planning, incidents, group reservations and staff transport are modelled as distinct operational areas.",
        "Planning, incidents, réservations de groupes et transport d’équipe sont des domaines opérationnels distincts.",
      ),
      l(
        "A French/Arabic PWA connects a React frontend to a Hono API and D1-backed domain models.",
        "Une PWA français/arabe relie une interface React à une API Hono et des modèles de domaine sur D1.",
      ),
    ],
    note: l(
      "In development: functional local MVP. The capture shows a clean sign-in view, with no staff or customer records.",
      "En développement : MVP local fonctionnel. La capture montre un écran de connexion vierge, sans dossiers d’équipe ou de client.",
    ),
    stack: ["React", "Vite", "Hono", "Cloudflare D1", "Drizzle", "PWA"],
    status: "development",
    cover: "/images/work/people.webp",
    imageAlt: l(
      "People / JumPark Équipe local MVP sign-in screen",
      "Écran de connexion du MVP local People / JumPark Équipe",
    ),
    color: "blue",
    related: [
      {
        name: l("Tukhnanutha group", "Groupe Tukhnanutha"),
        url: "/work/tukhnanutha/",
      },
    ],
  },
  {
    slug: "monastir-3d",
    name: "Monastir 3D",
    type: l("Interactive zipline concept", "Concept de tyrolienne interactif"),
    role: l("3D web development", "Développement web 3D"),
    period: "2026",
    summary: l(
      "Exploring a zipline concept through an interactive 3D scene.",
      "Explorer un concept de tyrolienne dans une scène 3D interactive.",
    ),
    description: l(
      "A public Three.js project for a Monastir zipline concept, with scene controls and structural visualization.",
      "Un projet Three.js public pour un concept de tyrolienne à Monastir, avec commandes de scène et visualisation structurelle.",
    ),
    context: l(
      "An interactive scene makes a spatial concept easier to inspect than a drawing alone. This Monastir zipline concept presents the geometry and its components in a browser, with controls for exploring different views. The source and supporting presentation are available in the public Mestir-plan-3d repository.",
      "Une scène interactive rend un concept spatial plus facile à examiner qu’un dessin seul. Ce concept de tyrolienne à Monastir présente la géométrie et ses composants dans le navigateur, avec des commandes pour explorer plusieurs vues. Le code et la présentation sont accessibles dans le dépôt public Mestir-plan-3d.",
    ),
    focus: [
      l(
        "An interactive scene exposes the concept’s geometry and component controls.",
        "Une scène interactive expose la géométrie du concept et les commandes de composants.",
      ),
      l(
        "Three.js rendering and browser controls support exploring the model from different views.",
        "Le rendu Three.js et les commandes du navigateur permettent plusieurs points de vue.",
      ),
      l(
        "The public repository keeps the scene and supporting presentation available for inspection.",
        "Le dépôt public donne accès à la scène et à sa présentation pour consulter le travail.",
      ),
    ],
    note: l(
      "Concept visualization, shown in the actual local application. Public source is available on GitHub.",
      "Visualisation conceptuelle dans l’application locale réelle. Le code est public sur GitHub.",
    ),
    stack: ["Three.js", "JavaScript", "Chart.js", "GSAP", "Vite"],
    status: "prototype",
    cover: "/images/work/monastir-3d.webp",
    imageAlt: l(
      "Monastir zipline concept in the actual browser 3D scene",
      "Concept de tyrolienne à Monastir dans la scène 3D réelle",
    ),
    sourceUrl: "https://github.com/mahdibrr/Mestir-plan-3d",
    color: "lilac",
    related: [
      {
        name: l("Tukai Pro browser editor", "Éditeur Tukai Pro"),
        url: "/work/tukai-pro/",
      },
    ],
  },
];
