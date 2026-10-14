# Portfolio SEO

The public site uses `lib/portfolio-seo.ts` for metadata and structured data.
English and French have separate static routes, including the homepage, About,
Services, four project pages, public-code case studies and resource
directories. Each page has a unique title and description,
a self-referencing HTTPS canonical, reciprocal English/French hreflang links
and an English x-default.

The English root layout is in `app/(en)/layout.tsx`; the French root is in
`app/(fr)/fr/layout.tsx`. They render the correct HTML language before JavaScript
runs. Root navigation and case studies use ordinary crawlable links.

## Published files

- `/sitemap.xml`: all 32 pages, with language alternatives.
- `/_redirects`: the former ecosystem pages permanently redirect to About.
- `/robots.txt`: search crawl rules and the canonical sitemap URL.
- `/social/en/*.png` and `/social/fr/*.png`: actual 1200 × 630 sharing images.
- `/manifest.webmanifest`: real icons and the current site colours.
- `404.html`: the exported, noindex error page for Cloudflare Pages.

The homepage and About use ProfilePage with Person as the main entity.
Project pages use CreativeWork and breadcrumbs. Schema contains verified
profile links and project facts; it does not invent credentials, ratings or
business results. Legacy `lib/seo` helpers remain for historical components;
they do not generate the redesigned public pages.

Public-code pages describe SoftwareSourceCode and point to the actual
repositories. The Person links the portfolio, public GitHub profile, personal
LinkedIn profile and iloveblogs author page. Directories use ItemList where the
visible items match the structured data. Ordinary links connect projects,
source files, reading and browser tools; all pages are reachable within three
clicks of their language homepage.

There is no diagram or dedicated connections page. Author identity and project
relationships remain in structured data and relevant contextual links, without
hidden link blocks or different content for crawlers.

The publication statistics are dated and sourced. Search Console clicks are
not visitor counts, and editorial URLs in a sitemap are not an indexing count.

## Validation and publication

Run `npm run build:cf`. The build prepares images, runs Next.js with TypeScript
checking and verifies exported HTML, canonical URLs, reciprocal alternatives,
JSON-LD references, links, section anchors, media, social image dimensions,
sitemap coverage, error-page indexing and Cloudflare file-size limits.

Deploy the export to the existing `mahdibr-online` Cloudflare Pages project
using the account and credential procedure in README.md.

Google Search Console's domain property is already verified through DNS.
After the domain serves the current export, submit
`https://mahdibr.online/sitemap.xml` and inspect the homepage and representative
case-study URLs. Google decides when to crawl and index each page.

Optional meta verification values can be supplied as
`NEXT_PUBLIC_GOOGLE_VERIFICATION` and `NEXT_PUBLIC_BING_VERIFICATION` at build
time. Omit unused values; never use placeholder verification codes.

Improving rankings also requires useful project content and real references
from relevant sites. Monitor actual Search Console impressions, clicks and
indexing rather than treating third-party authority scores as revenue.
