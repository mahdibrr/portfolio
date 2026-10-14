import type { MetadataRoute } from "next";
import { identity, pageRoutes, routeFor, type Locale } from "@/lib/portfolio";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return (["en", "fr"] as Locale[]).flatMap((locale) =>
    pageRoutes.map((route) => ({
      url: identity.url + routeFor(locale, route),
      alternates: {
        languages: {
          en: identity.url + routeFor("en", route),
          fr: identity.url + routeFor("fr", route),
          "x-default": identity.url + routeFor("en", route),
        },
      },
    })),
  );
}
