import sharp from "sharp";
import { mkdir, writeFile, readFile, copyFile } from "node:fs/promises";
import path from "node:path";

const publicDir = path.resolve("public");
const xml = (text) =>
  text.replace(
    /[<>&"']/g,
    (char) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
      })[char],
  );
const out = (relative) => path.join(publicDir, relative);
const snapshot = JSON.parse(
  await readFile("data/ecosystem-snapshot.json", "utf8"),
);
await mkdir(out("data"), { recursive: true });
await copyFile(
  "data/ecosystem-snapshot.json",
  out("data/ecosystem-snapshot.json"),
);
await mkdir(out("social/en"), { recursive: true });
await mkdir(out("social/fr"), { recursive: true });

for (const name of ["iloveblogs", "travail-en-hauteur"]) {
  await sharp(out("images/work/" + name + ".png"))
    .webp({ quality: 85 })
    .toFile(out("images/work/" + name + ".webp"));
}
for (const number of [11, 12, 13]) {
  await sharp(out("ghassla/processed/ghassla_" + number + ".jpg"))
    .resize({ width: 1440, withoutEnlargement: true })
    .webp({ quality: 84 })
    .toFile(out("ghassla/processed/ghassla_" + number + ".webp"));
}
const icon =
  '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect width="512" height="512" rx="105" fill="#274d3d"/><text x="256" y="339" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="350" fill="#f7f6ef">m.</text></svg>';
await writeFile(out("icon.svg"), icon);
for (const [name, size] of [
  ["icon-192.png", 192],
  ["icon-512.png", 512],
  ["apple-icon.png", 180],
]) {
  await sharp(Buffer.from(icon)).resize(size, size).png().toFile(out(name));
}
const pages = [
  {
    key: "home",
    en: ["Mahdi", "Ben Rhouma.", "Full-stack developer / Tunisia"],
    fr: ["Mahdi", "Ben Rhouma.", "Développeur full-stack / Tunisie"],
    image: "images/profile.jpg",
    portrait: true,
  },
  {
    key: "about",
    en: [
      "Behind the code,",
      "there’s Mahdi.",
      "Background, approach & toolkit",
    ],
    fr: ["Derrière le code,", "il y a Mahdi.", "Parcours, approche & outils"],
    image: "images/profile.jpg",
    portrait: true,
  },
  {
    key: "services",
    en: [
      "Useful websites.",
      "Thoughtful products.",
      "Web development / Backend / Technical SEO",
    ],
    fr: [
      "Des sites utiles.",
      "Des produits soignés.",
      "Développement web / Backend / SEO technique",
    ],
    image: "images/profile.jpg",
    portrait: true,
  },
  {
    key: "ghassla",
    en: [
      "Ghassla",
      "The booking experience.",
      "Next.js laundry booking interface prototype",
    ],
    fr: [
      "Ghassla",
      "Le parcours de réservation.",
      "Prototype d’interface de pressing en Next.js",
    ],
    image: "ghassla/processed/ghassla_12.webp",
  },
  {
    key: "iloveblogs",
    en: [
      "iloveblogs.blog",
      "From error to answer.",
      "Developer publication & debugging tools",
    ],
    fr: [
      "iloveblogs.blog",
      "De l’erreur à la solution.",
      "Publication & outils pour développeurs",
    ],
    image: "images/work/iloveblogs.webp",
  },
  {
    key: "travail-en-hauteur",
    en: [
      "Travail en Hauteur",
      "A clearer company website.",
      "Multilingual service website / Next.js",
    ],
    fr: [
      "Travail en Hauteur",
      "Un site d’entreprise clair.",
      "Site de services multilingue / Next.js",
    ],
    image: "images/work/travail-en-hauteur.webp",
  },
  {
    key: "dispatching",
    en: [
      "Dispatching",
      "An interface in progress.",
      "Operations interface / FastAPI & React",
    ],
    fr: [
      "Dispatching",
      "Une interface en cours.",
      "Interface opérationnelle / FastAPI & React",
    ],
    image: "projects/dispatching/Screenshot 2025-09-17 194544.webp",
  },
];
const extraPages = [
  {
    key: "work",
    en: [
      "Selected projects.",
      "The details behind them.",
      "Websites / interfaces / developer tools",
    ],
    fr: [
      "Projets sélectionnés.",
      "Le travail derrière.",
      "Sites / interfaces / outils pour développeurs",
    ],
    lines: [
      "PROJECTS",
      "Ghassla / booking interface",
      "iloveblogs.blog / publication",
      "Travail en Hauteur / website",
    ],
  },
  {
    key: "open-source",
    en: [
      "Code you can inspect.",
      "Ideas you can reuse.",
      "Public repositories / GitHub",
    ],
    fr: [
      "Du code à consulter.",
      "Des idées à réutiliser.",
      "Dépôts publics / GitHub",
    ],
    lines: [
      "PUBLIC SOURCE",
      "dev-error-explainers",
      "production-incidents",
      "MDX content toolkit",
    ],
  },
  {
    key: "open-source/dev-error-explainers",
    en: [
      "dev-error-explainers",
      "From input to explanation.",
      "JavaScript / CLI / Action / MCP",
    ],
    fr: [
      "dev-error-explainers",
      "De l’erreur à l’explication.",
      "JavaScript / CLI / Action / MCP",
    ],
    lines: [
      "ACTUAL FIXTURE",
      "window is not defined",
      "next-build.window-undefined",
      "input / expected result / source",
    ],
  },
  {
    key: "open-source/nextjs-supabase-production-incidents",
    en: [
      "Production Incidents",
      "From symptom to a fix.",
      "Next.js / Supabase / PostgreSQL",
    ],
    fr: [
      "Production Incidents",
      "Du symptôme au correctif.",
      "Next.js / Supabase / PostgreSQL",
    ],
    lines: [
      "RUNNABLE EXAMPLES",
      "RLS / PostgreSQL / pgTAP",
      "webhooks / idempotency",
      "Next.js / caching / params",
    ],
  },
  {
    key: "open-source/nextjs-seo-content-engine",
    en: [
      "MDX Content Toolkit",
      "A published snapshot.",
      "Taxonomy / scoring / Search Console",
    ],
    fr: [
      "MDX Content Toolkit",
      "Un instantané publié.",
      "Taxonomie / scoring / Search Console",
    ],
    lines: [
      "HISTORICAL TOOLKIT",
      "content / taxonomy / score",
      "link suggestions / review",
      "published June 2026",
    ],
  },
  {
    key: "writing",
    en: [
      "Notes from the work.",
      "Published on iloveblogs.",
      "Troubleshooting articles / guides",
    ],
    fr: [
      "Notes de développement.",
      "Publiées sur iloveblogs.",
      "Articles de dépannage / guides",
    ],
    lines: [
      "READ / TEST / INSPECT",
      "Next.js / builds / caching",
      "Supabase / RLS / webhooks",
      "Node.js / ESM / CommonJS",
    ],
  },
  {
    key: "tools",
    en: [
      "A useful starting point.",
      "For a stubborn error.",
      "Nine free browser tools",
    ],
    fr: [
      "Un point de départ.",
      "Pour une erreur tenace.",
      "Neuf outils gratuits",
    ],
    lines: [
      "BROWSER TOOLS",
      "build errors / CORS / ESM",
      "RLS / database URLs",
      "six public library modules",
    ],
  },
  {
    key: "resources",
    en: [
      "Useful references.",
      "Within reach.",
      "Official docs / public repositories",
    ],
    fr: [
      "Des références utiles.",
      "À portée de main.",
      "Documentation / dépôts publics",
    ],
    lines: [
      "A READING SHELF",
      "React / Next.js / FastAPI",
      "Supabase / Cloudflare",
      "MCP upstream / personal fork",
    ],
  },
  {
    key: "ecosystem",
    en: [
      "One developer.",
      "Several ways to explore.",
      "Projects / source code / writing / tools",
    ],
    fr: [
      "Un développeur.",
      "Plusieurs chemins à suivre.",
      "Projets / code / articles / outils",
    ],
    lines: [
      "FOLLOW THE CONNECTIONS",
      "mahdibr.online / projects",
      "GitHub / public source",
      "iloveblogs / writing / tools",
    ],
  },
  {
    key: "stats/iloveblogs",
    en: [
      "iloveblogs, in numbers.",
      "With the source attached.",
      "Dated public snapshot",
    ],
    fr: [
      "iloveblogs, en chiffres.",
      "Avec les sources.",
      "Instantané public daté",
    ],
    lines: [
      "GOOGLE SEARCH CLICKS",
      String(snapshot.search.clicks) + " / " + snapshot.search.startDate,
      "through " + snapshot.search.endDate,
      String(
        snapshot.publication.posts +
          snapshot.publication.guides +
          snapshot.publication.fixes,
      ) + " editorial pages / 9 tools",
    ],
  },
];
for (const page of extraPages) {
  const visual =
    '<svg xmlns="http://www.w3.org/2000/svg" width="720" height="520"><rect width="720" height="520" rx="8" fill="#e8ece0"/><path d="M40 118H680M40 410H680" stroke="#bfcbb3"/>' +
    page.lines
      .map(
        (line, index) =>
          '<text x="40" y="' +
          (index === 0 ? 78 : 174 + (index - 1) * 78) +
          '" font-family="Consolas,monospace" font-size="' +
          (index === 0 ? 19 : 25) +
          '" fill="' +
          (index === 0 ? "#636c61" : "#274d3d") +
          '">' +
          xml(line) +
          "</text>",
      )
      .join("") +
    '<text x="40" y="466" font-family="Arial,sans-serif" font-size="20" fill="#636c61">mahdibr.online / ' +
    xml(page.key.split("/")[0]) +
    "</text></svg>";
  const image = "social/visual-" + page.key.replaceAll("/", "-") + ".png";
  await sharp(Buffer.from(visual)).png().toFile(out(image));
  pages.push({ ...page, image });
}
for (const locale of ["en", "fr"]) {
  for (const page of pages) {
    const [title, subtitle, label] = page[locale];
    await mkdir(
      path.dirname(out("social/" + locale + "/" + page.key + ".png")),
      { recursive: true },
    );
    const fontSize = title.length > 17 ? 52 : title.length > 11 ? 67 : 87;
    const svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#f7f6ef"/><path d="M60 108H1140M60 544H1140" stroke="#d9ddd1"/><text x="60" y="72" font-family="Arial,sans-serif" font-weight="700" font-size="23" fill="#274d3d">m. / mahdi ben rhouma</text><text x="60" y="196" font-family="Arial,sans-serif" font-size="18" fill="#636c61">' +
      xml(label) +
      '</text><text x="60" y="305" font-family="Arial,sans-serif" font-size="' +
      fontSize +
      '" font-weight="700" letter-spacing="-3" fill="#202921">' +
      xml(title) +
      '</text><text x="60" y="379" font-family="Georgia,serif" font-style="italic" font-size="' +
      (subtitle.length > 23 ? 39 : 46) +
      '" fill="#274d3d">' +
      xml(subtitle) +
      '</text><text x="60" y="591" font-family="Arial,sans-serif" font-size="19" fill="#636c61">mahdibr.online</text><text x="1140" y="591" text-anchor="end" font-family="Arial,sans-serif" font-size="15" fill="#636c61">' +
      (locale === "fr"
        ? "PROJETS / SERVICES / À PROPOS"
        : "WORK / SERVICES / ABOUT") +
      "</text></svg>";
    const dimensions = page.portrait ? [284, 355] : [360, 260];
    const [width, height] = dimensions;
    const screenshot = await sharp(out(page.image))
      .resize(width, height, {
        fit: page.portrait ? "cover" : "contain",
        background: "#fff",
      })
      .png()
      .toBuffer();
    await sharp(Buffer.from(svg))
      .composite([
        {
          input: screenshot,
          left: page.portrait ? 838 : 780,
          top: page.portrait ? 148 : 207,
        },
      ])
      .png()
      .toFile(out("social/" + locale + "/" + page.key + ".png"));
  }
}
console.log(
  "Prepared project previews, public data, icons and " +
    pages.length * 2 +
    " social images.",
);
