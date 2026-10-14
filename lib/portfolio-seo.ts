import type { Metadata } from "next";
import { identity, routeFor, type Locale, type Project } from "./portfolio";

export const baseMetadata: Metadata = {
  metadataBase: new URL(identity.url),
  title: {
    default: "Mahdi Ben Rhouma — Full-Stack Developer",
    template: "%s | Mahdi Ben Rhouma",
  },
  authors: [{ name: identity.name, url: identity.url }],
  creator: identity.name,
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION }
      : {}),
    ...(process.env.NEXT_PUBLIC_BING_VERIFICATION
      ? {
          other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION },
        }
      : {}),
  },
  formatDetection: { telephone: false },
};

export function imageFor(route: string, locale: Locale) {
  const key =
    route === "/"
      ? "home"
      : route.replace(/^\/+|\/+$/g, "").replace("work/", "");
  return `/social/${locale}/${key}.png`;
}

export function metadataFor(
  locale: Locale,
  route: string,
  title: string,
  description: string,
): Metadata {
  const canonical = routeFor(locale, route);
  const image = {
    url: imageFor(route, locale),
    width: 1200,
    height: 630,
    alt: title,
  };
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical,
      languages: {
        en: routeFor("en", route),
        fr: routeFor("fr", route),
        "x-default": routeFor("en", route),
      },
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: canonical,
      siteName: identity.name,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: [locale === "fr" ? "en_US" : "fr_FR"],
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}

export function homeMetadata(locale: Locale) {
  return metadataFor(
    locale,
    "/",
    locale === "fr"
      ? "Mahdi Ben Rhouma — Développeur full-stack en Tunisie"
      : "Mahdi Ben Rhouma — Full-Stack Developer in Tunisia",
    locale === "fr"
      ? "Découvrez mes projets web, sites multilingues et interfaces en Next.js, React et TypeScript. Développeur basé en Tunisie, ouvert aux projets et opportunités."
      : "Explore my web projects, multilingual websites and interfaces built with Next.js, React and TypeScript. Based in Tunisia and open to projects and opportunities.",
  );
}

export function projectMetadata(project: Project, locale: Locale) {
  return metadataFor(
    locale,
    `/work/${project.slug}/`,
    `${project.name} — ${project.type[locale]} | ${identity.name}`,
    project.description[locale],
  );
}

const person = {
  "@type": "Person",
  "@id": `${identity.url}/#person`,
  name: identity.name,
  url: identity.url,
  image: `${identity.url}/images/profile.jpg`,
  jobTitle: "Full-Stack Developer",
  sameAs: [
    identity.github,
    identity.linkedin,
    "https://www.iloveblogs.blog/author/mahdi-br",
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Python",
    "FastAPI",
    "Spring Boot",
    "Web development",
  ],
};

export function pageSchema(
  locale: Locale,
  route: string,
  name: string,
  description: string,
  profile = false,
  project?: Project,
) {
  const url = identity.url + routeFor(locale, route);
  const graph: Record<string, unknown>[] = [
    person,
    {
      "@type": "WebSite",
      "@id": `${identity.url}/#website`,
      url: identity.url,
      name: identity.name,
      inLanguage: ["en", "fr"],
      author: { "@id": `${identity.url}/#person` },
    },
    {
      "@type": profile ? "ProfilePage" : "WebPage",
      "@id": `${url}#page`,
      url,
      name,
      description,
      inLanguage: locale,
      isPartOf: { "@id": `${identity.url}/#website` },
      ...(profile
        ? { mainEntity: { "@id": `${identity.url}/#person` } }
        : project
          ? { mainEntity: { "@id": `${url}#project` } }
          : { about: { "@id": `${identity.url}/#person` } }),
    },
  ];
  if (route !== "/")
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: locale === "fr" ? "Accueil" : "Home",
          item: identity.url + routeFor(locale),
        },
        { "@type": "ListItem", position: 2, name, item: url },
      ],
    });
  if (project)
    graph.push({
      "@type": "CreativeWork",
      "@id": `${url}#project`,
      name: project.name,
      description: project.description[locale],
      url,
      image: identity.url + project.cover,
      inLanguage: locale,
      creator: { "@id": `${identity.url}/#person` },
    });
  return { "@context": "https://schema.org", "@graph": graph };
}
