import { createRequire } from "node:module";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const args = process.argv.slice(2);
const at = args.indexOf("--blog-root");
const blogRoot = path.resolve(at >= 0 ? args[at + 1] : "../iloveblogs");
const output = path.resolve("data/ecosystem-snapshot.json");
const checkedAt = new Date().toISOString();
const github = async (url) => {
  const response = await fetch("https://api.github.com" + url, {
    headers: {
      "User-Agent": "mahdibr-portfolio",
      Accept: "application/vnd.github+json",
    },
  });
  if (!response.ok) throw new Error("GitHub returned " + response.status);
  return response.json();
};
const [profile, repos] = await Promise.all([
  github("/users/mahdibrr"),
  github("/users/mahdibrr/repos?type=owner&per_page=100&sort=updated"),
]);
const repositories = repos
  .filter((repo) => !repo.private)
  .map((repo) => ({
    name: repo.name,
    fullName: repo.full_name,
    url: repo.html_url,
    description: repo.description || "",
    homepage: repo.homepage || "",
    language: repo.language,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    isFork: repo.fork,
    isArchived: repo.archived,
    updatedAt: repo.updated_at,
  }));
const getXml = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Sitemap returned " + response.status);
  return response.text();
};
const sitemapUrl = "https://www.iloveblogs.blog/sitemap-index.xml";
const sitemap = await getXml(sitemapUrl);
const maps = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (match) => match[1],
);
const documents = await Promise.all(maps.map(getXml));
const urls = [
  ...new Set(
    documents.flatMap((xml) =>
      [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]),
    ),
  ),
];
const count = (part) =>
  urls.filter((url) => new URL(url).pathname.startsWith(part)).length;
const publication = {
  checkedAt,
  sitemapUrl,
  indexablePages: urls.length,
  posts: count("/post/"),
  guides: count("/guides/"),
  fixes: count("/fix/"),
  tools: count("/tools/"),
};
const { TOOLS } = await import(
  pathToFileURL(path.join(blogRoot, "src/lib/tools-config.js"))
);
const tools = TOOLS.map((tool) => ({
  name: tool.name,
  url: "https://www.iloveblogs.blog" + tool.href,
  description: tool.short,
  topic: tool.tag,
  libraryModule: tool.libraryModule || null,
}));
const selections = [
  ["/post/nextjs-chunkloaderror-loading-chunk-failed-fix", "Next.js"],
  ["/post/fix-nextjs-missing-suspense-boundary-use-searchparams", "Next.js"],
  ["/post/test-supabase-rls-policies-before-you-ship", "Supabase"],
  ["/guides/supabase-rls-policy-not-working-debug-checklist", "Supabase"],
  ["/guides/nextjs-supabase-webhook-event-architecture", "Webhooks"],
  ["/post/stripe-webhook-signature-verification-failed-nextjs", "Webhooks"],
  ["/post/exports-is-not-defined-in-es-module-scope", "Node.js"],
  ["/fix/parsing-error-cannot-find-module-nextbabel", "Next.js"],
];
const decode = (text) =>
  text
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"');
const writing = await Promise.all(
  selections.map(async ([route, topic]) => {
    const url = "https://www.iloveblogs.blog" + route;
    if (!urls.includes(url))
      throw new Error("Reading selection is not in the live sitemap: " + url);
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(
        "Reading selection returned " + response.status + ": " + url,
      );
    const html = await response.text();
    const heading = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1];
    const title = decode(
      heading
        ? heading
            .replace(/<[^>]+>/g, " ")
            .replace(/\s+/g, " ")
            .trim()
        : html.match(/<title>([^<]*)<\/title>/)?.[1] || "",
    ).replace(/\s*\|\s*iloveblogs\.blog$/i, "");
    const description = decode(
      html.match(/<meta name="description" content="([^"]*)"/)?.[1] || "",
    );
    if (!title || !description)
      throw new Error("Missing article metadata: " + url);
    return {
      title,
      description,
      topic,
      url,
      kind: route.startsWith("/guides/")
        ? "Guide"
        : route.startsWith("/fix/")
          ? "Fix"
          : "Article",
    };
  }),
);
let search;
if (args.includes("--skip-gsc")) {
  search = JSON.parse(await readFile(output, "utf8")).search;
} else {
  const requireFromBlog = createRequire(path.join(blogRoot, "package.json"));
  requireFromBlog("dotenv").config({
    path: path.join(blogRoot, ".env.local"),
    quiet: true,
  });
  const { getGscConfig, refreshOAuthAccessToken } = await import(
    pathToFileURL(path.join(blogRoot, "src/lib/content-engine/gsc-sync.js"))
  );
  const { getAccessToken } = await import(
    pathToFileURL(path.join(blogRoot, "src/lib/content-engine/jwt-sign.js"))
  );
  const config = getGscConfig();
  if (!config.enabled)
    throw new Error(
      "Search Console credentials are unavailable. Use --skip-gsc to retain the previous dated snapshot.",
    );
  if (
    !["https://www.iloveblogs.blog/", "sc-domain:iloveblogs.blog"].includes(
      config.siteUrl,
    )
  )
    throw new Error("Expected the iloveblogs Search Console property");
  const token =
    config.mode === "oauth"
      ? await refreshOAuthAccessToken(config)
      : await getAccessToken({
          clientEmail: config.clientEmail,
          privateKey: config.privateKey,
          scope: "https://www.googleapis.com/auth/webmasters.readonly",
        });
  const endpoint =
    "https://www.googleapis.com/webmasters/v3/sites/" +
    encodeURIComponent(config.siteUrl) +
    "/searchAnalytics/query";
  const headers = {
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
    ...(config.quotaProject
      ? { "X-Goog-User-Project": config.quotaProject }
      : {}),
  };
  const query = async (body) => {
    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({
        ...body,
        type: "web",
        dataState: "final",
        rowLimit: 25000,
      }),
    });
    if (!response.ok)
      throw new Error("Search Console returned " + response.status);
    return response.json();
  };
  const provisionalEnd = new Date(Date.now() - 2 * 86400000)
    .toISOString()
    .slice(0, 10);
  const probe = await query({
    startDate: new Date(Date.parse(provisionalEnd) - 6 * 86400000)
      .toISOString()
      .slice(0, 10),
    endDate: provisionalEnd,
    dimensions: ["date"],
  });
  const endDate = (probe.rows || [])
    .map((row) => row.keys[0])
    .sort()
    .at(-1);
  if (!endDate) throw new Error("No final Search Console data was returned");
  const startDate = new Date(Date.parse(endDate) - 89 * 86400000)
    .toISOString()
    .slice(0, 10);
  const [aggregate, dates] = await Promise.all([
    query({ startDate, endDate, dimensions: [] }),
    query({ startDate, endDate, dimensions: ["date"] }),
  ]);
  search = {
    checkedAt,
    source: "Google Search Console",
    property: config.siteUrl,
    searchType: "web",
    dataState: "final",
    startDate,
    endDate,
    clicks: aggregate.rows?.[0]?.clicks ?? 0,
    daily: (dates.rows || []).map((row) => ({
      date: row.keys[0],
      clicks: row.clicks,
    })),
  };
}
const snapshot = {
  github: {
    checkedAt,
    profile: {
      login: profile.login,
      url: profile.html_url,
      publicRepositories: profile.public_repos,
    },
    repositories,
  },
  publication,
  search,
  tools,
  writing,
};
await mkdir(path.dirname(output), { recursive: true });
await writeFile(output, JSON.stringify(snapshot, null, 2) + "\n");
console.log(
  JSON.stringify({
    repositories: repositories.length,
    editorialPages: publication.posts + publication.guides + publication.fixes,
    browserTools: publication.tools,
    organicClicks: search.clicks,
    range: [search.startDate, search.endDate],
  }),
);
