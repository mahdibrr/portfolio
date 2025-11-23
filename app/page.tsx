"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import dynamic from "next/dynamic"
import { motion, AnimatePresence } from "framer-motion"
import useEmblaCarousel from "embla-carousel-react"
import {
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Smartphone,
  Server,
  Briefcase,
  Globe,
  ChevronLeft,
  ChevronRight,
  Database,
  Terminal,
  Cpu,
  Layers,
} from "lucide-react"
import { AnimatedGradientText } from "@/components/AnimatedGradientText"
import { FadeIn } from "@/components/FadeIn"
import { TextReveal } from "@/components/TextReveal"
import { MagneticButton } from "@/components/MagneticButton"
import { GlassmorphicCard } from "@/components/GlassmorphicCard"
import { AnimatedGrid } from "@/components/AnimatedGrid"
import { AnimatedSkillBar } from "@/components/AnimatedSkillBar"
import { AnimatedCounter } from "@/components/AnimatedCounter"
import { useScrollProgress } from "@/lib/animation-utils"
import { Spotlight } from "@/components/Spotlight"
import { SplitText } from "@/components/SplitText"
import { ShinyButton } from "@/components/ShinyButton"
import { BentoBox } from "@/components/BentoBox"
import { Marquee } from "@/components/Marquee"
import { ProjectCard3D } from "@/components/ProjectCard3D"

// Lazy load heavy animation and below-fold components
const FloatingParticles = dynamic(() => import("@/components/FloatingParticles").then(mod => ({ default: mod.FloatingParticles })), { ssr: false })
const CursorTrail = dynamic(() => import("@/components/CursorTrail").then(mod => ({ default: mod.CursorTrail })), { ssr: false })
const MorphingBlob = dynamic(() => import("@/components/MorphingBlob").then(mod => ({ default: mod.MorphingBlob })), { ssr: false })

// --- COMPONENT: Improved Carousel ---
function ProjectCarousel({ images, projectName }: { images: string[]; projectName: string }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative group/carousel rounded-2xl overflow-hidden shadow-2xl bg-slate-950 border border-white/10">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {images.map((src, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 relative bg-slate-900">
              <Image
                src={src}
                alt={`${projectName} ${index + 1}`}
                width={1920}
                height={1080}
                unoptimized
                className="w-full h-auto object-contain transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
        <button
          onClick={scrollPrev}
          className="pointer-events-auto p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white opacity-0 -translate-x-4 group-hover/carousel:opacity-100 group-hover/carousel:translate-x-0 transition-all duration-300 hover:bg-white/20 hover:scale-110"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={scrollNext}
          className="pointer-events-auto p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white opacity-0 translate-x-4 group-hover/carousel:opacity-100 group-hover/carousel:translate-x-0 transition-all duration-300 hover:bg-white/20 hover:scale-110"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 pointer-events-none">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-1.5 rounded-full transition-all duration-300 ${index === selectedIndex ? 'w-6 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'w-1.5 bg-white/40'
              }`}
          />
        ))}
      </div>
    </div>
  );
}

// --- COMPONENT: Ambient Video Player ---
function AmbientVideoPlayer({ src, poster }: { src: string; poster?: string }) {
  return (
    <div className="relative group">
      {/* Ambient Glow behind video */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />

      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-slate-900 shadow-2xl">
        <video
          controls
          className="w-full h-auto object-cover"
          poster={poster}
          playsInline
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}

const translations = {
  en: {
    nav: { about: "About", projects: "Projects", skills: "Skills", contact: "Contact" },
    hero: {
      title: "Full-Stack Developer &",
      titleHighlight: "Web Specialist",
      description:
        "Crafting exceptional web experiences with cutting-edge technologies. Specializing in modern web development, scalable backend systems, and enterprise solutions.",
      viewWork: "View My Work",
      getInTouch: "Get in Touch",
      introTitle: "Web Developer, Problem Solver, Digital Innovator",
      introDesc:
        "I'm Mahdi Ben Rhouma, a dedicated full-stack web developer pursuing my LIM3 degree at Sesame University. With expertise spanning modern web frameworks like React and Next.js, robust backend systems with FastAPI and Spring Boot, and scalable database architectures, I transform complex business challenges into elegant, performant web solutions. My work bridges creativity and technical excellence, delivering production-ready platforms that drive real-world impact—from enterprise work management systems to real-time dispatching applications and innovative digital service platforms.",
    },
    about: {
      title: "About Me",
      education: "Education",
      educationDesc:
        "License in Multimedia Informatics specializing in Web (LIM3) at Sesame University. Focused on modern web technologies and full-stack development.",
      currentProject: "Current Project",
      currentProjectDesc:
        "Building a FastAPI dispatching application with real-time features, database optimization, and scalable architecture.",
      experience: "Experience",
      experienceDesc: "5+ web projects delivered with modern frameworks and backend systems. Expert in React, Next.js, FastAPI, and Spring Boot ecosystems.",
    },
    projects: {
      title: "Featured Projects",
      travail: "Travail en Hauteur Platform",
      travailDesc:
        "A comprehensive web platform for high-altitude work management, safety documentation, and project tracking.",
      fastapi: "FastAPI Dispatching App",
      fastapiDesc:
        "Real-time dispatching application with optimized database queries, WebSocket integration, and mobile-responsive design.",
      ghassla: "Ghassla - Laundry Service Platform",
      ghasslaDesc:
        "Online laundry and lingerie washing service platform. Modern web application for scheduling pickups, managing orders, and tracking delivery status in real-time.",
      springboot: "Spring Boot Backend Projects",
      springbootDesc:
        "Scalable backend services with Spring Boot, REST APIs, microservices architecture, and database optimization.",
      mobile: "Mobile Applications",
      mobileDesc:
        "Cross-platform mobile development with React Native and native Android development using Java and XML.",
      visitProject: "Visit Project",
      inDevelopment: "Currently in Development",
    },
    skills: {
      title: "Technical Skills",
      frontend: "Frontend",
      backend: "Backend",
      mobile: "Mobile",
      tools: "Tools & DB",
    },
    contact: {
      title: "Let's Work Together",
      description: "I'm always interested in hearing about new projects and opportunities. Feel free to reach out!",
      sendEmail: "Send Email",
      githubProfile: "GitHub Profile",
      linkedinProfile: "LinkedIn",
    },
    footer: "© 2025 Mahdi Ben Rhouma- Full-Stack Developer. All rights reserved.",
  },
  fr: {
    nav: { about: "À propos", projects: "Projets", skills: "Compétences", contact: "Contact" },
    hero: {
      title: "Développeur Full-Stack &",
      titleHighlight: "Spécialiste Web",
      description:
        "Création d'expériences web exceptionnelles avec des technologies de pointe. Spécialisé dans le développement web moderne, les systèmes backend évolutifs et les solutions d'entreprise.",
      viewWork: "Voir Mes Travaux",
      getInTouch: "Me Contacter",
      introTitle: "Développeur Web, Résolveur de Problèmes, Innovateur Numérique",
      introDesc:
        "Je suis Mahdi Ben Rhouma, un développeur web full-stack dévoué poursuivant mon diplôme LIM3 à l'Université Sesame. Avec une expertise couvrant les frameworks web modernes comme React et Next.js, des systèmes backend robustes avec FastAPI et Spring Boot, et des architectures de bases de données évolutives, je transforme les défis commerciaux complexes en solutions web élégantes et performantes. Mon travail allie créativité et excellence technique, offrant des plateformes prêtes pour la production qui génèrent un impact réel—des systèmes de gestion d'entreprise aux applications de dispatching en temps réel et aux plateformes de services numériques innovantes.",
    },
    about: {
      title: "À Propos de Moi",
      education: "Éducation",
      educationDesc:
        "Licence en Informatique Multimedia spécialisée en Web (LIM3) à l'Université Sesame. Axé sur les technologies web modernes et le d��veloppement full-stack.",
      currentProject: "Projet Actuel",
      currentProjectDesc:
        "Développement d'une application de dispatching FastAPI avec des fonctionnalités en temps réel, optimisation de base de données et architecture scalable.",
      experience: "Expérience",
      experienceDesc:
        "5+ projets web livrés avec des frameworks modernes et des systèmes backend. Expert dans les écosystèmes React, Next.js, FastAPI et Spring Boot.",
    },
    projects: {
      title: "Projets Phares",
      travail: "Plateforme Travail en Hauteur",
      travailDesc:
        "Une plateforme web complète pour la gestion des travaux en hauteur, documentation de sécurité et suivi de projet.",
      fastapi: "App Dispatching FastAPI",
      fastapiDesc:
        "Application de dispatching en temps réel avec requêtes de base de données optimisées, intégration WebSocket et conception responsive.",
      ghassla: "Ghassla - Plateforme de Service de Lavage",
      ghasslaDesc:
        "Plateforme en ligne de service de lavage de lingerie. Application web moderne pour la planification des collectes, la gestion des commandes et le suivi de livraison en temps réel.",
      springboot: "Projets Backend Spring Boot",
      springbootDesc:
        "Services backend scalables avec Spring Boot, APIs REST, architecture microservices et optimisation de base de données.",
      mobile: "Applications Mobiles",
      mobileDesc:
        "Développement mobile multiplateforme avec React Native et développement Android natif en Java et XML.",
      visitProject: "Visiter le Projet",
      inDevelopment: "Actuellement en Développement",
    },
    skills: {
      title: "Compétences Techniques",
      frontend: "Frontend",
      backend: "Backend",
      mobile: "Mobile",
      tools: "Outils & BD",
    },
    contact: {
      title: "Travaillons Ensemble",
      description: "Je suis toujours intéressé par les nouveaux projets et opportunités. N'hésitez pas à me contacter!",
      sendEmail: "Envoyer un Email",
      githubProfile: "Profil GitHub",
      linkedinProfile: "LinkedIn",
    },
    footer: "© 2025 Mahdi Ben Rhouma- Développeur Full-Stack. Tous droits réservés.",
  },
}

export default function Portfolio() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [language, setLanguage] = useState<"en" | "fr">("en")
  const [mounted, setMounted] = useState(false)
  const [hoverNav, setHoverNav] = useState<string | null>(null)
  const [showGhasslaVideo, setShowGhasslaVideo] = useState(false)
  const scrollProgress = useScrollProgress()

  const t = translations[language]

  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mahdi Ben Rhouma",
    jobTitle: "Full-Stack Developer",
    description: "Full-stack web developer specializing in React, Next.js, FastAPI, and Spring Boot",
    url: "https://mahdibr.online",
    email: "mahdi.benrhouma@sesame.com.tn",
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Sesame University",
      description: "LIM3 - License in Multimedia Informatics specializing in Web"
    },
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "FastAPI",
      "Python",
      "Spring Boot",
      "Java",
      "Node.js",
      "Web Development",
      "Full-Stack Development",
      "Backend Development",
      "Frontend Development"
    ],
    sameAs: [
      "https://github.com/mahdibrr",
      "https://www.linkedin.com/in/mahdi-ben-rhouma-180971357/"
    ]
  }

  useEffect(() => {
    setMounted(true)
    const savedLanguage = localStorage.getItem("portfolio-language")
    if (savedLanguage === "fr" || savedLanguage === "en") {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("portfolio-language", language)
    }
  }, [language, mounted])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
  }

  if (!mounted) return null

  return (
    <div className="relative min-h-screen bg-[#050505] text-slate-200 selection:bg-cyan-500/30 font-sans overflow-x-hidden">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Spotlight />
      <FloatingParticles />
      <CursorTrail />
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 z-50"
        style={{
          scaleX: scrollProgress / 100,
          transformOrigin: "0%",
        }}
      />

      {/* Navigation - Floating Island */}
      <AnimatePresence>
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            top: isScrolled ? "1rem" : "0rem"
          }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
            top: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
          }}
          className={`fixed z-50 left-1/2 -translate-x-1/2 ${isScrolled
              ? "w-[90%] max-w-5xl"
              : "w-full max-w-full"
            }`}
        >
          <motion.div
            className={`relative flex items-center justify-between px-6 ${isScrolled
                ? "bg-slate-900/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/10"
                : "bg-slate-900/70 backdrop-blur-lg border-b border-white/5"
              }`}
            animate={{
              borderRadius: isScrolled ? "9999px" : "0px",
              paddingTop: isScrolled ? "0.5rem" : "0.75rem",
              paddingBottom: isScrolled ? "0.5rem" : "0.75rem",
            }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >

            {/* 1. Logo Section */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-500" />
                <div className="relative text-xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
                  MB<span className="text-cyan-400">.</span>
                </div>
              </div>

              {!isScrolled && (
                <div className="hidden sm:flex flex-col">
                  <span className="text-xs font-medium text-slate-300 tracking-wide">Sesame LIM3</span>
                </div>
              )}
            </div>

            {/* 2. Desktop Navigation (Sliding Pill Effect) */}
            <div className="hidden md:flex items-center gap-1 bg-black/20 p-1 rounded-full border border-white/5 backdrop-blur-sm">
              {Object.entries(t.nav).map(([key, value]) => {
                const isHovered = hoverNav === key;
                return (
                  <button
                    key={key}
                    onClick={() => scrollToSection(key)}
                    onMouseEnter={() => setHoverNav(key)}
                    onMouseLeave={() => setHoverNav(null)}
                    className="relative px-5 py-2 text-sm font-medium transition-colors duration-300"
                  >
                    {/* The Sliding Background Pill */}
                    {isHovered && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-white/10 rounded-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className={`relative z-10 ${isHovered ? "text-white" : "text-slate-400"}`}>
                      {value}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* 3. Actions (Language & Mobile Toggle) */}
            <div className="flex items-center gap-3">
              {/* Language Switcher */}
              <button
                onClick={() => setLanguage(language === "en" ? "fr" : "en")}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-xs font-medium text-slate-300 hover:text-white group"
              >
                <Globe size={14} className="group-hover:rotate-180 transition-transform duration-500 text-cyan-400" />
                <span>{language.toUpperCase()}</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden relative z-50 p-2 text-slate-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </motion.div>

          {/* 4. Mobile Menu Overlay */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 mt-2 p-4 mx-auto w-[95%] bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl md:hidden overflow-hidden"
              >
                <div className="flex flex-col gap-2">
                  {Object.entries(t.nav).map(([key, value], i) => (
                    <motion.button
                      key={key}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => {
                        scrollToSection(key);
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-left group"
                    >
                      <span className="text-slate-300 group-hover:text-white font-medium">{value}</span>
                      <ChevronRight size={16} className="text-slate-600 group-hover:text-cyan-400 transition-colors" />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </AnimatePresence>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-20 sm:pt-24 md:pt-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="hidden md:block">
          <MorphingBlob />
        </div>
        <div className="w-full max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Left side - Text */}
            <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
              <motion.div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-cyan-400/50 rounded-full text-xs sm:text-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                <span className="font-semibold text-cyan-300">SESAME University • LIM3</span>
              </motion.div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <SplitText delay={0.1}>{t.hero.title}</SplitText>
                <br />
                <span className="text-white">
                  <SplitText delay={0.2}>{t.hero.titleHighlight}</SplitText>
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0"
              >
                {t.hero.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 justify-center lg:justify-start"
              >
                <ShinyButton onClick={() => scrollToSection("projects")} icon={<Code2 size={18} />}>
                  {t.hero.viewWork}
                </ShinyButton>
                <ShinyButton
                  onClick={() => scrollToSection("contact")}
                  className="!bg-transparent !border-white/20 hover:!bg-white/5"
                  icon={<Mail size={18} />}
                >
                  {t.hero.getInTouch}
                </ShinyButton>
              </motion.div>

              <div className="flex gap-4 sm:gap-6 pt-6 sm:pt-8 justify-center lg:justify-start">
                <a
                  href="https://github.com/mahdibrr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors hover:scale-110 transform duration-300"
                  title="GitHub"
                >
                  <Github size={28} />
                </a>
                <a
                  href="https://www.linkedin.com/in/mahdi-ben-rhouma-180971357/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors hover:scale-110 transform duration-300"
                  title="LinkedIn"
                >
                  <Linkedin size={28} />
                </a>
                <a
                  href="mailto:mahdi.benrhouma@sesame.com.tn"
                  className="hover:text-cyan-400 transition-colors hover:scale-110 transform duration-300"
                  title="Email"
                >
                  <Mail size={28} />
                </a>
              </div>
            </div>

            {/* Right side - Profile Image */}
            <div className="relative max-w-md mx-auto lg:max-w-none mt-8 lg:mt-0">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-2xl opacity-30"></div>
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/50 backdrop-blur-sm bg-slate-800/30">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1762418984226%5B1%5D-0GuU3AYTPFoUAfJL6iO1sgPD1hxcLl.jpg"
                  alt="Mahdi Ben Rhouma Profile"
                  width={800}
                  height={800}
                  priority
                  unoptimized
                  className="w-full h-auto rounded-2xl object-cover aspect-square sm:aspect-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Introduction Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-700/50 relative overflow-hidden z-10">
        <AnimatedGrid opacity={0.03} />
        <div className="max-w-5xl mx-auto relative z-10">
          <FadeIn>
            <GlassmorphicCard className="p-6 sm:p-8 md:p-10 lg:p-12 group" enableTilt={false} glowColor="from-cyan-400 to-blue-400">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {t.hero.introTitle}
              </h2>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                {t.hero.introDesc}
              </p>
              <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4">
                <div className="flex items-center gap-2 text-cyan-400">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                  <span className="text-xs sm:text-sm font-medium">Full-Stack Expertise</span>
                </div>
                <div className="flex items-center gap-2 text-cyan-400">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                  <span className="text-xs sm:text-sm font-medium">Sesame University LIM3</span>
                </div>
              </div>
            </GlassmorphicCard>
          </FadeIn>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{t.about.title}</h2>
          <p className="text-slate-400 max-w-xl">
            {language === "en"
              ? "Passionate about technology and innovation."
              : "Passionné par la technologie et l'innovation."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BentoBox className="flex flex-col items-center justify-center text-center bg-blue-900/10" delay={0}>
            <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-4 text-blue-400">
              <Code2 size={32} />
            </div>
            <h4 className="text-xl font-bold text-white">{t.about.education}</h4>
            <p className="text-sm text-slate-400 mt-2">{t.about.educationDesc}</p>
          </BentoBox>

          <BentoBox className="flex flex-col items-center justify-center text-center bg-cyan-900/10" delay={0.1}>
            <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center mb-4 text-cyan-400">
              <Briefcase size={32} />
            </div>
            <h4 className="text-xl font-bold text-white">{t.about.currentProject}</h4>
            <p className="text-sm text-slate-400 mt-2">{t.about.currentProjectDesc}</p>
          </BentoBox>

          <BentoBox className="flex flex-col items-center justify-center text-center bg-purple-900/10" delay={0.2}>
            <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-4 text-purple-400">
              <Server size={32} />
            </div>
            <h4 className="text-xl font-bold text-white">{t.about.experience}</h4>
            <p className="text-sm text-slate-400 mt-2">{t.about.experienceDesc}</p>
          </BentoBox>
        </div>
      </section>

      {/* Enhanced Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              {t.projects.title}
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              {language === "en"
                ? "Discover production-ready web applications built with modern frameworks, scalable architectures, and cutting-edge technologies"
                : "Découvrez des applications web prêtes pour la production construites avec des frameworks modernes, des architectures évolutives et des technologies de pointe"}
            </p>
          </div>

          <div className="space-y-24"> {/* Increased spacing for better separation */}

            {/* =========================================
                PROJECT 1: Travail en Hauteur
            ========================================= */}
            <FadeIn delay={0.1}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group relative bg-slate-900/40 border border-slate-700/50 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-colors duration-500 backdrop-blur-sm"
              >
                {/* Ambient Background Glow */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="relative p-8 md:p-10">
                  <div className="flex flex-col gap-8">

                    {/* Content Side */}
                    <div className="w-full space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                          <Globe size={32} className="text-white" />
                        </div>
                        <div>
                          <h3 className="text-3xl font-bold text-white group-hover:text-blue-400 transition-colors">{t.projects.travail}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            <span className="text-sm font-medium text-blue-400">Production • Live</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-lg text-slate-300 leading-relaxed">{t.projects.travailDesc}</p>

                      <div className="flex flex-wrap gap-2">
                        {["HTML5", "CSS3", "JavaScript", "Responsive Design"].map((tech) => (
                          <span key={tech} className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-lg text-sm font-medium text-blue-300">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="pt-2">
                        <a
                          href="https://www.travailenhauteur.tn"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 hover:bg-blue-50 rounded-xl font-bold text-base transition-all duration-300 transform hover:scale-105 group/link shadow-lg shadow-white/5"
                        >
                          {t.projects.visitProject}
                          <ExternalLink size={18} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                        </a>
                      </div>
                    </div>

                    {/* Live Preview Side */}
                    <div className="w-full h-[600px] rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-white">
                      <iframe
                        src="https://www.travailenhauteur.tn"
                        className="w-full h-full border-0"
                        title="Travail en Hauteur Live Preview"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </FadeIn>

            {/* =========================================
                PROJECT 2: FastAPI Dispatching
            ========================================= */}
            <FadeIn delay={0.2}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group relative bg-slate-900/40 border border-slate-700/50 rounded-3xl overflow-hidden hover:border-emerald-500/50 transition-colors duration-500 backdrop-blur-sm"
              >
                {/* Ambient Background Glow */}
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                <div className="relative p-8 md:p-10">
                  <div className="flex flex-col gap-8">

                    {/* Content Side */}
                    <div className="w-full space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
                          <Server size={32} className="text-white" />
                        </div>
                        <div>
                          <h3 className="text-3xl font-bold text-white group-hover:text-emerald-400 transition-colors">{t.projects.fastapi}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                            <span className="text-sm font-medium text-emerald-400">In Development</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-lg text-slate-300 leading-relaxed">{t.projects.fastapiDesc}</p>

                      <div className="flex flex-wrap gap-2">
                        {["FastAPI", "Python", "WebSocket", "React", "Redis"].map((tech) => (
                          <span key={tech} className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-sm font-medium text-emerald-300">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Carousel Side */}
                    <div className="w-full">
                      <ProjectCarousel
                        images={[
                          "/projects/dispatching/Screenshot 2025-09-17 194544.jpg",
                          "/projects/dispatching/Screenshot 2025-09-17 194552.jpg",
                          "/projects/dispatching/Screenshot 2025-09-17 194700.jpg",
                        ]}
                        projectName="FastAPI App"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </FadeIn>

            {/* =========================================
                PROJECT 3: Ghassla (Featured with Video)
            ========================================= */}
            <FadeIn delay={0.3}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group relative bg-gradient-to-br from-slate-900/60 to-slate-900/40 border border-slate-700/50 rounded-3xl overflow-hidden hover:border-purple-500/50 transition-all duration-500 shadow-2xl hover:shadow-purple-900/20 backdrop-blur-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative p-8 md:p-10">
                  <div className="space-y-8">

                    {/* Header Area */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-300">
                          <Smartphone size={32} className="text-white" />
                        </div>
                        <div>
                          <h3 className="text-4xl font-bold text-white group-hover:text-purple-300 transition-colors">{t.projects.ghassla}</h3>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30 uppercase tracking-wide">
                              Featured
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-xl text-slate-300 leading-relaxed max-w-3xl">{t.projects.ghasslaDesc}</p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"].map((tech) => (
                        <span key={tech} className="px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg text-sm font-semibold text-purple-300 hover:bg-purple-500/20 transition-colors">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="space-y-8 mt-8">
                      {/* Screenshots Carousel - Full Width */}
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-slate-400 flex items-center gap-2">
                          <Globe size={18} /> UI Showcase
                        </h4>
                        <ProjectCarousel
                          images={[
                            "/ghassla/processed/ghassla_11.jpg",
                            "/ghassla/processed/ghassla_12.jpg",
                            "/ghassla/processed/ghassla_18.jpg",
                            "/ghassla/processed/ghassla_13.jpg",
                          ]}
                          projectName="Ghassla Screenshots"
                        />
                      </div>

                      {/* Live Demo Video - Full Width - Conditionally Shown */}
                      {showGhasslaVideo && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.5 }}
                          className="space-y-4"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="text-lg font-semibold text-slate-400 flex items-center gap-2">
                              <Smartphone size={18} /> {language === "en" ? "Live Demo" : "Démo en Direct"}
                            </h4>
                            {/* Ping Animation */}
                            <div className="flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full">
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                              </span>
                              <span className="text-xs font-bold text-purple-300 uppercase">Live</span>
                            </div>
                          </div>

                          <AmbientVideoPlayer
                            src="/ghassla/Vidéo sans titre ‐ Réalisée avec Clipchamp.mp4"
                            poster="/ghassla/processed/ghassla_11.jpg"
                          />
                        </motion.div>
                      )}

                      {/* Demo Available Indicator */}
                      {!showGhasslaVideo && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          className="flex items-center justify-center"
                        >
                          <button
                            onClick={() => setShowGhasslaVideo(true)}
                            className="relative group/demo cursor-pointer"
                          >
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 rounded-lg blur opacity-60 group-hover/demo:opacity-100 transition duration-1000 animate-pulse"></div>
                            <div className="relative px-8 py-4 bg-slate-900 rounded-lg border border-purple-500/30 group-hover/demo:border-purple-500/60 transition-all">
                              <div className="flex items-center justify-center gap-3">
                                <span className="relative flex h-3 w-3">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                                </span>
                                <span className="text-sm md:text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 uppercase tracking-wide">
                                  {language === "en" ? "Watch Live Demo" : "Voir la Démo en Direct"}
                                </span>
                                <span className="relative flex h-3 w-3">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                                </span>
                              </div>
                            </div>
                          </button>
                        </motion.div>
                      )}
                    </div>

                  </div>
                </div>
              </motion.div>
            </FadeIn>

            {/* Other Projects - Compact Grid */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-8">
                {language === "en" ? "Other Notable Projects" : "Autres Projets Notables"}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Spring Boot Project */}
                <div className="group relative bg-slate-700/50 border border-slate-600 rounded-xl overflow-hidden hover:border-purple-400 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
                  <div className="bg-gradient-to-br from-purple-500/20 to-cyan-500/20 h-40 flex items-center justify-center">
                    <Server size={60} className="text-purple-400/30" />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-semibold mb-2">{t.projects.springboot}</h4>
                    <p className="text-slate-300 mb-4 text-sm">{t.projects.springbootDesc}</p>
                    <div className="flex flex-wrap gap-2">
                      {["Spring Boot", "Java", "REST API"].map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-purple-500/20 border border-purple-400 rounded-full text-xs text-purple-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* API & Integrations Project */}
                <div className="group relative bg-slate-700/50 border border-slate-600 rounded-xl overflow-hidden hover:border-orange-400 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20">
                  <div className="bg-gradient-to-br from-orange-500/20 to-cyan-500/20 h-40 flex items-center justify-center">
                    <Globe size={60} className="text-orange-400/30" />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-semibold mb-2">
                      {language === "en" ? "API & Web Services" : "API & Services Web"}
                    </h4>
                    <p className="text-slate-300 mb-4 text-sm">
                      {language === "en"
                        ? "RESTful API design, WebSocket integration, third-party service integration, and real-time data processing."
                        : "Conception d'API RESTful, intégration WebSocket, intégration de services tiers et traitement de données en temps réel."}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["REST API", "WebSocket", "OAuth", "GraphQL"].map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-orange-500/20 border border-orange-400 rounded-full text-xs text-orange-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-slate-900/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
          <h2 className="text-3xl font-bold">{t.skills.title}</h2>
        </div>

        <div className="space-y-8">
          <Marquee speed={30}>
            {[
              { icon: <Code2 />, name: "React" },
              { icon: <Globe />, name: "Next.js" },
              { icon: <Smartphone />, name: "TypeScript" },
              { icon: <Database />, name: "PostgreSQL" },
              { icon: <Terminal />, name: "FastAPI" },
              { icon: <Server />, name: "Spring Boot" },
              { icon: <Layers />, name: "Docker" },
              { icon: <Cpu />, name: "Node.js" },
            ].map((tech, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-8 py-3 rounded-full bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-colors mx-4 whitespace-nowrap"
              >
                <span className="text-cyan-400">{tech.icon}</span>
                <span className="font-semibold text-lg">{tech.name}</span>
              </div>
            ))}
          </Marquee>

          <Marquee speed={30} direction={-1}>
            {[
              { icon: <Code2 />, name: "JavaScript" },
              { icon: <Database />, name: "MongoDB" },
              { icon: <Terminal />, name: "Python" },
              { icon: <Server />, name: "Express" },
              { icon: <Globe />, name: "React Native" },
              { icon: <Layers />, name: "Redux" },
              { icon: <Cpu />, name: "Tailwind CSS" },
              { icon: <Smartphone />, name: "WebSocket" },
            ].map((tech, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-8 py-3 rounded-full bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10 transition-colors mx-4 whitespace-nowrap"
              >
                <span className="text-blue-400">{tech.icon}</span>
                <span className="font-semibold text-lg">{tech.name}</span>
              </div>
            ))}
          </Marquee>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 relative overflow-hidden">
        <AnimatedGrid opacity={0.03} />
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <FadeIn>
            <h2 className="text-4xl font-bold mb-8">{t.contact.title}</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-xl text-slate-300 mb-12">{t.contact.description}</p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <MagneticButton
                onClick={() => window.location.href = "mailto:mahdi.benrhouma@sesame.com.tn"}
                variant="primary"
                className="flex items-center justify-center gap-2"
              >
                <Mail size={20} /> {t.contact.sendEmail}
              </MagneticButton>
              <MagneticButton
                onClick={() => window.open("https://github.com/mahdibrr", "_blank")}
                variant="secondary"
                className="flex items-center justify-center gap-2"
              >
                <Github size={20} /> {t.contact.githubProfile}
              </MagneticButton>
              <MagneticButton
                onClick={() => window.open("https://www.linkedin.com/in/mahdi-ben-rhouma-180971357/", "_blank")}
                variant="secondary"
                className="flex items-center justify-center gap-2"
              >
                <Linkedin size={20} /> {t.contact.linkedinProfile}
              </MagneticButton>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 py-8 px-4 text-center text-slate-400">
        <p>{t.footer}</p>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
