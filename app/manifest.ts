import type { MetadataRoute } from "next";
export const dynamic = "force-static";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mahdi Ben Rhouma — Full-Stack Developer",
    short_name: "Mahdi Ben Rhouma",
    description:
      "Web development, selected projects and services by Mahdi Ben Rhouma, based in Tunisia.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f7f6ef",
    theme_color: "#274d3d",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
    categories: ["portfolio", "business"],
    lang: "en",
    dir: "ltr",
  };
}
