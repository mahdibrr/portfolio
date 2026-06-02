"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import dynamic from "next/dynamic"
import {
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ArrowUpRight,
  ArrowRight,
  Globe,
  Server,
  Smartphone,
  Code2,
  GraduationCap,
  Activity,
  Trophy,
} from "lucide-react"
import { Toaster } from "sonner"
import { useScrollProgress } from "@/lib/animation-utils"
import {
  generateAllSchemas,
  type ProjectData,
  type SkillData,
} from "@/lib/seo/structured-data"
import { FadeIn } from "@/components/FadeIn"
import { ContactForm } from "@/components/ContactForm"

// Decorative / heavy components — deferred so they never block first paint
const Spotlight = dynamic(() => import("@/components/Spotlight").then((m) => ({ default: m.Spotlight })), {
  ssr: false,
  loading: () => null,
})
// Modal carries framer-motion + the carousel — loaded only when a project is opened,
// keeping framer-motion out of the initial bundle (big mobile TBT win).
const ProjectModal = dynamic(() => import("@/components/ProjectModal").then((m) => ({ default: m.ProjectModal })), {
  ssr: false,
  loading: () => null,
})

const translations = {
  en: {
    nav: { about: "About", projects: "Projects", skills: "Skills", contact: "Contact" },
    badge: "Available for work",
    hero: {
      title: "Full-Stack Developer &",
      titleHighlight: "AI Builder",
      description:
        "I ship production SaaS — autonomous AI pipelines, medical systems, safety platforms. Next.js + Supabase + TypeScript, deployed and running.",
      viewWork: "View My Work",
      getInTouch: "Get in touch",
      introTitle: "I build systems that run in production — not in demos.",
      introDesc:
        "I'm Mahdi Ben Rhouma, a full-stack developer pursuing my LIM3 degree at Sesame University. I've shipped a work-at-height safety platform live in Tunisia, an autonomous AI content engine that generates and deploys articles daily, a full laundry-delivery SaaS, and a medical management system on a Java/Spring Boot backend. My stack: Next.js, TypeScript, Supabase and PostgreSQL on the web — Spring Boot and FastAPI on the backend.",
    },
    stats: {
      systems: "Production systems",
      domains: "Referring domains",
      pages: "Pages indexed",
      months: "From zero to rank",
    },
    about: {
      eyebrow: "About",
      title: "Engineer first, builder always",
      lead: "Real users, real data, real edge cases — that's the bar I build to.",
      education: "Education",
      educationDesc:
        "License in Multimedia Informatics, Web specialization (LIM3) at Sesame University. Modern web technologies and full-stack engineering.",
      currentProject: "Current focus",
      currentProjectDesc:
        "Running an autonomous AI content pipeline on iloveblogs.blog — daily generation, Telegram review, GitHub Actions deploy. 143 referring domains, 209 indexed pages.",
      experience: "Track record",
      experienceDesc:
        "6+ production systems shipped. 143 referring domains from zero in 5 months. Medical system, SaaS platforms and safety tools — all live.",
    },
    projects: {
      eyebrow: "Selected work",
      title: "Featured Projects",
      subtitle: "Production-grade applications — modern stacks, real users, shipped.",
      viewDetails: "View details",
      visitProject: "Visit project",
      viewCode: "Source",
      live: "Live",
      inDev: "In development",
      featured: "Featured",
      travail: "Travail en Hauteur Platform",
      travailDesc:
        "A comprehensive Next.js platform for high-altitude work management, safety documentation and project tracking, live in Tunisia.",
      iloveblogs: "iloveblogs.blog — AI Content Engine",
      iloveblogsDesc:
        "Fully autonomous SEO content pipeline. AI generates articles, sends them to Telegram for review, and deploys to production on APPROVE — zero manual steps. Grew from 0 to 143 referring domains in 5 months.",
      fastapi: "FastAPI Dispatching App",
      fastapiDesc:
        "Real-time dispatching application with optimized database queries, WebSocket integration and a mobile-responsive interface.",
      ghassla: "Ghassla — On-Demand Laundry SaaS",
      ghasslaDesc:
        "Full-stack SaaS for laundry pickup and delivery. Customers schedule pickups, choose time windows and track orders in real time. Complete order, driver and delivery management backend.",
      springboot: "Spring Boot Backend Services",
      springbootDesc:
        "Scalable backend services with Spring Boot — REST APIs, layered architecture and database optimization.",
      api: "API & Web Services",
      apiDesc:
        "RESTful API design, WebSocket integration, third-party services and real-time data processing.",
      otherTitle: "Other notable work",
    },
    skills: {
      eyebrow: "Stack",
      title: "Technical Skills",
      subtitle: "The tools I reach for to ship and maintain production software.",
    },
    contact: {
      eyebrow: "Contact",
      title: "Let's build something that ships.",
      description:
        "Got a project, a role, or an idea worth shipping? Send a message — I read every one.",
      orReach: "Or reach me on",
    },
    footer: "© 2026 Mahdi Ben Rhouma — Full-Stack Developer & AI Builder.",
  },
  fr: {
    nav: { about: "À propos", projects: "Projets", skills: "Compétences", contact: "Contact" },
    badge: "Disponible",
    hero: {
      title: "Développeur Full-Stack &",
      titleHighlight: "Architecte IA",
      description:
        "Je livre des SaaS en production — pipelines IA autonomes, systèmes médicaux, plateformes de sécurité. Next.js + Supabase + TypeScript, déployés et opérationnels.",
      viewWork: "Voir mes travaux",
      getInTouch: "Me contacter",
      introTitle: "Je construis des systèmes qui tournent en production — pas en démo.",
      introDesc:
        "Je suis Mahdi Ben Rhouma, développeur full-stack en LIM3 à l'Université Sesame. J'ai livré une plateforme de sécurité travail en hauteur active en Tunisie, un moteur IA autonome qui génère et publie des articles chaque jour, un SaaS de livraison de blanchisserie complet, et un système médical sur backend Java/Spring Boot. Ma stack : Next.js, TypeScript, Supabase et PostgreSQL côté web — Spring Boot et FastAPI côté backend.",
    },
    stats: {
      systems: "Systèmes en prod",
      domains: "Domaines référents",
      pages: "Pages indexées",
      months: "De zéro au top",
    },
    about: {
      eyebrow: "À propos",
      title: "Ingénieur d'abord, builder toujours",
      lead: "De vrais utilisateurs, de vraies données, de vrais cas limites — c'est mon niveau d'exigence.",
      education: "Formation",
      educationDesc:
        "Licence en Informatique Multimédia, spécialité Web (LIM3) à l'Université Sesame. Technologies web modernes et ingénierie full-stack.",
      currentProject: "Focus actuel",
      currentProjectDesc:
        "Pipeline IA autonome sur iloveblogs.blog — génération quotidienne, revue Telegram, déploiement GitHub Actions. 143 domaines référents, 209 pages indexées.",
      experience: "Bilan",
      experienceDesc:
        "6+ systèmes en production livrés. 143 domaines référents de zéro en 5 mois. Système médical, SaaS et outils de sécurité — tous actifs.",
    },
    projects: {
      eyebrow: "Projets sélectionnés",
      title: "Projets Phares",
      subtitle: "Des applications de production — stacks modernes, vrais utilisateurs, livrées.",
      viewDetails: "Voir le détail",
      visitProject: "Visiter le projet",
      viewCode: "Code source",
      live: "En ligne",
      inDev: "En développement",
      featured: "Phare",
      travail: "Plateforme Travail en Hauteur",
      travailDesc:
        "Une plateforme Next.js complète pour la gestion des travaux en hauteur, la documentation de sécurité et le suivi de projet, active en Tunisie.",
      iloveblogs: "iloveblogs.blog — Moteur IA de Contenu",
      iloveblogsDesc:
        "Pipeline SEO entièrement autonome. L'IA génère les articles, les envoie sur Telegram pour validation, et déploie en production sur APPROVE — zéro étape manuelle. De 0 à 143 domaines référents en 5 mois.",
      fastapi: "App Dispatching FastAPI",
      fastapiDesc:
        "Application de dispatching en temps réel avec requêtes optimisées, intégration WebSocket et interface responsive.",
      ghassla: "Ghassla — SaaS Blanchisserie à la Demande",
      ghasslaDesc:
        "SaaS full-stack pour la collecte et livraison de blanchisserie. Les clients planifient les collectes, choisissent les créneaux et suivent leurs commandes en temps réel. Backend complet commandes, chauffeurs et livraisons.",
      springboot: "Services Backend Spring Boot",
      springbootDesc:
        "Services backend scalables avec Spring Boot — APIs REST, architecture en couches et optimisation de base de données.",
      api: "API & Services Web",
      apiDesc:
        "Conception d'API RESTful, intégration WebSocket, services tiers et traitement de données en temps réel.",
      otherTitle: "Autres travaux notables",
    },
    skills: {
      eyebrow: "Stack",
      title: "Compétences Techniques",
      subtitle: "Les outils que j'utilise pour livrer et maintenir des logiciels en production.",
    },
    contact: {
      eyebrow: "Contact",
      title: "Construisons quelque chose qui se déploie.",
      description:
        "Un projet, un poste, une idée à livrer ? Envoyez un message — je les lis tous.",
      orReach: "Ou retrouvez-moi sur",
    },
    footer: "© 2026 Mahdi Ben Rhouma — Développeur Full-Stack & Architecte IA.",
  },
} as const

// --- Static SEO data (kept for JSON-LD structured data) ---
const skillsData: SkillData[] = [
  { name: "React", proficiency: 90 },
  { name: "Next.js", proficiency: 85 },
  { name: "TypeScript", proficiency: 85 },
  { name: "JavaScript", proficiency: 90 },
  { name: "FastAPI", proficiency: 80 },
  { name: "Python", proficiency: 85 },
  { name: "Spring Boot", proficiency: 75 },
  { name: "Java", proficiency: 75 },
  { name: "Node.js", proficiency: 80 },
  { name: "PostgreSQL", proficiency: 75 },
  { name: "MongoDB", proficiency: 70 },
  { name: "Docker", proficiency: 65 },
  { name: "Tailwind CSS", proficiency: 90 },
]

const projectsData: ProjectData[] = [
  {
    name: "Ghassla - Laundry Service Platform",
    description:
      "Full-stack on-demand laundry SaaS with real-time order, driver and delivery management.",
    technologies: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Stripe"],
    category: "web",
  },
  {
    name: "iloveblogs.blog - AI Content Engine",
    description:
      "Autonomous SEO content pipeline. AI generates, reviews via Telegram, and deploys to production.",
    technologies: ["Next.js", "TypeScript", "Groq AI", "GitHub Actions", "IndexNow"],
    url: "https://www.iloveblogs.blog",
    category: "web",
  },
  {
    name: "Travail en Hauteur Platform",
    description:
      "Next.js platform for high-altitude work management, safety documentation and project tracking.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    url: "https://www.travailenhauteur.tn",
    category: "web",
  },
  {
    name: "FastAPI Dispatching App",
    description:
      "Real-time dispatching application with optimized queries, WebSocket integration and responsive UI.",
    technologies: ["FastAPI", "Python", "WebSocket", "React", "Redis"],
    category: "software",
  },
]

const allSchemas = generateAllSchemas({ skills: skillsData, projects: projectsData })

type ProjectMedia =
  | { type: "gallery"; images: string[]; video?: { src: string; poster: string } }
  | { type: "mockup"; domain: string; note?: string }

interface ProjectItem {
  id: string
  index: string
  title: string
  description: string
  status: "live" | "dev"
  featured?: boolean
  tech: string[]
  links: { live?: string; github?: string }
  media: ProjectMedia
  icon: typeof Globe
}

const SOCIALS = {
  github: "https://github.com/mahdibrr",
  linkedin: "https://www.linkedin.com/in/mahdi-ben-rhouma-180971357/",
  email: "mahdi.benrhouma@sesame.com.tn",
}

export default function Portfolio() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [language, setLanguage] = useState<"en" | "fr">("en")
  const [mounted, setMounted] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)
  const scrollProgress = useScrollProgress()

  const t = translations[language]

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("portfolio-language")
    if (saved === "fr" || saved === "en") setLanguage(saved)
  }, [])

  useEffect(() => {
    if (mounted) localStorage.setItem("portfolio-language", language)
  }, [language, mounted])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
  }

  const projectItems: ProjectItem[] = [
    {
      id: "ghassla",
      index: "01",
      title: t.projects.ghassla,
      description: t.projects.ghasslaDesc,
      status: "live",
      featured: true,
      tech: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Stripe", "Tailwind CSS"],
      links: {},
      icon: Smartphone,
      media: {
        type: "gallery",
        images: [
          "/ghassla/processed/ghassla_11.jpg",
          "/ghassla/processed/ghassla_12.jpg",
          "/ghassla/processed/ghassla_18.jpg",
          "/ghassla/processed/ghassla_13.jpg",
        ],
        video: {
          src: "/ghassla/processed/Vidéo sans titre ‐ Réalisée avec Clipchamp.mp4",
          poster: "/ghassla/processed/ghassla_11.jpg",
        },
      },
    },
    {
      id: "iloveblogs",
      index: "02",
      title: t.projects.iloveblogs,
      description: t.projects.iloveblogsDesc,
      status: "live",
      tech: ["Next.js", "TypeScript", "Groq AI", "GitHub Actions", "IndexNow", "SEO"],
      links: { live: "https://www.iloveblogs.blog" },
      icon: Globe,
      media: { type: "mockup", domain: "iloveblogs.blog", note: "143 referring domains · 209 pages indexed" },
    },
    {
      id: "travail",
      index: "03",
      title: t.projects.travail,
      description: t.projects.travailDesc,
      status: "live",
      tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      links: { live: "https://www.travailenhauteur.tn" },
      icon: Globe,
      media: { type: "mockup", domain: "travailenhauteur.tn" },
    },
    {
      id: "fastapi",
      index: "04",
      title: t.projects.fastapi,
      description: t.projects.fastapiDesc,
      status: "dev",
      tech: ["FastAPI", "Python", "WebSocket", "React", "Redis"],
      links: {},
      icon: Server,
      media: {
        type: "gallery",
        images: [
          "/projects/dispatching/Screenshot 2025-09-17 194544.jpg",
          "/projects/dispatching/Screenshot 2025-09-17 194552.jpg",
          "/projects/dispatching/Screenshot 2025-09-17 194700.jpg",
        ],
      },
    },
  ]

  const otherProjects = [
    { title: t.projects.springboot, desc: t.projects.springbootDesc, tech: ["Spring Boot", "Java", "REST API"], icon: Server },
    { title: t.projects.api, desc: t.projects.apiDesc, tech: ["REST API", "WebSocket", "OAuth", "GraphQL"], icon: Globe },
  ]

  const stats = [
    { to: 6, suffix: "+", label: t.stats.systems },
    { to: 143, suffix: "", label: t.stats.domains },
    { to: 209, suffix: "", label: t.stats.pages },
    { to: 5, suffix: "mo", label: t.stats.months },
  ]

  const skillGroups = [
    {
      label: language === "en" ? "Frontend" : "Frontend",
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "React Native"],
    },
    {
      label: language === "en" ? "Backend" : "Backend",
      items: ["Node.js", "FastAPI", "Spring Boot", "Python", "Java", "Express"],
    },
    {
      label: language === "en" ? "Data & AI" : "Données & IA",
      items: ["PostgreSQL", "Supabase", "MongoDB", "Redis", "Groq AI", "WebSocket"],
    },
    {
      label: language === "en" ? "DevOps & Tools" : "DevOps & Outils",
      items: ["Docker", "GitHub Actions", "Vercel", "Git", "IndexNow", "Stripe"],
    },
  ]

  const activeProject = projectItems.find((p) => p.id === activeId) || null

  return (
    <div className="relative min-h-screen bg-[#0a0a0f] text-[#ededf2] font-sans overflow-x-hidden selection:bg-indigo-500/30 selection:text-white">
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>

      {/* JSON-LD structured data */}
      {allSchemas.map((schema, index) => (
        <script
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <Spotlight />
      <Toaster position="bottom-right" theme="dark" richColors />

      {/* Scroll progress */}
      <div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 to-teal-400 z-[60] origin-left"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
        aria-hidden="true"
      />

      {/* ===================== NAV ===================== */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/[0.06]" : "bg-transparent border-b border-transparent"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 font-display font-semibold text-[15px] tracking-tight"
            aria-label="Scroll to top"
          >
            <span className="text-indigo-400">◈</span>
            <span>mahdi</span>
            <span className="text-white/55 font-mono text-xs ml-1 hidden sm:inline">/ LIM3</span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {Object.entries(t.nav).map(([key, value]) => (
              <button
                key={key}
                onClick={() => scrollToSection(key)}
                className="px-4 py-2 text-sm text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/[0.04]"
              >
                {value}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLanguage(language === "en" ? "fr" : "en")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 text-xs font-mono font-medium text-white/70 hover:text-white transition-colors"
              aria-label={`Switch language to ${language === "en" ? "French" : "English"}`}
            >
              <Globe size={13} className="text-indigo-400" />
              {language.toUpperCase()}
            </button>
            <button
              className="md:hidden p-2 text-white/70 hover:text-white"
              onClick={() => setIsMenuOpen((v) => !v)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        <div
          className={`md:hidden overflow-hidden border-t bg-[#0a0a0f]/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 ease-out ${
            isMenuOpen ? "max-h-80 opacity-100 border-white/[0.06]" : "max-h-0 opacity-0 border-transparent"
          }`}
        >
          <div className="px-5 py-3 flex flex-col">
            {Object.entries(t.nav).map(([key, value]) => (
              <button
                key={key}
                onClick={() => scrollToSection(key)}
                className="flex items-center justify-between py-3 text-left text-white/70 hover:text-white border-b border-white/[0.04] last:border-0"
                tabIndex={isMenuOpen ? 0 : -1}
              >
                <span>{value}</span>
                <ArrowRight size={15} className="text-white/55" />
              </button>
            ))}
          </div>
        </div>
      </header>

      <main id="main-content">
        {/* ===================== HERO ===================== */}
        <section className="relative min-h-screen flex items-center pt-28 pb-16 px-5 sm:px-8">
          {/* Signature dot-grid motif */}
          <div className="absolute inset-0 bg-dot-grid mask-radial-fade pointer-events-none" aria-hidden="true" />
          <div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative w-full max-w-6xl mx-auto grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs font-mono text-white/70 mb-7">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-teal-400" />
                </span>
                {t.badge} · SESAME LIM3
              </div>

              <h1 className="font-display font-bold text-[2.6rem] sm:text-6xl lg:text-[4.2rem] leading-[1.02] tracking-tight">
                {t.hero.title}
                <br />
                <span className="text-gradient-brand">{t.hero.titleHighlight}</span>
              </h1>

              <p className="mt-6 text-base sm:text-lg text-white/60 leading-relaxed max-w-xl mx-auto lg:mx-0">
                {t.hero.description}
              </p>

              <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <button
                  onClick={() => scrollToSection("projects")}
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-400"
                >
                  {t.hero.viewWork}
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-6 py-3.5 font-semibold text-white/80 transition-colors hover:border-white/30 hover:text-white"
                >
                  <Mail size={17} />
                  {t.hero.getInTouch}
                </button>
              </div>

              <div className="mt-8 flex gap-5 justify-center lg:justify-start text-white/50">
                <a href={SOCIALS.github} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors" aria-label="GitHub profile">
                  <Github size={22} />
                </a>
                <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors" aria-label="LinkedIn profile">
                  <Linkedin size={22} />
                </a>
                <a href={`mailto:${SOCIALS.email}`} className="hover:text-indigo-400 transition-colors" aria-label="Send email">
                  <Mail size={22} />
                </a>
              </div>
            </div>

            {/* Profile image — LCP element */}
            <div className="relative max-w-sm mx-auto lg:max-w-none w-full">
              <div className="absolute -inset-4 bg-gradient-to-br from-indigo-500/20 to-teal-400/10 rounded-3xl blur-2xl" aria-hidden="true" />
              <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/[0.02]">
                <Image
                  src="/images/profile.jpg"
                  alt="Mahdi Ben Rhouma — Full-Stack Developer & AI Builder"
                  width={800}
                  height={800}
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 1024px) 80vw, 400px"
                  className="w-full h-auto object-cover aspect-square"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ===================== STATS ===================== */}
        <section className="px-5 sm:px-8 border-y border-white/[0.06]">
          <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/[0.06]">
            {stats.map((s, i) => (
              <div key={i} className="py-8 px-4 sm:px-6 text-center lg:text-left">
                <div className="font-display font-bold text-4xl sm:text-5xl text-white flex items-baseline justify-center lg:justify-start">
                  <CountUp to={s.to} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-xs sm:text-sm font-mono text-white/60 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ===================== ABOUT ===================== */}
        <section id="about" className="py-24 sm:py-32 px-5 sm:px-8">
          <div className="max-w-6xl mx-auto">
            <SectionEyebrow num="01">{t.about.eyebrow}</SectionEyebrow>

            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 mt-8">
              <div>
                <h2 className="font-display font-bold text-3xl sm:text-4xl leading-tight">{t.hero.introTitle}</h2>
                <p className="mt-5 text-lg text-white/50">{t.about.lead}</p>
              </div>
              <FadeIn>
                <p className="text-base sm:text-lg text-white/65 leading-relaxed">{t.hero.introDesc}</p>
              </FadeIn>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 mt-14">
              {[
                { icon: GraduationCap, title: t.about.education, desc: t.about.educationDesc },
                { icon: Activity, title: t.about.currentProject, desc: t.about.currentProjectDesc },
                { icon: Trophy, title: t.about.experience, desc: t.about.experienceDesc },
              ].map((card, i) => (
                <FadeIn key={i} delay={i * 0.08}>
                  <div className="h-full rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-colors hover:border-indigo-500/30">
                    <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                      <card.icon size={20} />
                    </div>
                    <h3 className="font-display font-semibold text-lg text-white">{card.title}</h3>
                    <p className="mt-2 text-sm text-white/55 leading-relaxed">{card.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== PROJECTS ===================== */}
        <section id="projects" className="py-24 sm:py-32 px-5 sm:px-8 border-t border-white/[0.06]">
          <div className="max-w-6xl mx-auto">
            <SectionEyebrow num="02">{t.projects.eyebrow}</SectionEyebrow>
            <div className="mt-6 mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="font-display font-bold text-4xl sm:text-5xl">{t.projects.title}</h2>
              <p className="text-white/50 max-w-md">{t.projects.subtitle}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {projectItems.map((p, i) => (
                <FadeIn key={p.id} delay={i * 0.06}>
                  <button
                    onClick={() => setActiveId(p.id)}
                    className="group h-full w-full text-left rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7 transition-all hover:border-indigo-500/40 hover:bg-white/[0.04]"
                    aria-label={`${t.projects.viewDetails}: ${p.title}`}
                  >
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-teal-400/10 border border-white/10 flex items-center justify-center text-indigo-300">
                        <p.icon size={22} />
                      </div>
                      <div className="flex items-center gap-3">
                        <StatusPill status={p.status} live={t.projects.live} dev={t.projects.inDev} />
                        <span className="font-mono text-xs text-white/55">{p.index}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-semibold text-xl text-white group-hover:text-indigo-300 transition-colors">
                        {p.title}
                      </h3>
                      {p.featured && (
                        <span className="px-2 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/25 text-[10px] font-mono uppercase tracking-wide text-indigo-300">
                          {t.projects.featured}
                        </span>
                      )}
                    </div>

                    <p className="mt-3 text-sm text-white/55 leading-relaxed line-clamp-3">{p.description}</p>

                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {p.tech.slice(0, 4).map((tech) => (
                        <span key={tech} className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-xs font-mono text-white/60">
                          {tech}
                        </span>
                      ))}
                      {p.tech.length > 4 && (
                        <span className="px-2.5 py-1 text-xs font-mono text-white/60">+{p.tech.length - 4}</span>
                      )}
                    </div>

                    <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-400 group-hover:gap-2.5 transition-all">
                      {t.projects.viewDetails}
                      <ArrowUpRight size={16} />
                    </div>
                  </button>
                </FadeIn>
              ))}
            </div>

            {/* Other notable work */}
            <h3 className="font-display font-semibold text-lg text-white/80 mt-16 mb-6">{t.projects.otherTitle}</h3>
            <div className="grid md:grid-cols-2 gap-5">
              {otherProjects.map((p, i) => (
                <div key={i} className="rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6 flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/50">
                    <p.icon size={18} />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-base text-white">{p.title}</h4>
                    <p className="mt-1.5 text-sm text-white/50 leading-relaxed">{p.desc}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {p.tech.map((tech) => (
                        <span key={tech} className="px-2 py-0.5 rounded bg-white/[0.04] text-[11px] font-mono text-white/55">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== SKILLS ===================== */}
        <section id="skills" className="py-24 sm:py-32 px-5 sm:px-8 border-t border-white/[0.06]">
          <div className="max-w-6xl mx-auto">
            <SectionEyebrow num="03">{t.skills.eyebrow}</SectionEyebrow>
            <div className="mt-6 mb-14">
              <h2 className="font-display font-bold text-4xl sm:text-5xl">{t.skills.title}</h2>
              <p className="mt-3 text-white/50 max-w-xl">{t.skills.subtitle}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {skillGroups.map((group, i) => (
                <FadeIn key={group.label} delay={i * 0.06}>
                  <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="font-mono text-xs text-indigo-400">0{i + 1}</span>
                      <h3 className="font-display font-semibold text-white">{group.label}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-sm text-white/70 transition-colors hover:border-indigo-500/30 hover:text-white"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== CONTACT ===================== */}
        <section id="contact" className="py-24 sm:py-32 px-5 sm:px-8 border-t border-white/[0.06] relative">
          <div className="absolute inset-0 bg-dot-grid mask-radial-fade opacity-50 pointer-events-none" aria-hidden="true" />
          <div className="relative max-w-2xl mx-auto">
            <div className="text-center">
              <SectionEyebrow num="04" centered>
                {t.contact.eyebrow}
              </SectionEyebrow>
              <h2 className="font-display font-bold text-4xl sm:text-5xl mt-6">{t.contact.title}</h2>
              <p className="mt-4 text-white/55 max-w-md mx-auto">{t.contact.description}</p>
            </div>

            <div className="mt-12 rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-9">
              <ContactForm language={language} />
            </div>

            <div className="mt-10 text-center">
              <p className="text-xs font-mono uppercase tracking-wider text-white/35 mb-4">{t.contact.orReach}</p>
              <div className="flex items-center justify-center gap-3">
                <SocialLink href={`mailto:${SOCIALS.email}`} label="Email">
                  <Mail size={18} />
                </SocialLink>
                <SocialLink href={SOCIALS.github} label="GitHub" external>
                  <Github size={18} />
                </SocialLink>
                <SocialLink href={SOCIALS.linkedin} label="LinkedIn" external>
                  <Linkedin size={18} />
                </SocialLink>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-white/[0.06] py-10 px-5 sm:px-8">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/60">{t.footer}</p>
            <div className="flex items-center gap-2 font-mono text-xs text-white/55">
              <Code2 size={13} className="text-indigo-400" />
              Next.js · TypeScript · Tailwind
            </div>
          </div>
        </footer>
      </main>

      {/* ===================== PROJECT MODAL ===================== */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveId(null)}
        labels={{ live: t.projects.live, dev: t.projects.inDev, visit: t.projects.visitProject, code: t.projects.viewCode }}
      />
    </div>
  )
}

/* ---------- Small presentational helpers ---------- */

// Lightweight count-up (no framer-motion) — animates once when scrolled into view.
function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      setValue(to)
      return
    }
    let raf = 0
    let started = false
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true
          const duration = 1400
          const start = performance.now()
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / duration)
            const eased = 1 - Math.pow(1 - p, 3) // easeOutCubic
            setValue(Math.round(eased * to))
            if (p < 1) raf = requestAnimationFrame(tick)
          }
          raf = requestAnimationFrame(tick)
          obs.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    obs.observe(el)
    return () => {
      obs.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [to])

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  )
}

function SectionEyebrow({ num, children, centered }: { num: string; children: React.ReactNode; centered?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}>
      <span className="font-mono text-xs text-indigo-400">{num}</span>
      <span className="h-px w-8 bg-white/20" />
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/60">{children}</span>
    </div>
  )
}

function StatusPill({ status, live, dev }: { status: "live" | "dev"; live: string; dev: string }) {
  const isLive = status === "live"
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono ${
        isLive ? "bg-teal-500/10 text-teal-300 border border-teal-500/20" : "bg-amber-500/10 text-amber-300 border border-amber-500/20"
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${isLive ? "bg-teal-400" : "bg-amber-400"}`} />
      {isLive ? live : dev}
    </span>
  )
}

function SocialLink({
  href,
  label,
  external,
  children,
}: {
  href: string
  label: string
  external?: boolean
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      aria-label={label}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="w-11 h-11 flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-white/60 transition-colors hover:border-indigo-500/40 hover:text-indigo-300"
    >
      {children}
    </a>
  )
}
