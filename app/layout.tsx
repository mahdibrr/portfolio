import type React from "react"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { WebVitalsReporter } from "@/components/WebVitalsReporter"
import "./globals.css"

import { Geist, Geist_Mono } from 'next/font/google'

// Initialize fonts with optimized configuration
// Only load weights actually used in the application
const geist = Geist({
  subsets: ['latin'],
  weight: ["400", "600", "700"], // Removed 500 - not commonly used
  display: 'swap',
  variable: '--font-geist',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: ["400", "600"], // Reduced weights for mono font
  display: 'swap',
  variable: '--font-geist-mono',
  preload: false, // Don't preload mono font - less critical
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'monospace'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://mahdibr.online'),
  alternates: {
    canonical: '/',
  },
  title: {
    default: "Mahdi Ben Rhouma - Full-Stack Developer Portfolio | Sesame University",
    template: "%s | Mahdi Ben Rhouma",
  },
  description:
    "Full-stack developer portfolio showcasing web, mobile, and backend expertise. LIM3 student at Sesame University specializing in React, Next.js, FastAPI, Spring Boot, and modern web development.",
  keywords: [
    // Personal & Role
    "Mahdi Ben Rhouma",
    "Full-Stack Developer",
    "Web Developer",
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "UI/UX Developer",

    // Technologies - Frontend
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "JavaScript Developer",
    "Framer Motion",
    "Radix UI",
    "TailwindCSS",
    "Tailwind CSS v4",
    "Bootstrap",
    "Material-UI",
    "Responsive Design",
    "Mobile-First Design",
    "Modern UI/UX",

    // Technologies - Backend
    "FastAPI Developer",
    "Spring Boot Developer",
    "Node.js Developer",
    "Python Developer",
    "Java Developer",
    "Express.js",
    "NestJS",
    "Django",
    "Flask",
    "API Development",
    "REST API",
    "GraphQL",
    "WebSockets",
    "Real-time Applications",
    "WebSocket Real-time",
    "FastAPI Python",
    "Microservices",

    // Database & Infrastructure
    "Database Design",
    "Database Optimization",
    "PostgreSQL",
    "MongoDB",
    "MySQL",
    "Redis Cache",
    "Docker",
    "Kubernetes",
    "CI/CD",
    "Scalable Architecture",
    "Performance Optimization",

    // Mobile Development
    "Mobile Development",
    "React Native",
    "Flutter",
    "Cross-platform Development",
    "Mobile Responsive Design",

    // Project-Specific Keywords
    "Travail en Hauteur",
    "Work Management System",
    "Safety Documentation Platform",
    "Dispatching Application",
    "Real-time Dispatching",
    "Laundry Service Platform",
    "Ghassla",
    "Service Platform Development",
    "Enterprise Web Solutions",

    // Education & Location
    "Sesame University",
    "LIM3",
    "Sesame LIM3",
    "Multimedia Informatics",
    "License Informatique Multimedia",
    "Computer Science Student",
    "Engineering Student",
    "Tunisia Developer",
    "Tunisian Software Engineer",
    "Tunisia Web Developer",
    "Tunis Developer",
    "North Africa Tech",
    "MENA Developer",
    "Maghreb Developer",
    "French-speaking Developer",
    "Bilingual Developer",

    // Professional Services
    "Portfolio",
    "Tech Portfolio",
    "Software Development Portfolio",
    "Freelance Developer",
    "Remote Developer",
    "Hire Developer",

    // Development Practices
    "Git",
    "GitHub",
    "Agile Development",
    "Scrum",
    "Testing",
    "Jest",
    "Cypress",
    "Code Review",
    "Technical Documentation",
    "Problem Solving",
    "Algorithm Design",
    "Data Structures",
    "Design Patterns",
    "Clean Code",
    "SOLID Principles",
    "Security Best Practices",

    // Web Technologies & Concepts
    "Web Development",
    "Progressive Web Apps",
    "PWA",
    "Single Page Applications",
    "SPA",
    "Server-Side Rendering",
    "SSR",
    "Static Site Generation",
    "SSG",
    "SEO Optimization",
    "Web Performance",
    "Accessibility",
    "WCAG",

    // State Management & Tools
    "Redux",
    "Context API",
    "Zustand",
    "Hibernate",
    "JPA",

    // Cloud & Deployment
    "Cloud Computing",
    "AWS",
    "Azure",
    "Google Cloud",
    "Vercel",
    "Netlify",

    // Authentication & Security
    "Authentication",
    "JWT",
    "OAuth",

    // Additional
    "Coding Projects",
    "Open Source Contributor",
    "Embla Carousel",
  ],
  authors: [{ name: "Mahdi Ben Rhouma", url: "https://mahdibr.online" }],
  creator: "Mahdi Ben Rhouma",
  publisher: "Mahdi Ben Rhouma",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["fr_FR"],
    url: "https://mahdibr.online",
    title: "Mahdi Ben Rhouma - Full-Stack Developer Portfolio",
    description:
      "Full-stack developer specializing in React, Next.js, FastAPI, and Spring Boot. Building modern web applications with cutting-edge technologies.",
    siteName: "Mahdi Ben Rhouma Portfolio",
    images: [
      {
        url: "/og-image.png", // You'll need to create this
        width: 1200,
        height: 630,
        alt: "Mahdi Ben Rhouma - Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahdi Ben Rhouma - Full-Stack Developer Portfolio",
    description:
      "Full-stack developer specializing in React, Next.js, FastAPI, and Spring Boot. Building modern web applications with cutting-edge technologies.",
    images: ["/og-image.png"], // You'll need to create this
    creator: "@mahdibrr", // Replace with your actual Twitter handle if you have one
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "your-google-verification-code",
    other: {
      'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION || "your-bing-verification-code",
    },
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "32x32",
        type: "image/x-icon",
      },
      {
        url: "/icon-light-32x32.png",
        sizes: "32x32",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        sizes: "32x32",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    shortcut: "/favicon.ico",
    apple: [
      {
        url: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com" />
        <link rel="dns-prefetch" href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Preload hero image for faster LCP - use imageSrcSet for responsive */}
        <link
          rel="preload"
          as="image"
          href="/images/profile.jpg"
          fetchPriority="high"
          type="image/jpeg"
        />
        {/* Geo-targeting meta tags for regional SEO - Requirements: 3.5, 3.6, 8.1 */}
        <meta name="geo.region" content="TN" />
        <meta name="geo.placename" content="Tunis, Tunisia" />
        <meta name="geo.position" content="36.8065;10.1815" />
        <meta name="ICBM" content="36.8065, 10.1815" />
        <meta name="geo.target" content="TN, FR, BE, CH, CA, AE, SA" />
      </head>
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`} suppressHydrationWarning>
        {children}
        <Analytics />
        <SpeedInsights />
        <WebVitalsReporter />
      </body>
    </html>
  )
}
