import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mahdi Ben Rhouma - Full-Stack Developer Portfolio',
    short_name: 'Mahdi BR Portfolio',
    description: 'Full-stack developer portfolio showcasing web, mobile, and backend expertise. LIM3 student at Sesame University specializing in React, Next.js, FastAPI, Spring Boot.',
    start_url: '/',
    display: 'standalone',
    background_color: '#050505',
    theme_color: '#06b6d4',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    categories: ['portfolio', 'developer', 'technology'],
    lang: 'en',
  }
}
