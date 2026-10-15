# Mahdi Ben Rhouma portfolio

Source: https://github.com/mahdibrr/portfolio

The site is exported as static HTML, CSS, JavaScript and media for Cloudflare Pages.
Its canonical domain remains `https://mahdibr.online`.

## Build and deploy

```powershell
npm ci
npm run build:cf
$env:CLOUDFLARE_ACCOUNT_ID = '84a9f41b9625020f8b79f1fff53f1f26'
npx wrangler@4 pages deploy out --project-name=mahdibr-online --branch=main
```

Use an API token authorized for this account through `CLOUDFLARE_API_TOKEN`.
The existing default Wrangler OAuth login on this computer belongs to a different
account. Never put credentials in source files or commit `.env` files.

Cloudflare project: `mahdibr-online`, in the same account as `iloveblogs`.
Deployment URL: https://mahdibr-online.pages.dev

The domain zone is `90826cd87af11087395f0f13ef1e0f82`, on the Free plan.
The registrar nameservers were changed to `harley.ns.cloudflare.com` and
`nora.ns.cloudflare.com` on 2026-10-14. Both apex and WWW CNAMEs point to
`mahdibr-online.pages.dev`, and both hosts are registered as Pages custom domains.
An active zone redirect rule, `94e376f048bc4b03b9d514cab58125b1`, sends WWW to the
canonical HTTPS apex with status 301 and preserves paths and query strings.

This project uses Direct Upload. GitHub pushes do not automatically deploy it.
The site has 46 English and French pages, 11 real project case studies,
and a paper/forest visual palette. `npm run build:cf` prepares image assets,
checks TypeScript and validates the exported SEO, links and media. See
`SEO_SETUP.md` for the public metadata and indexing workflow.
The sections include `/open-source/`, `/writing/`, `/tools/`,
`/resources/` and `/stats/iloveblogs/`. The repository directory
shows active public GitHub projects with forks identified; archived repositories are left out. Featured
projects link to their source, documentation and related iloveblogs tools.
Relationships live in ordinary relevant links and verified structured data.
There is no visual ecosystem page; its former English and French URLs redirect
permanently to About through `public/_redirects`. Dispatching is removed from
the selection, sitemap and public media; its former URLs redirect to Work and
its original screenshots are retained under `assets/retired-work/`.

Current work covers Tukai, Tukai Pro, Tukhnanutha, Tukai Developers, VTC À Votre
Service, BSK Le Robuste, the People local MVP and the Monastir 3D concept.
Team cases identify Mahdi as a developer and team member. Private repositories
stay private; the site links public products and verified public source only.
Real captures are stored in `assets/project-captures/` and compressed into
`public/images/work/` at build. People, BSK and concept screenshots use local previews.
Galleries preserve the complete image proportions and offer a full-size link.
Tukai Pro has one demonstration screenshot; its retired second image stays outside public assets.
The profile states current studies at ESGITECH and uses
`mehdi.benrhouma@esgitech.tn`; structured data matches those facts.

`data/ecosystem-snapshot.json` contains the dated public GitHub catalog, live
sitemap counts and final Google Search Console click totals. The sanitized
snapshot is also served at `/data/ecosystem-snapshot.json`; it contains no
credentials, query terms or visitor records. Builds use the checked-in data.
To refresh it manually with the existing iloveblogs credentials, run:

```powershell
npm run refresh:ecosystem -- --blog-root ../iloveblogs
```

Use `--skip-gsc` to retain the previous dated search snapshot while refreshing
public repositories, reading selections and sitemap counts. Refreshing data
does not deploy the site. There is no automatic deployment setup.
The build creates `out/`; `public/_headers` preserves the CSP and asset cache headers.
Metadata routes are explicitly static, and Next image optimization is disabled
because the export has no Next.js server. The Ghassla demo video was compressed
below Pages' 25 MiB per-file limit while keeping its original URL.

## Connect the domain

1. Add `mahdibr.online` as a Cloudflare zone in account
   `84a9f41b9625020f8b79f1fff53f1f26` and select the Free plan.
2. Review all imported DNS records and preserve verification, mail and other
   existing service records. The current DNS contains a Google verification TXT.
3. At the registrar, use the exact nameservers assigned to this new zone.
4. Under Pages > `mahdibr-online` > Custom domains, connect `mahdibr.online` and
   `www.mahdibr.online`. Replace the obsolete Vercel web records as instructed by
   Cloudflare. Redirect `www` to the canonical apex domain.
5. Confirm both HTTPS hosts resolve successfully and the canonical URL remains
   `https://mahdibr.online`.

## Contact form

Set `NEXT_PUBLIC_WEB3FORMS_KEY` before building to enable Web3Forms delivery.
Without it, the button says "Open email draft" and opens the visitor's email app
with the enquiry filled in. The visitor sends the message themselves. The direct
email link also remains available. Set `NEXT_PUBLIC_GOOGLE_VERIFICATION` and `NEXT_PUBLIC_BING_VERIFICATION`
before building if those meta-tag verifications are used.
