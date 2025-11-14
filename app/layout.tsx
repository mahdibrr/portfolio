import type React from "react"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

import { Geist, Geist_Mono, Source_Serif_4, Geist as V0_Font_Geist, Geist_Mono as V0_Font_Geist_Mono, Source_Serif_4 as V0_Font_Source_Serif_4 } from 'next/font/google'

// Initialize fonts
const _geist = V0_Font_Geist({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _geistMono = V0_Font_Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })

const _sourceSerif_4 = Source_Serif_4({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://mahdibr.online'),
  title: {
    default: "Mahdi Ben Rhouma - Full-Stack Developer Portfolio | Sesame University",
    template: "%s | Mahdi Ben Rhouma",
  },
  description:
    "Full-stack developer portfolio showcasing web, mobile, and backend expertise. LIM3 student at Sesame University specializing in React, Next.js, FastAPI, Spring Boot, and modern web development.",
  keywords: [
    "Mahdi Ben Rhouma",
    "Full-Stack Developer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "FastAPI Developer",
    "Spring Boot Developer",
    "Sesame University",
    "LIM3",
    "Tunisia Developer",
    "Portfolio",
    "Web Development",
    "Mobile Development",
    "Backend Development",
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
    google: "your-google-verification-code", // Replace with your actual verification code from Google Search Console
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
