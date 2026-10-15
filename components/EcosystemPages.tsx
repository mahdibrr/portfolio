import {
  ArrowUpRight,
  ArrowRight,
  Code2,
  BookOpen,
  Wrench,
  Globe,
} from "lucide-react";
import { PortfolioFrame, JsonLd } from "./PortfolioFrame";
import { BrowserPreview } from "./PortfolioPages";
import { RepositoryDirectory } from "./RepositoryDirectory";
import {
  ecosystem,
  ecosystemCopy,
  sourceProjects,
  resources,
  ecosystemSchema,
  displayDate,
  publicationUrl,
  type SourceProject,
} from "@/lib/ecosystem";
import {
  projects,
  routeFor,
  identity,
  copy,
  type Locale,
} from "@/lib/portfolio";

export type DirectoryKind =
  | "work"
  | "open-source"
  | "writing"
  | "tools"
  | "resources"
  | "stats/iloveblogs";
export function directoryInfo(kind: DirectoryKind, locale: Locale) {
  const t = ecosystemCopy[locale];
  const info = {
    work: { title: t.workTitle, italic: "", description: t.workIntro },
    "open-source": {
      title: t.sourceTitle,
      italic: t.sourceItalic,
      description: t.sourceIntro,
    },
    writing: {
      title: t.writingTitle,
      italic: t.writingItalic,
      description: t.writingIntro,
    },
    tools: {
      title: t.toolsTitle,
      italic: t.toolsItalic,
      description: t.toolsIntro,
    },
    resources: {
      title: t.resourcesTitle,
      italic: t.resourcesItalic,
      description: t.resourcesIntro,
    },
    "stats/iloveblogs": {
      title: t.statsTitle,
      italic: t.statsItalic,
      description: t.statsIntro,
    },
  };
  return info[kind];
}
function External({
  href,
  children,
  className = "text-link",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <ArrowUpRight size={17} aria-hidden="true" />
    </a>
  );
}
function Title({ kind, locale }: { kind: DirectoryKind; locale: Locale }) {
  const t = ecosystemCopy[locale];
  const info = directoryInfo(kind, locale);
  const labels = {
    work: t.work,
    "open-source": t.openSource,
    writing: t.writing,
    tools: t.tools,
    resources: t.resources,
    "stats/iloveblogs": t.stats,
  };
  return (
    <div className="interior-heading directory-title">
      <p className="eyebrow">{labels[kind]} / Mahdi Ben Rhouma</p>
      <h1>
        {info.title}
        {info.italic && (
          <>
            <br />
            <em>{info.italic}</em>
          </>
        )}
      </h1>
      <p>{info.description}</p>
    </div>
  );
}
function SourceCards({ locale }: { locale: Locale }) {
  const t = ecosystemCopy[locale];
  return (
    <div className="source-featured">
      {sourceProjects.map((project, index) => (
        <article className="source-feature" key={project.slug}>
          <div className="source-feature-art" aria-hidden="true">
            <span className="mono">0{index + 1}</span>
            {index === 0 ? (
              <Code2 size={46} />
            ) : index === 1 ? (
              <BookOpen size={46} />
            ) : (
              <Globe size={46} />
            )}
            <span className="source-art-label">
              {index === 0
                ? "input → cause → fix"
                : index === 1
                  ? "broken → tested → fixed"
                  : "content → score → review"}
            </span>
          </div>
          <div>
            <span className="mono">{project.status[locale]}</span>
            <h2>
              <a href={routeFor(locale, "/open-source/" + project.slug + "/")}>
                {project.name}
                <ArrowUpRight size={22} aria-hidden="true" />
              </a>
            </h2>
            <p>{project.summary[locale]}</p>
            <div className="source-feature-links">
              <a
                className="text-link"
                href={routeFor(locale, "/open-source/" + project.slug + "/")}
              >
                {t.readProject}
                <ArrowRight size={16} aria-hidden="true" />
              </a>
              <External href={project.repo}>GitHub</External>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
function ProjectIndex({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <div className="project-index-grid">
      {projects.map((project) => (
        <article className="work-card" key={project.slug}>
          <a
            className="card-visual-link"
            href={routeFor(locale, "/work/" + project.slug + "/")}
            aria-label={t.caseLink + ": " + project.name}
          >
            <BrowserPreview project={project} locale={locale} />
            <span className="card-open">
              <ArrowUpRight size={22} aria-hidden="true" />
            </span>
          </a>
          <div className="work-card-head">
            <span className="mono">{project.type[locale]}</span>
            <span className="project-state">{t[project.status]}</span>
          </div>
          <h2>
            <a href={routeFor(locale, "/work/" + project.slug + "/")}>
              {project.name}
              <ArrowUpRight size={22} aria-hidden="true" />
            </a>
          </h2>
          <p>{project.summary[locale]}</p>
          <div className="tech-list">
            {project.stack.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
function WritingIndex({ locale }: { locale: Locale }) {
  const t = ecosystemCopy[locale];
  const topics = [
    ...new Set(ecosystem.writing.map((article) => article.topic)),
  ];
  return (
    <>
      <div className="directory-jump-links">
        {topics.map((topic) => (
          <a
            href={"#topic-" + topic.replace(/[^a-z0-9]/gi, "").toLowerCase()}
            key={topic}
          >
            {topic}
            <ArrowRight size={14} aria-hidden="true" />
          </a>
        ))}
      </div>
      {topics.map((topic) => (
        <section
          className="writing-topic"
          id={"topic-" + topic.replace(/[^a-z0-9]/gi, "").toLowerCase()}
          key={topic}
        >
          <div className="directory-heading">
            <h2>{topic}</h2>
            <span className="mono">iloveblogs.blog / {t.englishArticle}</span>
          </div>
          <div className="reading-grid">
            {ecosystem.writing
              .filter((article) => article.topic === topic)
              .map((article) => (
                <article className="reading-card" key={article.url}>
                  <span className="mono">{article.kind}</span>
                  <h3>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {article.title}
                      <ArrowUpRight size={19} aria-hidden="true" />
                    </a>
                  </h3>
                  <p>{article.description}</p>
                  <External href={article.url}>{t.readArticle}</External>
                </article>
              ))}
          </div>
        </section>
      ))}
      <div className="directory-end">
        <External href={publicationUrl + "/posts"}>{t.allWriting}</External>
        <a className="text-link" href={routeFor(locale, "/tools/")}>
          {t.tools}
          <ArrowRight size={17} aria-hidden="true" />
        </a>
      </div>
    </>
  );
}
function ToolsIndex({ locale }: { locale: Locale }) {
  const t = ecosystemCopy[locale];
  return (
    <>
      <div className="tool-grid">
        {ecosystem.tools.map((tool, index) => (
          <article className="tool-card" key={tool.url}>
            <div className="tool-number mono">
              {String(index + 1).padStart(2, "0")} / {tool.topic}
            </div>
            <Wrench size={23} aria-hidden="true" />
            <h2>
              <a href={tool.url} target="_blank" rel="noopener noreferrer">
                {tool.name}
                <ArrowUpRight size={20} aria-hidden="true" />
              </a>
            </h2>
            <p>{tool.description}</p>
            <div className="tool-card-links">
              <External href={tool.url}>{t.useTool}</External>
              {tool.libraryModule && (
                <External
                  href={
                    "https://github.com/mahdibrr/dev-error-explainers/blob/main/src/" +
                    tool.libraryModule +
                    ".js"
                  }
                >
                  {t.source}
                </External>
              )}
            </div>
          </article>
        ))}
      </div>
      <div className="callout">
        <div>
          <p className="eyebrow">dev-error-explainers</p>
          <h2>
            {locale === "fr"
              ? "L’explication est publique."
              : "The explanation has public source."}
          </h2>
          <p>
            {locale === "fr"
              ? "Six outils utilisent des modules de la bibliothèque publique. Consultez le contrat, les cas de test et les autres interfaces."
              : "Six tools use modules from the public library. Read the contract, fixtures and other ways to use the same logic."}
          </p>
        </div>
        <a
          className="button button-forest"
          href={routeFor(locale, "/open-source/dev-error-explainers/")}
        >
          {t.readProject}
          <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </div>
    </>
  );
}
function ResourcesIndex({ locale }: { locale: Locale }) {
  const t = ecosystemCopy[locale];
  return (
    <>
      <div className="resource-list">
        {resources.map((resource, index) => (
          <article key={resource.url}>
            <span className="resource-number mono">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="eyebrow">
                {resource.kind === "documentation"
                  ? t.documentation
                  : resource.kind === "upstream"
                    ? t.upstream
                    : resource.kind === "fork"
                      ? t.ownerFork
                      : t.original}
              </p>
              <h2>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {resource.name}
                  <ArrowUpRight size={22} aria-hidden="true" />
                </a>
              </h2>
              <p>{resource.description[locale]}</p>
            </div>
            <span className="resource-host mono">
              {new URL(resource.url).hostname}
            </span>
          </article>
        ))}
      </div>
      <p className="resource-attribution">{t.resourceNote}</p>
      <div className="directory-end">
        <a className="text-link" href={routeFor(locale, "/open-source/")}>
          {t.openSource}
          <ArrowRight size={17} aria-hidden="true" />
        </a>
        <a className="text-link" href={routeFor(locale, "/tools/")}>
          {t.tools}
          <ArrowRight size={17} aria-hidden="true" />
        </a>
      </div>
    </>
  );
}
function Stats({ locale }: { locale: Locale }) {
  const t = ecosystemCopy[locale];
  const data = ecosystem.search;
  const publication = ecosystem.publication;
  const cards = [
    {
      value: data.clicks,
      label: t.clicks,
      note:
        displayDate(data.startDate, locale) +
        " — " +
        displayDate(data.endDate, locale),
      body: t.clickHelp,
    },
    {
      value: publication.posts + publication.guides + publication.fixes,
      label: t.pages,
      note: t.checked + " / " + displayDate(publication.checkedAt, locale),
      body: t.pageHelp,
    },
    {
      value: publication.tools,
      label: t.browserTools,
      note: "iloveblogs.blog / tools",
      body:
        locale === "fr"
          ? "Outils disponibles sur la publication."
          : "Tools available on the publication.",
    },
    {
      value: ecosystem.github.repositories.length,
      label: t.repos,
      note: t.checked + " / " + displayDate(ecosystem.github.checkedAt, locale),
      body:
        locale === "fr"
          ? "Dépôts originaux et forks actifs, sans les archives."
          : "Active original repositories and forks, archives excluded.",
    },
  ];
  const weeks = [];
  for (let i = 0; i < data.daily.length; i += 7) {
    const days = data.daily.slice(i, i + 7);
    weeks.push({
      start: days[0].date,
      end: days.at(-1)!.date,
      clicks: days.reduce((total, day) => total + day.clicks, 0),
    });
  }
  const max =
    Math.ceil(Math.max(...weeks.map((week) => week.clicks)) / 50) * 50;
  const barWidth = 900 / weeks.length;
  return (
    <>
      <div className="stat-card-grid">
        {cards.map((card) => (
          <article className="stat-card" key={card.label}>
            <span className="mono">{card.label}</span>
            <strong>
              {card.value.toLocaleString(locale === "fr" ? "fr-FR" : "en-GB")}
            </strong>
            <p className="stat-period">{card.note}</p>
            <p>{card.body}</p>
          </article>
        ))}
      </div>
      <figure className="click-chart">
        <figcaption>
          <h2>{t.graph}</h2>
          <p>{t.graphHelp}</p>
        </figcaption>
        <svg
          viewBox="0 0 1000 295"
          role="img"
          aria-labelledby="clicks-chart-title"
        >
          <title id="clicks-chart-title">
            {t.graph}: {data.clicks} / {data.startDate} — {data.endDate}
          </title>
          {[0, max / 2, max].map((tick) => (
            <g key={tick}>
              <line
                x1="60"
                x2="960"
                y1={240 - (tick / max) * 190}
                y2={240 - (tick / max) * 190}
                stroke="#d9ddd1"
              />
              <text
                x="44"
                y={245 - (tick / max) * 190}
                textAnchor="end"
                fontSize="13"
                fill="#636c61"
              >
                {tick}
              </text>
            </g>
          ))}
          {weeks.map((week, index) => (
            <g key={week.start}>
              <rect
                x={60 + index * barWidth + 8}
                y={240 - (week.clicks / max) * 190}
                width={barWidth - 17}
                height={(week.clicks / max) * 190}
                rx="3"
                fill={index === weeks.length - 1 ? "#ae683e" : "#274d3d"}
              >
                <title>
                  {week.start} — {week.end}: {week.clicks}
                </title>
              </rect>
              <text
                x={60 + index * barWidth + barWidth / 2}
                data-axis="x"
                data-sparse={index % 3 === 0 ? "true" : undefined}
                y="264"
                textAnchor="middle"
                fontSize="10"
                fill="#636c61"
              >
                {new Date(week.start).toLocaleDateString(
                  locale === "fr" ? "fr-FR" : "en-GB",
                  { day: "numeric", month: "short", timeZone: "UTC" },
                )}
              </text>
            </g>
          ))}
        </svg>
        <details className="chart-table">
          <summary>
            {locale === "fr"
              ? "Voir les chiffres par période"
              : "View the figures by period"}
          </summary>
          <table>
            <thead>
              <tr>
                <th>{locale === "fr" ? "Période" : "Period"}</th>
                <th>{t.clicks}</th>
              </tr>
            </thead>
            <tbody>
              {weeks.map((week) => (
                <tr key={week.start}>
                  <td>
                    {displayDate(week.start, locale)} —{" "}
                    {displayDate(week.end, locale)}
                  </td>
                  <td>{week.clicks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>
      </figure>
      <section className="stats-methodology">
        <p className="eyebrow">
          {t.checked} / {displayDate(data.checkedAt, locale)}
        </p>
        <h2>{t.methodology}</h2>
        <div>
          {[t.method1, t.method2, t.method3].map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
        <div className="method-links">
          <a
            className="text-link"
            href="/data/ecosystem-snapshot.json"
            download
          >
            {t.dataLink}
            <ArrowRight size={16} aria-hidden="true" />
          </a>
          <External href={publication.sitemapUrl}>{t.sitemapLink}</External>
          <External href={identity.github}>{t.githubLink}</External>
        </div>
      </section>
    </>
  );
}
export function DirectoryPage({
  kind,
  locale,
}: {
  kind: DirectoryKind;
  locale: Locale;
}) {
  const route = "/" + kind + "/";
  const info = directoryInfo(kind, locale);
  const items =
    kind === "open-source"
      ? sourceProjects.map((project) => ({
          name: project.name,
          url: "/open-source/" + project.slug + "/",
        }))
      : kind === "work"
        ? projects.map((project) => ({
            name: project.name,
            url: "/work/" + project.slug + "/",
          }))
        : kind === "tools"
          ? ecosystem.tools.map((tool) => ({ name: tool.name, url: tool.url }))
          : kind === "resources"
            ? resources.map((resource) => ({
                name: resource.name,
                url: resource.url,
              }))
            : undefined;
  return (
    <PortfolioFrame locale={locale} path={route}>
      <JsonLd
        data={ecosystemSchema(
          locale,
          route,
          info.title,
          info.description,
          items,
        )}
      />
      <div className="shell interior-page directory-page">
        <Title kind={kind} locale={locale} />
        {kind === "work" ? (
          <ProjectIndex locale={locale} />
        ) : kind === "open-source" ? (
          <>
            <SourceCards locale={locale} />
            <RepositoryDirectory locale={locale} />
          </>
        ) : kind === "writing" ? (
          <WritingIndex locale={locale} />
        ) : kind === "tools" ? (
          <ToolsIndex locale={locale} />
        ) : kind === "resources" ? (
          <ResourcesIndex locale={locale} />
        ) : (
          <Stats locale={locale} />
        )}
      </div>
    </PortfolioFrame>
  );
}
export function SourceProjectPage({
  project,
  locale,
}: {
  project: SourceProject;
  locale: Locale;
}) {
  const t = ecosystemCopy[locale];
  const route = "/open-source/" + project.slug + "/";
  return (
    <PortfolioFrame locale={locale} path={route}>
      <JsonLd
        data={ecosystemSchema(
          locale,
          route,
          project.name,
          project.summary[locale],
          undefined,
          project,
        )}
      />
      <div className="shell interior-page source-page">
        <nav
          className="breadcrumbs"
          aria-label={locale === "fr" ? "Fil d’Ariane" : "Breadcrumb"}
        >
          <a href={routeFor(locale)}>{locale === "fr" ? "Accueil" : "Home"}</a>
          <span>/</span>
          <a href={routeFor(locale, "/open-source/")}>{t.openSource}</a>
          <span>/</span>
          <span>{project.name}</span>
        </nav>
        <div className="source-page-heading">
          <div>
            <p className="eyebrow">{project.label[locale]}</p>
            <h1>
              {project.name}
              <span className="heading-period">.</span>
            </h1>
            <p className="source-lead">{project.lead[locale]}</p>
            <p className="body-copy">{project.summary[locale]}</p>
          </div>
          <aside>
            <span className="mono">{t.status}</span>
            <p>{project.status[locale]}</p>
            <External href={project.repo}>{t.viewRepo}</External>
          </aside>
        </div>
        <div className="source-page-body">
          <aside className="source-docs">
            <p className="eyebrow">{t.repoDocs}</p>
            {project.docs.map((doc) => (
              <External key={doc.url} href={doc.url}>
                {doc.name}
              </External>
            ))}
          </aside>
          <div>
            {project.sections.map((section) => (
              <section className="source-section" key={section.title[locale]}>
                <h2>{section.title[locale]}</h2>
                <p>{section.body[locale]}</p>
              </section>
            ))}
            {project.example && (
              <section className="source-example">
                <p className="eyebrow">{t.example}</p>
                <h2>window is not defined</h2>
                <p>
                  {locale === "fr"
                    ? "Depuis un checkout du dépôt, utilisez le cas de test public. Le résultat attendu identifie la règle ci-dessous."
                    : "From a checkout of the repository, use the public fixture. Its expected result identifies the rule below."}
                </p>
                <pre>
                  <code>{project.example.command}</code>
                </pre>
                <p className="fixture-rule">
                  rule: <code>{project.example.rule}</code>
                </p>
                <div className="source-example-links">
                  <External href={project.example.input}>
                    {locale === "fr" ? "Entrée du test" : "Fixture input"}
                  </External>
                  <External href={project.example.expected}>
                    {locale === "fr" ? "Résultat attendu" : "Expected result"}
                  </External>
                </div>
              </section>
            )}
          </div>
        </div>
        <section className="related-connections">
          <p className="eyebrow">{t.related}</p>
          <div>
            {project.related.map((link) => (
              <a
                className="connection-card"
                key={link.url}
                href={
                  link.url.startsWith("/")
                    ? routeFor(locale, link.url)
                    : link.url
                }
                {...(link.url.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                <span className="mono">{link.kind[locale]}</span>
                <strong>
                  {link.name}
                  <ArrowUpRight size={19} aria-hidden="true" />
                </strong>
              </a>
            ))}
          </div>
        </section>
        <a className="text-link" href={routeFor(locale, "/open-source/")}>
          {t.routeBack}
          <ArrowRight size={17} aria-hidden="true" />
        </a>
      </div>
    </PortfolioFrame>
  );
}
