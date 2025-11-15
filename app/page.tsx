"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"
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

// Lazy load heavy animation and below-fold components
const FloatingParticles = dynamic(() => import("@/components/FloatingParticles").then(mod => ({ default: mod.FloatingParticles })), { ssr: false })
const CursorTrail = dynamic(() => import("@/components/CursorTrail").then(mod => ({ default: mod.CursorTrail })), { ssr: false })
const MorphingBlob = dynamic(() => import("@/components/MorphingBlob").then(mod => ({ default: mod.MorphingBlob })), { ssr: false })
const ProjectCarousel = dynamic(() => import("@/components/ProjectCarousel").then(mod => ({ default: mod.ProjectCarousel })), { ssr: false })

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
        "Licence en Informatique Multimedia spécialisée en Web (LIM3) à l'Université Sesame. Axé sur les technologies web modernes et le développement full-stack.",
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
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white relative">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 relative ${
          isScrolled ? "bg-slate-900/95 backdrop-blur-sm shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              MB
            </div>
            <div className="hidden sm:flex items-center gap-1 text-xs font-semibold">
              <span className="text-cyan-400">•</span>
              <span className="text-slate-300">Sesame LIM3</span>
            </div>
          </div>

          {/* Language Switcher and Mobile menu button */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLanguage(language === "en" ? "fr" : "en")}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-cyan-400/50 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all duration-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900"
              title={language === "en" ? "Switch to French" : "Switch to English"}
              aria-label="Toggle language"
            >
              <Globe size={16} />
              {language.toUpperCase()}
            </button>

            <button
              className="md:hidden focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-lg p-1"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex gap-8">
            {Object.entries(t.nav).map(([key, value]) => (
              <div key={key} className="relative">
                <button
                  onClick={() => scrollToSection(key)}
                  className="capitalize hover:text-cyan-400 transition-colors duration-300 py-2 relative z-10"
                >
                  {value}
                </button>
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{ transformOrigin: "left" }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900 border-t border-slate-700 py-4 px-4">
            {Object.entries(t.nav).map(([key, value]) => (
              <button
                key={key}
                onClick={() => scrollToSection(key)}
                className="block w-full text-left py-2 capitalize hover:text-cyan-400 transition-colors"
              >
                {value}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-20 sm:pt-24 md:pt-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="hidden md:block">
          <MorphingBlob />
        </div>
        <div className="w-full max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Left side - Text */}
            <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-cyan-400/50 rounded-full text-xs sm:text-sm">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                <span className="font-semibold text-cyan-300">SESAME University • LIM3</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                {t.hero.title}
                <br />
                <AnimatedGradientText>
                  {t.hero.titleHighlight}
                </AnimatedGradientText>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">{t.hero.description}</p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 justify-center lg:justify-start">
                <MagneticButton
                  onClick={() => scrollToSection("projects")}
                  variant="primary"
                >
                  {t.hero.viewWork}
                </MagneticButton>
                <MagneticButton
                  onClick={() => scrollToSection("contact")}
                  variant="secondary"
                >
                  {t.hero.getInTouch}
                </MagneticButton>
              </div>

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
                  <span className="text-xs sm:text-sm font-medium">5+ Projects Delivered</span>
                </div>
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
      <section id="about" className="py-20 px-4 bg-slate-800/50 backdrop-blur-sm border-t border-slate-700">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl font-bold mb-12 text-center">{t.about.title}</h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-8">
            <FadeIn delay={0.1}>
              <GlassmorphicCard className="p-8 group" glowColor="from-cyan-400 to-blue-400">
                <div className="text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                  <Code2 size={40} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t.about.education}</h3>
                <p className="text-slate-300">{t.about.educationDesc}</p>
              </GlassmorphicCard>
            </FadeIn>

            <FadeIn delay={0.2}>
              <GlassmorphicCard className="p-8 group" glowColor="from-blue-400 to-purple-400">
                <div className="text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                  <Briefcase size={40} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t.about.currentProject}</h3>
                <p className="text-slate-300">{t.about.currentProjectDesc}</p>
              </GlassmorphicCard>
            </FadeIn>

            <FadeIn delay={0.3}>
              <GlassmorphicCard className="p-8 group" glowColor="from-purple-400 to-cyan-400">
                <div className="text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                  <Server size={40} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t.about.experience}</h3>
                <p className="text-slate-300">{t.about.experienceDesc}</p>
              </GlassmorphicCard>
            </FadeIn>
          </div>
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

          <div className="space-y-8">
            {/* Featured Project 1 - Travail en Hauteur */}
            <FadeIn delay={0.1}>
              <div className="group relative bg-gradient-to-br from-slate-700/30 via-slate-800/30 to-slate-900/30 border-2 border-slate-600/50 rounded-3xl overflow-hidden hover:border-blue-400/70 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/30 backdrop-blur-xl">
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative p-8 md:p-10">
                <div className="space-y-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/50 group-hover:scale-110 transition-transform duration-300">
                        <Globe size={32} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-4xl font-bold group-hover:text-blue-400 transition-colors">{t.projects.travail}</h3>
                        <p className="text-sm text-blue-400 font-semibold flex items-center gap-2 mt-1">
                          <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                          Production • Live
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-lg text-slate-300 leading-relaxed">{t.projects.travailDesc}</p>

                  <div className="flex flex-wrap gap-2">
                    {["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL", "Node.js"].map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/40 rounded-lg text-sm font-semibold text-blue-300 hover:bg-blue-500/30 hover:border-blue-400 transition-all duration-200 hover:scale-105"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <a
                    href="https://www.travailenhauteur.tn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 group/link"
                  >
                    {t.projects.visitProject}
                    <ExternalLink size={20} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
            </FadeIn>

            {/* Featured Project 2 - FastAPI Dispatching */}
            <FadeIn delay={0.2}>
              <div className="group relative bg-gradient-to-br from-slate-700/30 via-slate-800/30 to-slate-900/30 border-2 border-slate-600/50 rounded-3xl overflow-hidden hover:border-emerald-400/70 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/30 backdrop-blur-xl">
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative p-8 md:p-10">
                <div className="space-y-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/50 group-hover:scale-110 transition-transform duration-300">
                        <Server size={32} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-4xl font-bold group-hover:text-emerald-400 transition-colors">{t.projects.fastapi}</h3>
                        <p className="text-sm text-emerald-400 font-semibold flex items-center gap-2 mt-1">
                          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                          In Development
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-lg text-slate-300 leading-relaxed">{t.projects.fastapiDesc}</p>

                  <div className="flex flex-wrap gap-2">
                    {["FastAPI", "Python", "WebSocket", "React", "PostgreSQL", "Redis"].map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-400/40 rounded-lg text-sm font-semibold text-emerald-300 hover:bg-emerald-500/30 hover:border-emerald-400 transition-all duration-200 hover:scale-105"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Project Screenshots Carousel */}
                  <div className="mt-8">
                    <ProjectCarousel
                      images={[
                        "/projects/dispatching/Screenshot 2025-09-17 194544.jpg",
                        "/projects/dispatching/Screenshot 2025-09-17 194552.jpg",
                        "/projects/dispatching/Screenshot 2025-09-17 194700.jpg",
                        "/projects/dispatching/Screenshot 2025-09-17 194709.jpg",
                        "/projects/dispatching/Screenshot 2025-09-17 195117.jpg",
                      ]}
                      projectName="FastAPI Dispatching App"
                    />
                  </div>
                </div>
              </div>
            </div>
            </FadeIn>

            {/* Featured Project 3 - Ghassla */}
            <FadeIn delay={0.3}>
              <div className="group relative bg-gradient-to-br from-slate-700/30 via-slate-800/30 to-slate-900/30 border-2 border-slate-600/50 rounded-3xl overflow-hidden hover:border-purple-400/70 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/30 backdrop-blur-xl">
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative p-8 md:p-10">
                <div className="space-y-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/50 group-hover:scale-110 transition-transform duration-300">
                        <Globe size={32} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-4xl font-bold group-hover:text-purple-400 transition-colors">{t.projects.ghassla}</h3>
                        <p className="text-sm text-purple-400 font-semibold flex items-center gap-2 mt-1">
                          <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
                          Featured Project
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-lg text-slate-300 leading-relaxed">{t.projects.ghasslaDesc}</p>

                  <div className="flex flex-wrap gap-2">
                    {["React", "Node.js", "MongoDB", "Express", "Tailwind CSS", "REST API"].map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/40 rounded-lg text-sm font-semibold text-purple-300 hover:bg-purple-500/30 hover:border-purple-400 transition-all duration-200 hover:scale-105"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Project Screenshots Carousel */}
                  <div className="mt-8">
                    <ProjectCarousel
                      images={[
                        "/ghassla/processed/ghassla_20.jpg", // Sign Up
                        "/ghassla/processed/ghassla_19.jpg", // Sign In
                        "/ghassla/processed/ghassla_18.jpg", // Dashboard
                        "/ghassla/processed/ghassla_17.jpg", // Profile
                        "/ghassla/processed/ghassla_16.jpg", // Settings
                        "/ghassla/processed/ghassla_11.jpg", // Homepage
                        "/ghassla/processed/ghassla_12.jpg", // Services
                        "/ghassla/processed/ghassla_13.jpg", // About
                        "/ghassla/processed/ghassla_14.jpg", // Features
                        "/ghassla/processed/ghassla_15.jpg", // More Details
                      ]}
                      projectName="Ghassla Laundry Service"
                    />
                  </div>

                  {/* Live Demo Video */}
                  <div className="mt-8">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-2xl font-bold text-purple-300">
                        {language === "en" ? "Live Demo" : "Démo en Direct"}
                      </h4>
                      <motion.div
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/50 rounded-full"
                        animate={{
                          scale: [1, 1.05, 1],
                          opacity: [0.8, 1, 0.8],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                        </span>
                        <span className="text-sm font-semibold text-purple-300">
                          {language === "en" ? "Watch Demo" : "Voir la Démo"}
                        </span>
                      </motion.div>
                    </div>
                    <div className="relative rounded-xl overflow-hidden border-2 border-purple-400/50 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-shadow duration-300">
                      <video
                        controls
                        className="w-full h-auto"
                        poster="/ghassla/processed/ghassla_11.jpg"
                      >
                        <source src="/ghassla/Vidéo sans titre ‐ Réalisée avec Clipchamp.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
      <section id="skills" className="py-20 px-4 bg-slate-800/50 backdrop-blur-sm border-t border-slate-700 relative overflow-hidden">
        <AnimatedGrid opacity={0.03} />
        <div className="max-w-6xl mx-auto relative z-10">
          <FadeIn>
            <h2 className="text-4xl font-bold mb-12 text-center">{t.skills.title}</h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { category: t.skills.frontend, skills: ["React", "Next.js", "Tailwind CSS", "TypeScript", "JavaScript"], color: "from-cyan-400 to-blue-400" },
              { category: t.skills.backend, skills: ["FastAPI", "Spring Boot", "Python", "Java", "Node.js", "Express"], color: "from-emerald-400 to-cyan-400" },
              { category: "Architecture", skills: ["REST APIs", "WebSocket", "Microservices", "MVC"], color: "from-purple-400 to-blue-400" },
              { category: t.skills.tools, skills: ["Git", "PostgreSQL", "MongoDB", "Docker", "Redis"], color: "from-orange-400 to-cyan-400" },
            ].map((skillGroup, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <GlassmorphicCard className="p-6 group" glowColor={skillGroup.color}>
                  <h3 className="text-lg font-semibold mb-4 text-cyan-400 group-hover:text-cyan-300 transition-colors">
                    {skillGroup.category}
                  </h3>
                  <ul className="space-y-2">
                    {skillGroup.skills.map((skill, i) => (
                      <li key={i} className="text-slate-300 flex items-center gap-2">
                        <motion.span
                          className="w-2 h-2 bg-cyan-400 rounded-full"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ delay: i * 0.1, repeat: Infinity, duration: 2 }}
                        />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </GlassmorphicCard>
              </FadeIn>
            ))}
          </div>
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
