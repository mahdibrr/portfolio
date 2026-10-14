import snapshot from "@/data/ecosystem-snapshot.json";
import { identity, routeFor, type Locale, type Localized } from "./portfolio";
import { pageSchema } from "./portfolio-seo";

export const ecosystem = snapshot;
export const publicationUrl = "https://www.iloveblogs.blog";
export const blogAuthorUrl = publicationUrl + "/author/mahdi-br";
const l = (en: string, fr: string): Localized => ({ en, fr });

export const ecosystemCopy = {
  en: {
    work: "Projects",
    openSource: "Open source",
    writing: "Writing",
    tools: "Tools",
    resources: "Resources",
    stats: "Publication stats",
    homeTitle: "Useful code.",
    homeItalic: "Practical writing.",
    homeIntro:
      "Libraries, runnable examples and troubleshooting guides for developers working with Next.js, Node.js and Supabase.",
    readProject: "Read the project notes",
    viewRepo: "View repository",
    useTool: "Use the tool",
    readArticle: "Read on iloveblogs",
    checked: "Snapshot checked",
    workTitle: "Projects, in context.",
    workIntro:
      "Company websites, product interfaces and developer tools. Open a project to see the screenshots, the implementation choices and the related public work.",
    sourceTitle: "Code you can inspect.",
    sourceItalic: "Ideas you can reuse.",
    sourceIntro:
      "Libraries, runnable examples and earlier applications. Browse the public source or open a project for its implementation notes and documentation.",
    featured: "Start with these",
    allRepositories: "Public repository directory",
    all: "All",
    search: "Search repositories",
    searchHint: "Name, language or topic",
    noResults: "No repositories match this search.",
    archived: "Archived",
    fork: "Fork",
    original: "Original repository",
    historical: "Published snapshot",
    profile: "Profile README",
    visit: "Open on GitHub",
    results: "repositories",
    writingTitle: "Notes from the work.",
    writingItalic: "Published on iloveblogs.",
    writingIntro:
      "Practical guides to Next.js, Node.js and Supabase errors. Choose the subject you need and read the full explanation on iloveblogs.",
    englishArticle: "Article in English",
    allWriting: "Browse the publication",
    toolsTitle: "A faster starting point",
    toolsItalic: "for a stubborn error.",
    toolsIntro:
      "Nine free tools on iloveblogs. Choose the symptom, open the tool, and use its explanation alongside the linked documentation. Six share their core logic with the public error-explainer library.",
    toolsSearch: "Search tools",
    toolHint: "CORS, RLS, build error…",
    source: "Source module",
    browseTools: "All iloveblogs tools",
    resourcesTitle: "Keep a useful reference",
    resourcesItalic: "within reach.",
    resourcesIntro:
      "A short reference shelf: official documentation, public repositories and upstream projects for the frameworks and tools used in these projects.",
    upstream: "Upstream project",
    documentation: "Official documentation",
    ownerFork: "My directory fork",
    resourceNote:
      "The MCP directory is a third-party project. My fork is a personal snapshot; the original maintainers receive the attribution.",
    statsTitle: "iloveblogs, in numbers.",
    statsItalic: "With the source attached.",
    statsIntro:
      "A dated view of the publication: Google Search clicks, editorial pages listed in its live sitemap, and free browser tools.",
    clicks: "Google Search clicks",
    pages: "Articles, guides & fixes",
    browserTools: "Free browser tools",
    repos: "Public GitHub repositories",
    clickHelp:
      "Web-search clicks reported by Google Search Console. This is not a count of visitors or page views.",
    pageHelp:
      "Editorial URLs listed in the live sitemap. Listing in a sitemap does not mean a page is indexed.",
    graph: "Weekly Google Search clicks",
    graphHelp:
      "Daily clicks grouped into seven-day periods; the final period may be shorter.",
    methodology: "How these numbers are collected",
    method1:
      "Search data comes directly from the Search Console API for the verified iloveblogs property. The window ends on the latest date with final data; no query strings, credentials or visitor records are published.",
    method2:
      "Page counts come from the publication’s public sitemap files. The editorial total includes posts, guides and fixes. Tools are counted separately.",
    method3:
      "GitHub counts come from the public API and include original repositories, forks and archived repositories. This page is a snapshot, not a live counter.",
    dataLink: "Download the public snapshot",
    sitemapLink: "Open the source sitemap",
    githubLink: "Open the GitHub profile",
    routeBack: "Back to open source",
    status: "Project status",
    inside: "Inside the repository",
    related: "Related resources",
    repoDocs: "Documentation",
    example: "Try a documented example",
    sourceEvidence: "View the fixture and expected result",
  },
  fr: {
    work: "Projets",
    openSource: "Open source",
    writing: "Articles",
    tools: "Outils",
    resources: "Ressources",
    stats: "Chiffres du site",
    homeTitle: "Du code utile.",
    homeItalic: "Des notes concrètes.",
    homeIntro:
      "Bibliothèques, exemples exécutables et guides de dépannage pour les développeurs qui travaillent avec Next.js, Node.js et Supabase.",
    readProject: "Lire les notes du projet",
    viewRepo: "Voir le dépôt",
    useTool: "Utiliser l’outil",
    readArticle: "Lire sur iloveblogs",
    checked: "Instantané vérifié",
    workTitle: "Les projets, en contexte.",
    workIntro:
      "Sites d’entreprise, interfaces produit et outils pour développeurs. Découvrez les captures, les choix de réalisation et les travaux publics associés.",
    sourceTitle: "Du code à consulter.",
    sourceItalic: "Des idées à réutiliser.",
    sourceIntro:
      "Bibliothèques, exemples exécutables et premières applications. Consultez le code public ou les notes de réalisation et la documentation de chaque projet.",
    featured: "Pour commencer",
    allRepositories: "Annuaire des dépôts publics",
    all: "Tous",
    search: "Rechercher un dépôt",
    searchHint: "Nom, langage ou sujet",
    noResults: "Aucun dépôt ne correspond à cette recherche.",
    archived: "Archivé",
    fork: "Fork",
    original: "Dépôt original",
    historical: "Instantané publié",
    profile: "README de profil",
    visit: "Ouvrir sur GitHub",
    results: "dépôts",
    writingTitle: "Des notes de développement.",
    writingItalic: "Publiées sur iloveblogs.",
    writingIntro:
      "Des guides pratiques sur les erreurs Next.js, Node.js et Supabase. Choisissez votre sujet et lisez l’explication complète sur iloveblogs.",
    englishArticle: "Article en anglais",
    allWriting: "Explorer la publication",
    toolsTitle: "Un point de départ",
    toolsItalic: "pour une erreur tenace.",
    toolsIntro:
      "Neuf outils gratuits sur iloveblogs. Choisissez le symptôme et consultez l’explication avec sa documentation. Six outils partagent leur logique avec la bibliothèque publique d’analyse d’erreurs.",
    toolsSearch: "Rechercher un outil",
    toolHint: "CORS, RLS, erreur de build…",
    source: "Module source",
    browseTools: "Tous les outils iloveblogs",
    resourcesTitle: "Des références utiles",
    resourcesItalic: "à portée de main.",
    resourcesIntro:
      "Une petite bibliothèque : documentations officielles, dépôts publics et projets d’origine pour les technologies utilisées dans ces réalisations.",
    upstream: "Projet d’origine",
    documentation: "Documentation officielle",
    ownerFork: "Mon fork de l’annuaire",
    resourceNote:
      "L’annuaire MCP est un projet tiers. Mon fork est un instantané personnel ; la réalisation est attribuée aux mainteneurs d’origine.",
    statsTitle: "iloveblogs, en chiffres.",
    statsItalic: "Avec les sources.",
    statsIntro:
      "Un instantané daté de la publication : clics depuis Google, pages éditoriales de son sitemap et outils gratuits dans le navigateur.",
    clicks: "Clics depuis Google",
    pages: "Articles, guides & correctifs",
    browserTools: "Outils gratuits",
    repos: "Dépôts GitHub publics",
    clickHelp:
      "Clics de recherche web rapportés par Google Search Console. Ce chiffre ne compte ni les visiteurs ni les pages vues.",
    pageHelp:
      "URL éditoriales présentes dans le sitemap public. Leur présence ne signifie pas qu’elles sont indexées.",
    graph: "Clics Google par semaine",
    graphHelp:
      "Clics quotidiens regroupés par périodes de sept jours ; la dernière période peut être plus courte.",
    methodology: "Comment ces chiffres sont recueillis",
    method1:
      "Les données de recherche viennent directement de l’API Search Console pour la propriété iloveblogs vérifiée. La période se termine à la dernière date disponible avec des données finales. Aucun terme de recherche, identifiant ou dossier de visiteur n’est publié.",
    method2:
      "Le décompte des pages utilise les sitemaps publics. Le total éditorial réunit articles, guides et correctifs ; les outils sont comptés séparément.",
    method3:
      "Les données GitHub viennent de l’API publique et incluent les dépôts originaux, les forks et les archives. Cette page est un instantané daté.",
    dataLink: "Télécharger l’instantané public",
    sitemapLink: "Ouvrir le sitemap source",
    githubLink: "Ouvrir le profil GitHub",
    routeBack: "Revenir à l’open source",
    status: "État du projet",
    inside: "Dans le dépôt",
    related: "Ressources utiles",
    repoDocs: "Documentation",
    example: "Essayer un exemple documenté",
    sourceEvidence: "Voir le cas de test et le résultat attendu",
  },
} as const;

export interface SourceProject {
  slug: string;
  name: string;
  repo: string;
  status: Localized;
  label: Localized;
  lead: Localized;
  summary: Localized;
  sections: { title: Localized; body: Localized }[];
  docs: { name: string; url: string }[];
  related: { name: string; url: string; kind: Localized }[];
  example?: { command: string; rule: string; input: string; expected: string };
}
export const sourceProjects: SourceProject[] = [
  {
    slug: "dev-error-explainers",
    name: "dev-error-explainers",
    repo: "https://github.com/mahdibrr/dev-error-explainers",
    status: l("Public library", "Bibliothèque publique"),
    label: l(
      "JavaScript / CLI / Action / MCP",
      "JavaScript / CLI / Action / MCP",
    ),
    lead: l(
      "Explain a developer error without an LLM.",
      "Expliquer une erreur de développement sans LLM.",
    ),
    summary: l(
      "Seven deterministic JavaScript explainers, shared with six iloveblogs browser tools. Use the library offline, in a terminal, in CI or through an MCP client.",
      "Sept analyseurs JavaScript déterministes, partagés avec six outils iloveblogs. La bibliothèque s’utilise hors ligne, dans un terminal, en CI ou via un client MCP.",
    ),
    sections: [
      {
        title: l("Start with the exact error", "Commencer par l’erreur exacte"),
        body: l(
          "The library matches known error signatures and returns a structured explanation: the rule, the severity, the cause and the suggested fixes. Its modules cover CORS, ESM/CommonJS, npm dependency conflicts, stale chunks, database URLs, database connections and Next.js builds. An unrecognised input is reported as unrecognised. It does not ask a language model to fill in a diagnosis.",
          "La bibliothèque reconnaît des signatures d’erreurs connues et renvoie une explication structurée : règle, gravité, cause et correctifs proposés. Ses modules couvrent CORS, ESM/CommonJS, les dépendances npm, les chunks périmés, les URL et connexions de bases de données et les builds Next.js. Une entrée inconnue est signalée comme telle, sans diagnostic généré par un modèle.",
        ),
      },
      {
        title: l(
          "The same logic in several places",
          "La même logique dans plusieurs contextes",
        ),
        body: l(
          "The public package exposes the pure JavaScript functions, a command-line interface, a GitHub Action and a stdio MCP server with an explain_error tool. Six modules also power the browser tools on iloveblogs. That gives readers a path from an interactive explanation to the exact source file. The seventh module, for database connection errors, currently belongs to the library only.",
          "Le paquet public expose les fonctions JavaScript, une interface en ligne de commande, une Action GitHub et un serveur MCP stdio avec l’outil explain_error. Six modules alimentent aussi les outils dans le navigateur sur iloveblogs : le lecteur peut passer de l’explication au fichier source. Le module de connexion aux bases de données reste propre à la bibliothèque.",
        ),
      },
      {
        title: l(
          "A contract readers can check",
          "Un contrat que l’on peut vérifier",
        ),
        body: l(
          "The repository includes a documented output contract and a fixture corpus. The tests run each fixture through diagnose() and check the stable expected result. CLI, Action and MCP inputs are masked for recognisable secret patterns before analysis, with the limits documented in the contract. The database URL doctor has a separate handling path. Read those limits before choosing what to paste into an integration.",
          "Le dépôt comprend un contrat de sortie et un corpus de cas de test. Les tests exécutent diagnose() et vérifient le résultat attendu. Les entrées CLI, Action et MCP masquent les motifs de secrets reconnaissables avant l’analyse ; le contrat en décrit les limites. L’analyseur d’URL de base de données utilise un parcours distinct. Consultez ces limites avant d’utiliser une intégration.",
        ),
      },
    ],
    docs: [
      {
        name: "Output contract",
        url: "https://github.com/mahdibrr/dev-error-explainers/blob/main/docs/CONTRACT.md",
      },
      {
        name: "CLI",
        url: "https://github.com/mahdibrr/dev-error-explainers#cli",
      },
      {
        name: "GitHub Action",
        url: "https://github.com/mahdibrr/dev-error-explainers/blob/main/docs/ACTION.md",
      },
      {
        name: "MCP",
        url: "https://github.com/mahdibrr/dev-error-explainers/blob/main/docs/MCP.md",
      },
      {
        name: "npm package",
        url: "https://www.npmjs.com/package/dev-error-explainers",
      },
    ],
    related: [
      {
        name: "Next.js Build Error Decoder",
        url: publicationUrl + "/tools/nextjs-build-error-decoder",
        kind: l("Browser tool", "Outil dans le navigateur"),
      },
      {
        name: "CORS Error Explainer",
        url: publicationUrl + "/tools/cors-error-explainer",
        kind: l("Browser tool", "Outil dans le navigateur"),
      },
      {
        name: "iloveblogs open source",
        url: publicationUrl + "/open-source",
        kind: l("Browser tools", "Liens entre bibliothèque et outils"),
      },
    ],
    example: {
      command:
        "npx dev-error-explainers --json < fixtures/next-build/window-undefined/input.txt",
      rule: "next-build.window-undefined",
      input:
        "https://github.com/mahdibrr/dev-error-explainers/blob/main/fixtures/next-build/window-undefined/input.txt",
      expected:
        "https://github.com/mahdibrr/dev-error-explainers/blob/main/fixtures/next-build/window-undefined/expected.json",
    },
  },
  {
    slug: "nextjs-supabase-production-incidents",
    name: "Production Incidents",
    repo: "https://github.com/mahdibrr/nextjs-supabase-production-incidents",
    status: l("Public reference & examples", "Références & exemples publics"),
    label: l(
      "Next.js / Supabase / PostgreSQL",
      "Next.js / Supabase / PostgreSQL",
    ),
    lead: l(
      "From a symptom to a runnable fix.",
      "Du symptôme à un correctif exécutable.",
    ),
    summary: l(
      "A symptom-first incident index, SQL assets and broken/fixed examples for RLS, webhook idempotency and Next.js caching.",
      "Un index d’incidents par symptôme, des fichiers SQL et des exemples avant/après pour RLS, l’idempotence des webhooks et le cache Next.js.",
    ),
    sections: [
      {
        title: l(
          "Find the failure before the framework",
          "Chercher la panne avant le framework",
        ),
        body: l(
          "The index starts with symptoms such as an empty query result, a lost server-side session or a webhook that fails after deployment. Entries lead to explanations, checklists and linked sources rather than a broad list of libraries. The repository also connects readers to relevant iloveblogs articles and the public error-explainer library.",
          "L’index commence par les symptômes : résultat de requête vide, session côté serveur perdue ou webhook en échec après déploiement. Les entrées renvoient vers des explications, des listes de vérification et des sources. Le dépôt relie aussi les lecteurs aux articles iloveblogs et à la bibliothèque publique d’analyse d’erreurs.",
        ),
      },
      {
        title: l(
          "Read both sides of the example",
          "Lire les deux versions de l’exemple",
        ),
        body: l(
          "Three separate example directories document broken and corrected behaviour. The RLS example uses PostgreSQL and pgTAP. The webhook example uses Vitest to exercise signature verification, idempotency and retries. The Next.js example models caching and asynchronous route parameters. Each directory has its own README and runner, so readers can examine the assumptions before executing it.",
          "Trois dossiers documentent un comportement défectueux et sa correction. L’exemple RLS utilise PostgreSQL et pgTAP. L’exemple de webhook emploie Vitest pour la signature, l’idempotence et les nouvelles tentatives. L’exemple Next.js modélise le cache et les paramètres de route asynchrones. Chaque dossier dispose de sa documentation et de son exécution propre.",
        ),
      },
      {
        title: l(
          "Evidence beside the explanation",
          "La preuve à côté de l’explication",
        ),
        body: l(
          "The value is in the relationship between the incident description, the source and the runnable example. These are educational reproductions, with their scope visible in the README. They let a reader inspect a fix instead of treating a prose recommendation as proof that it works in every application.",
          "L’intérêt est dans le lien entre la description de l’incident, le code et l’exemple exécutable. Ces reproductions pédagogiques précisent leur périmètre dans les README. Le lecteur peut examiner une correction et ses hypothèses avant de l’adapter à son application.",
        ),
      },
    ],
    docs: [
      {
        name: "RLS / pgTAP example",
        url: "https://github.com/mahdibrr/nextjs-supabase-production-incidents/blob/main/examples/rls-pgtap/README.md",
      },
      {
        name: "Webhook idempotency example",
        url: "https://github.com/mahdibrr/nextjs-supabase-production-incidents/blob/main/examples/stripe-webhook-idempotency/README.md",
      },
      {
        name: "Next.js caching & params example",
        url: "https://github.com/mahdibrr/nextjs-supabase-production-incidents/blob/main/examples/nextjs15-cache-and-params/README.md",
      },
    ],
    related: [
      {
        name: "Supabase RLS Playground",
        url: publicationUrl + "/tools/supabase-rls-playground",
        kind: l("Try SQL in the browser", "Essayer le SQL dans le navigateur"),
      },
      {
        name: "Next.js & Supabase hub",
        url: publicationUrl + "/hubs/nextjs-supabase",
        kind: l("Related explanations", "Explications associées"),
      },
      {
        name: "dev-error-explainers",
        url: "/open-source/dev-error-explainers/",
        kind: l("Related public project", "Projet public associé"),
      },
    ],
  },
  {
    slug: "nextjs-seo-content-engine",
    name: "MDX Content Toolkit",
    repo: "https://github.com/mahdibrr/nextjs-seo-content-engine",
    status: l(
      "Historical toolkit · June 2026",
      "Boîte à outils historique · juin 2026",
    ),
    label: l(
      "MDX / taxonomy / scoring / Search Console",
      "MDX / taxonomie / scoring / Search Console",
    ),
    lead: l(
      "Inspect the mechanics of a content pipeline.",
      "Examiner les mécanismes d’un pipeline éditorial.",
    ),
    summary: l(
      "A published extraction of content scoring, taxonomy, linking and Search Console scripts. A snapshot to study alongside the current iloveblogs publication.",
      "Une extraction publique de scripts de scoring, taxonomie, maillage et Search Console. Un instantané à étudier avec la publication iloveblogs actuelle.",
    ),
    sections: [
      {
        title: l("A published extraction", "Une extraction publiée"),
        body: l(
          "This repository contains a June 2026 snapshot of a Next.js blog’s content-engine modules. It includes scripts for scoring Markdown/MDX, finding content opportunities, syncing Search Console data, proposing optimisations and generating review-pending drafts. The files are useful for seeing how those concerns were organised at that point in the project.",
          "Ce dépôt contient un instantané de juin 2026 des modules éditoriaux d’un blog Next.js : scoring Markdown/MDX, recherche d’opportunités, synchronisation Search Console, propositions d’optimisation et brouillons en attente de revue. Il montre comment ces fonctions étaient organisées à cette étape du projet.",
        ),
      },
      {
        title: l(
          "Follow the deterministic steps",
          "Suivre les étapes déterministes",
        ),
        body: l(
          "Start with taxonomy and the scoring script, then inspect the report and link suggestions. The optimiser exposes a dry-run/apply boundary, so suggestions can be reviewed before content is changed. Provider-backed generation and Search Console access require configuration; the repository’s scripts are separate from the browser tools that run without an API.",
          "Commencez par la taxonomie et le script de scoring, puis consultez le rapport et les suggestions de liens. L’optimiseur distingue simulation et application pour permettre une revue avant modification. La génération et l’accès Search Console demandent une configuration ; ces scripts sont distincts des outils qui fonctionnent dans le navigateur sans API.",
        ),
      },
      {
        title: l(
          "Separate the snapshot from the current site",
          "Distinguer l’instantané du site actuel",
        ),
        body: l(
          "iloveblogs has evolved since this extraction. Its current articles, tools and public library are the destinations to inspect for today’s reader experience. This page presents the older code as a historical toolkit; it does not treat the README’s old workflow descriptions or promotional figures as current results.",
          "iloveblogs a évolué depuis cette extraction. Les articles, outils et bibliothèque publique actuels montrent l’expérience disponible aujourd’hui. Cette page présente l’ancien code comme une boîte à outils historique, avec son contexte de publication.",
        ),
      },
    ],
    docs: [
      {
        name: "Repository README",
        url: "https://github.com/mahdibrr/nextjs-seo-content-engine#readme",
      },
      {
        name: "Source files",
        url: "https://github.com/mahdibrr/nextjs-seo-content-engine/tree/main",
      },
    ],
    related: [
      {
        name: "iloveblogs.blog",
        url: publicationUrl,
        kind: l("Current publication", "Publication actuelle"),
      },
      {
        name: "iloveblogs case study",
        url: "/work/iloveblogs/",
        kind: l("Current project context", "Contexte du projet actuel"),
      },
      {
        name: "Publication stats",
        url: "/stats/iloveblogs/",
        kind: l("Dated, sourced figures", "Chiffres datés et sourcés"),
      },
    ],
  },
];

export const resources = [
  {
    name: "React",
    url: "https://react.dev/learn",
    kind: "documentation",
    description: l(
      "The official guide to components, state and the interface model.",
      "Le guide officiel des composants, de l’état et du modèle d’interface.",
    ),
  },
  {
    name: "Next.js",
    url: "https://nextjs.org/docs",
    kind: "documentation",
    description: l(
      "Routing, server rendering, static exports and application boundaries.",
      "Routage, rendu serveur, export statique et frontières de l’application.",
    ),
  },
  {
    name: "FastAPI",
    url: "https://fastapi.tiangolo.com/",
    kind: "documentation",
    description: l(
      "Python API design, validation and the request/response model.",
      "Conception d’API Python, validation et modèle requête/réponse.",
    ),
  },
  {
    name: "Supabase",
    url: "https://supabase.com/docs/guides/database/postgres/row-level-security",
    kind: "documentation",
    description: l(
      "The primary reference for Postgres row-level security in Supabase.",
      "La référence pour les politiques de sécurité RLS dans Supabase.",
    ),
  },
  {
    name: "Cloudflare Pages",
    url: "https://developers.cloudflare.com/pages/",
    kind: "documentation",
    description: l(
      "The hosting documentation behind the portfolio’s static deployment.",
      "La documentation de l’hébergement statique de ce portfolio.",
    ),
  },
  {
    name: "Awesome MCP Servers",
    url: "https://github.com/punkpeye/awesome-mcp-servers",
    kind: "upstream",
    description: l(
      "The original community directory of MCP servers, maintained by its upstream contributors.",
      "L’annuaire communautaire d’origine des serveurs MCP, réalisé par ses contributeurs.",
    ),
  },
  {
    name: "My MCP directory fork",
    url: "https://github.com/mahdibrr/awesome-mcp-servers",
    kind: "fork",
    description: l(
      "A personal fork of the upstream directory, kept separate from my original projects.",
      "Un fork personnel de l’annuaire, présenté séparément de mes réalisations originales.",
    ),
  },
  {
    name: "dev-error-explainers MCP",
    url: "https://github.com/mahdibrr/dev-error-explainers/blob/main/docs/MCP.md",
    kind: "original",
    description: l(
      "Documentation for the real explain_error MCP server in my public library.",
      "Documentation du serveur MCP explain_error de ma bibliothèque publique.",
    ),
  },
];

export const extensionRoutes = [
  "/work/",
  "/open-source/",
  ...sourceProjects.map((project) => "/open-source/" + project.slug + "/"),
  "/writing/",
  "/tools/",
  "/resources/",
  "/stats/iloveblogs/",
];

export function ecosystemSchema(
  locale: Locale,
  route: string,
  title: string,
  description: string,
  items?: { name: string; url: string }[],
  source?: SourceProject,
) {
  const schema = pageSchema(locale, route, title, description);
  if (items)
    schema["@graph"].push({
      "@type": "ItemList",
      name: title,
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Thing",
          name: item.name,
          url: item.url.startsWith("/")
            ? identity.url + routeFor(locale, item.url)
            : item.url,
        },
      })),
    });
  if (source)
    schema["@graph"].push({
      "@type": "SoftwareSourceCode",
      name: source.name,
      description: source.summary[locale],
      codeRepository: source.repo,
      url: identity.url + routeFor(locale, route),
      author: { "@id": identity.url + "/#person" },
    });
  return schema;
}
export function displayDate(value: string, locale: Locale) {
  return new Date(value).toLocaleDateString(
    locale === "fr" ? "fr-FR" : "en-GB",
    { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" },
  );
}
