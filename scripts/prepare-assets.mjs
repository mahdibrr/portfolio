import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
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
for (const locale of ["en", "fr"]) {
  for (const page of pages) {
    const [title, subtitle, label] = page[locale];
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
console.log("Prepared real project previews, icons and 14 social images.");
