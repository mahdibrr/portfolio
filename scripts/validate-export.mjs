import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import assert from "node:assert/strict";
import sharp from "sharp";

const root = path.resolve("out");
const origin = "https://mahdibr.online";
const routes = JSON.parse(await readFile("data/site-routes.json", "utf8"));
const allRoutes = routes.flatMap((route) => [
  route,
  "/fr" + (route === "/" ? "/" : route),
]);
const decode = (text) =>
  text
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x([a-f0-9]+);/gi, (_, n) =>
      String.fromCodePoint(parseInt(n, 16)),
    )
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));
const attrs = (tag) =>
  Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((match) => [
      match[1].toLowerCase(),
      decode(match[2]),
    ]),
  );
const elements = (html, name) =>
  [...html.matchAll(new RegExp("<" + name + "\\b[^>]*>", "g"))].map((match) =>
    attrs(match[0]),
  );
const htmlFor = (route) => path.join(root, route, "index.html");
const docs = new Map();
const navigation = new Map();
const titles = new Set(),
  descriptions = new Set();
for (const route of allRoutes) {
  const html = await readFile(htmlFor(route), "utf8");
  docs.set(route, html);
  const locale = route.startsWith("/fr/") ? "fr" : "en";
  assert.equal(
    elements(html, "html")[0]?.lang,
    locale,
    route + ": document language",
  );
  assert.equal(
    (html.match(/<h1(?:\s|>)/g) ?? []).length,
    1,
    route + ": one main heading",
  );
  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "");
  const metadata = elements(html, "meta");
  const description = metadata.find(
    (meta) => meta.name === "description",
  )?.content;
  assert(
    title.length > 15 && !titles.has(title),
    route + ": unique useful title",
  );
  assert(
    description?.length > 60 && !descriptions.has(description),
    route + ": unique description",
  );
  titles.add(title);
  descriptions.add(description);
  const links = elements(html, "link");
  assert.equal(
    links.find((link) => link.rel === "canonical")?.href,
    origin + route,
    route + ": canonical",
  );
  const base = locale === "fr" ? route.slice(3) : route;
  const alternates = links.filter(
    (link) => link.rel === "alternate" && link.hreflang,
  );
  assert.deepEqual(
    Object.fromEntries(alternates.map((link) => [link.hreflang, link.href])),
    {
      en: origin + base,
      fr: origin + "/fr" + base,
      "x-default": origin + base,
    },
    route + ": reciprocal language URLs",
  );
  const robots = metadata.find((meta) => meta.name === "robots")?.content;
  assert(
    robots?.includes("index") && !robots.includes("noindex"),
    route + ": indexable",
  );
  const image = metadata.find((meta) => meta.property === "og:image")?.content;
  assert(image?.startsWith(origin + "/social/"), route + ": real social image");
  const imageFile = path.join(root, new URL(image).pathname);
  const size = await sharp(imageFile).metadata();
  assert.equal(size.width, 1200);
  assert.equal(size.height, 630);
  const graphs = [
    ...html.matchAll(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
    ),
  ].map((match) => JSON.parse(match[1]));
  assert.equal(graphs.length, 1, route + ": structured data");
  assert.equal(graphs[0]["@context"], "https://schema.org");
  const graph = graphs[0]["@graph"];
  const page = graph.find((node) =>
    ["WebPage", "ProfilePage"].includes(node["@type"]),
  );
  assert.equal(page.url, origin + route);
  assert.equal(page.inLanguage, locale);
  const ids = new Set(graph.map((node) => node["@id"]).filter(Boolean));
  for (const node of graph) {
    const refs = JSON.stringify(node).matchAll(/"@id":"([^"]+)"/g);
    for (const ref of refs)
      assert(ids.has(ref[1]), route + ": dangling schema reference " + ref[1]);
  }
  if (/\/work\/[^/]+\/$/.test(route))
    assert(
      graph.some((node) => node["@type"] === "CreativeWork"),
      route + ": project schema",
    );
  if (["/", "/about/", "/fr/", "/fr/about/"].includes(route)) {
    assert.equal(page["@type"], "ProfilePage");
    assert.equal(page.mainEntity["@id"], origin + "/#person");
  }
  assert(
    !/your-google-verification-code|your-bing-verification-code|fully autonomous|6\+ production/i.test(
      html,
    ),
    route + ": no stale placeholders or claims",
  );
}
let checkedLinks = 0,
  checkedAssets = 0;
for (const [route, html] of docs) {
  const reachable = new Set();
  for (const anchor of elements(html, "a")) {
    if (!anchor.href || /^(mailto:|tel:)/.test(anchor.href)) continue;
    const url = new URL(anchor.href, origin + route);
    if (url.origin !== origin) continue;
    const target = url.pathname;
    if (docs.has(target)) reachable.add(target);
    assert(
      docs.has(target) ||
        (await stat(path.join(root, decodeURIComponent(target)))
          .then((info) => info.isFile())
          .catch(() => false)),
      route + ": broken link " + anchor.href,
    );
    if (url.hash && docs.has(target)) {
      const id = decodeURIComponent(url.hash.slice(1));
      assert(
        elements(docs.get(target), "[a-z][a-z0-9]*").some(
          (element) => element.id === id,
        ),
        route + ": missing anchor " + anchor.href,
      );
    }
    checkedLinks++;
  }
  navigation.set(route, reachable);
  for (const tag of [...elements(html, "img"), ...elements(html, "source")]) {
    if (!tag.src?.startsWith("/")) continue;
    assert(
      await stat(path.join(root, decodeURIComponent(tag.src)))
        .then((info) => info.isFile())
        .catch(() => false),
      route + ": missing media " + tag.src,
    );
    checkedAssets++;
  }
}
for (const languageRoot of ["/", "/fr/"]) {
  const distances = new Map([[languageRoot, 0]]);
  const queue = [languageRoot];
  while (queue.length) {
    const route = queue.shift();
    for (const target of navigation.get(route) || []) {
      if (!distances.has(target)) {
        distances.set(target, distances.get(route) + 1);
        queue.push(target);
      }
    }
  }
  for (const route of allRoutes.filter((route) =>
    languageRoot === "/fr/"
      ? route.startsWith("/fr/")
      : !route.startsWith("/fr/"),
  )) {
    assert(
      distances.has(route) && distances.get(route) <= 3,
      "Page is more than three clicks from its language homepage: " + route,
    );
  }
}
const snapshot = JSON.parse(
  await readFile(path.join(root, "data/ecosystem-snapshot.json"), "utf8"),
);
assert.equal(snapshot.search.property, "https://www.iloveblogs.blog/");
assert.equal(snapshot.search.dataState, "final");
assert.equal(
  snapshot.search.daily.reduce((total, day) => total + day.clicks, 0),
  snapshot.search.clicks,
  "Search total matches the reported daily values",
);
assert(
  snapshot.github.repositories.every((repo) => !repo.isArchived) &&
    snapshot.github.repositories.length <=
      snapshot.github.profile.publicRepositories,
  "Repository directory lists active public repositories only",
);
assert(
  !/access_token|refresh_token|private_key|client_secret|CLOUDFLARE_API_TOKEN/i.test(
    JSON.stringify(snapshot),
  ),
  "Public snapshot contains no credential fields",
);
const sitemap = await readFile(path.join(root, "sitemap.xml"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((match) => decode(match[1]))
  .sort();
assert.deepEqual(
  sitemapUrls,
  allRoutes.map((route) => origin + route).sort(),
  "Sitemap contains exactly the published pages",
);
const robots = await readFile(path.join(root, "robots.txt"), "utf8");
assert(
  robots.includes("Sitemap: " + origin + "/sitemap.xml"),
  "Robots sitemap",
);
const notFound = await readFile(path.join(root, "404.html"), "utf8");
assert(
  elements(notFound, "meta").some(
    (meta) => meta.name === "robots" && meta.content.includes("noindex"),
  ),
  "404 is noindex",
);
const manifest = JSON.parse(
  await readFile(path.join(root, "manifest.webmanifest"), "utf8"),
);
for (const icon of manifest.icons)
  assert(
    await stat(path.join(root, icon.src)).then((info) => info.isFile()),
    "Real manifest icon",
  );
async function checkSizes(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) await checkSizes(file);
    else
      assert(
        (await stat(file)).size <= 25 * 1024 * 1024,
        "Cloudflare 25 MiB file limit: " + file,
      );
  }
}
await checkSizes(root);
console.log(
  "Validated " +
    allRoutes.length +
    " pages: titles, descriptions, language, canonical/hreflang, JSON-LD, social images, sitemap, 404, navigation depth, public stats and manifest.",
);
console.log(
  "Verified " +
    checkedLinks +
    " internal links/anchors and " +
    checkedAssets +
    " media references; all files fit Cloudflare Pages.",
);
