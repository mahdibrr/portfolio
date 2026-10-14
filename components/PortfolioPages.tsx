import {
  ArrowDownRight,
  ArrowUpRight,
  ArrowRight,
  Check,
  Plus,
} from "lucide-react";
import { PortfolioFrame, JsonLd } from "./PortfolioFrame";
import { ProjectGallery } from "./ProjectGallery";
import {
  copy,
  identity,
  projects,
  routeFor,
  skillGroups,
  type Locale,
  type Project,
} from "@/lib/portfolio";
import { pageSchema } from "@/lib/portfolio-seo";
import { EcosystemBridge } from "./EcosystemBridge";

export function BrowserPreview({
  project,
  locale,
}: {
  project: Project;
  locale: Locale;
}) {
  return (
    <div className={`project-visual tone-${project.color}`}>
      <div className="browser-window">
        <div className="browser-top">
          <span className="browser-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>
            {project.url
              ? new URL(project.url).hostname
              : project.slug === "ghassla"
                ? "ghassla / booking experience"
                : project.name +
                  " / " +
                  (locale === "fr" ? "aperçu local" : "local preview")}
          </span>
          <span className="browser-square" aria-hidden="true" />
        </div>
        <div className="browser-image">
          <img
            src={project.cover}
            alt={project.imageAlt[locale]}
            width={project.url ? 1536 : 1920}
            height={project.url ? 674 : 1080}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
}

function ProjectLabel({
  project,
  locale,
}: {
  project: Project;
  locale: Locale;
}) {
  const t = copy[locale];
  return (
    <span className={`project-state state-${project.status}`}>
      <i aria-hidden="true" />
      {t[project.status]}
    </span>
  );
}

export function HomePage({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const first = projects[0];
  return (
    <PortfolioFrame locale={locale}>
      <JsonLd data={pageSchema(locale, "/", identity.name, t.hero, true)} />
      <section className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow hero-role">
            <span className="tiny-cross" aria-hidden="true">
              ✳
            </span>
            {t.role} <span className="role-divider" />{" "}
            {locale === "fr" ? "Tunisie" : "Tunisia"}
          </p>
          <h1>
            <span>Mahdi</span>
            <em>Ben Rhouma.</em>
            <span className="sr-only">
              {" "}
              — {t.role} {locale === "fr" ? "en Tunisie" : "in Tunisia"}
            </span>
          </h1>
          <p className="hero-intro">{t.hero}</p>
          <div className="hero-links">
            <a className="button button-forest" href="#work">
              {t.explore}
              <ArrowDownRight size={20} aria-hidden="true" />
            </a>
            <a className="text-link" href={routeFor(locale, "/about/")}>
              {t.aboutLink}
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
          <div className="hero-foot">
            <span className="availability">
              <i aria-hidden="true" />
              {t.available}
            </span>
            <a href="#work" className="scroll-note">
              {t.scroll}
              <ArrowDownRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="hero-portrait">
          <div className="portrait-paper">
            <img
              src="/images/profile.jpg"
              alt="Mahdi Ben Rhouma"
              width={717}
              height={742}
              fetchPriority="high"
              decoding="async"
            />
            <div className="portrait-caption">
              <span>
                {locale === "fr"
                  ? "L’humain derrière le code."
                  : "The human behind the code."}
              </span>
              <span>MBR / 01</span>
            </div>
          </div>
          <div className="portrait-note">
            <svg viewBox="0 0 76 68" fill="none" aria-hidden="true">
              <path
                d="M68 8C65 40 25 16 12 56M12 56L10 39M12 56L29 51"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <span>
              {t.location}
              <br />
              {locale === "fr" ? "Curieux, par nature." : "Curious, by nature."}
            </span>
          </div>
          <span className="portrait-coordinate" aria-hidden="true">
            TUNISIA / WEB DEVELOPMENT
          </span>
        </div>
      </section>
      <div className="discipline-strip">
        <div className="shell">
          <span>
            {locale === "fr"
              ? "De l’idée à la mise en ligne"
              : "From the first idea to the final detail"}
          </span>
          <span>
            Next.js <i>/</i> React <i>/</i> TypeScript <i>/</i> Python <i>/</i>{" "}
            Cloudflare
          </span>
        </div>
      </div>
      <span id="projects" aria-hidden="true" />
      <section id="work" className="work-section shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{t.workLabel}</p>
            <h2>
              {t.workTitle}
              <br />
              <em>{t.workItalic}</em>
            </h2>
          </div>
          <p className="section-intro">{t.workIntro}</p>
        </div>
        <article className="featured-project">
          <div className="featured-copy">
            <div className="project-meta">
              <span className="mono">01</span>
              <ProjectLabel project={first} locale={locale} />
            </div>
            <p className="project-type">{first.type[locale]}</p>
            <h3>
              <a href={routeFor(locale, `/work/${first.slug}/`)}>
                {first.name}
              </a>
            </h3>
            <p className="project-summary">{first.summary[locale]}</p>
            <p className="project-description">{first.description[locale]}</p>
            <div className="tech-list">
              {first.stack.slice(0, 3).map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
            <a
              className="text-link project-cta"
              href={routeFor(locale, `/work/${first.slug}/`)}
            >
              {t.caseLink}
              <ArrowUpRight size={20} aria-hidden="true" />
            </a>
          </div>
          <a
            className="featured-visual-link"
            href={routeFor(locale, `/work/${first.slug}/`)}
            aria-label={`${t.caseLink}: ${first.name}`}
          >
            <BrowserPreview project={first} locale={locale} />
          </a>
        </article>
        <div className="project-pair">
          {projects.slice(1, 3).map((project, index) => (
            <article className="work-card" key={project.slug}>
              <a
                className="card-visual-link"
                href={routeFor(locale, `/work/${project.slug}/`)}
                aria-label={`${t.caseLink}: ${project.name}`}
              >
                <BrowserPreview project={project} locale={locale} />
                <span className="card-open" aria-hidden="true">
                  <ArrowUpRight size={22} />
                </span>
              </a>
              <div className="work-card-head">
                <span className="mono">
                  0{index + 2} / {project.type[locale]}
                </span>
                <ProjectLabel project={project} locale={locale} />
              </div>
              <h3>
                <a href={routeFor(locale, `/work/${project.slug}/`)}>
                  {project.name}
                  <ArrowUpRight size={24} aria-hidden="true" />
                </a>
              </h3>
              <p>{project.summary[locale]}</p>
              <div className="tech-list">
                {project.stack.slice(0, 3).map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
        <div className="recent-projects-row">
          {projects.slice(3, 6).map((project) => (
            <a
              className="recent-project-card"
              key={project.slug}
              href={routeFor(locale, `/work/${project.slug}/`)}
            >
              <img
                src={project.cover}
                alt={project.imageAlt[locale]}
                width={640}
                height={360}
                loading="lazy"
              />
              <span className="mono">{project.type[locale]}</span>
              <h3>
                {project.name}
                <ArrowUpRight size={18} aria-hidden="true" />
              </h3>
              <p>{project.summary[locale]}</p>
            </a>
          ))}
        </div>
        <a
          className="text-link all-projects-link"
          href={routeFor(locale, "/work/")}
        >
          {locale === "fr"
            ? `Voir les ${projects.length} projets`
            : `View all ${projects.length} projects`}
          <ArrowRight size={18} aria-hidden="true" />
        </a>
      </section>
      <section className="services-home" id="skills">
        <div className="shell services-home-grid">
          <div>
            <p className="eyebrow">{t.servicesLabel}</p>
            <h2>
              {t.servicesTitle}
              <br />
              <em>{t.servicesItalic}</em>
            </h2>
            <p className="section-intro">{t.servicesIntro}</p>
            <a className="text-link" href={routeFor(locale, "/services/")}>
              {t.servicesLink}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
          <div className="service-list">
            {[
              { title: t.service1, body: t.service1Desc },
              { title: t.service2, body: t.service2Desc },
              { title: t.service3, body: t.service3Desc },
            ].map((service, index) => (
              <details key={service.title} open={index === 0}>
                <summary>
                  <span className="mono">0{index + 1}</span>
                  <span>{service.title}</span>
                  <Plus size={19} aria-hidden="true" />
                </summary>
                <p>{service.body}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <EcosystemBridge locale={locale} />
      <section className="about-home shell" id="about">
        <div className="about-margin">
          <span className="mono">{t.aboutLabel}</span>
          <div className="about-signature">
            Mahdi<span aria-hidden="true">↗</span>
          </div>
          <p>{t.languages}</p>
        </div>
        <div>
          <h2>
            {t.aboutTitle}
            <br />
            <em>{t.aboutItalic}</em>
          </h2>
          <p className="about-lead">{t.aboutIntro}</p>
          <p className="body-copy">{t.aboutBody}</p>
          <a className="text-link" href={routeFor(locale, "/about/")}>
            {t.aboutCta}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
      </section>
    </PortfolioFrame>
  );
}

export function ProjectPage({
  project,
  locale,
}: {
  project: Project;
  locale: Locale;
}) {
  const t = copy[locale];
  const path = `/work/${project.slug}/`;
  return (
    <PortfolioFrame locale={locale} path={path}>
      <JsonLd
        data={pageSchema(
          locale,
          path,
          project.name,
          project.description[locale],
          false,
          project,
        )}
      />
      <div className="shell project-page">
        <nav
          className="breadcrumbs"
          aria-label={locale === "fr" ? "Fil d’Ariane" : "Breadcrumb"}
        >
          <a href={routeFor(locale)}>{locale === "fr" ? "Accueil" : "Home"}</a>
          <span>/</span>
          <span>{project.name}</span>
        </nav>
        <div className="project-page-heading">
          <div>
            <p className="eyebrow">{project.type[locale]}</p>
            <h1>
              {project.name}
              <span className="heading-period">.</span>
            </h1>
            <p className="project-page-lead">{project.summary[locale]}</p>
          </div>
          <div className="project-page-side">
            <ProjectLabel project={project} locale={locale} />
            <span className="mono">{t.stack}</span>
            <p>{project.stack.join(" / ")}</p>
            {project.url && (
              <a
                className="text-link"
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.visit}
                <ArrowUpRight size={19} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
        <div className={`case-visual tone-${project.color}`}>
          <ProjectGallery
            images={[project.cover, ...(project.gallery ?? [])]}
            alt={project.imageAlt[locale]}
            locale={locale}
            captions={project.imageCaptions?.map((caption) => caption[locale])}
          />
        </div>
        <div className="case-content">
          <aside>
            <p className="eyebrow">{t.overview}</p>
            <p className="case-status-note">{project.note[locale]}</p>
            {project.role && (
              <dl className="case-facts">
                <dt>{locale === "fr" ? "Mon rôle" : "My role"}</dt>
                <dd>{project.role[locale]}</dd>
                {project.period && (
                  <>
                    <dt>{locale === "fr" ? "Période" : "Period"}</dt>
                    <dd>{project.period}</dd>
                  </>
                )}
              </dl>
            )}
            {project.sourceUrl && (
              <a
                className="text-link"
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {locale === "fr"
                  ? "Code public sur GitHub"
                  : "Public source on GitHub"}
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            )}
          </aside>
          <div>
            <h2>{project.description[locale]}</h2>
            <p className="body-copy">{project.context[locale]}</p>
            <h3>{t.focus}</h3>
            <ul className="case-focus">
              {project.focus.map((point) => (
                <li key={point[locale]}>
                  <Check size={19} aria-hidden="true" />
                  <p>{point[locale]}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {project.video && (
          <section className="case-video">
            <div>
              <p className="eyebrow">{t.details}</p>
              <h2>{t.video}</h2>
            </div>
            <video
              controls
              preload="none"
              playsInline
              poster={project.cover}
              aria-label={`${project.name} — ${t.video}`}
            >
              <source src={project.video} type="video/mp4" />
            </video>
          </section>
        )}
        {!!project.related?.length && (
          <section className="project-related">
            <p className="eyebrow">
              {locale === "fr"
                ? "À découvrir aussi"
                : "Related work & resources"}
            </p>
            <div>
              {project.related.map((link) => (
                <a
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
                  {link.name[locale]}
                  <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              ))}
            </div>
          </section>
        )}
        <div className="case-end">
          <a className="text-link" href={`${routeFor(locale)}#work`}>
            {t.allWork}
            <ArrowRight size={18} aria-hidden="true" />
          </a>
          <span className="mono">{project.stack.slice(0, 3).join(" / ")}</span>
        </div>
      </div>
    </PortfolioFrame>
  );
}

export function ServicesPage({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const title =
    locale === "fr"
      ? "Services de développement web full-stack"
      : "Full-stack web development services";
  const services = [
    {
      title: t.service1,
      body: t.service1Desc,
      stack: "React / Next.js / TypeScript",
      project: projects.find((project) => project.slug === "bsk-le-robuste")!,
    },
    {
      title: t.service2,
      body: t.service2Desc,
      stack: "Python / FastAPI / NestJS / PostgreSQL",
      project: projects.find((project) => project.slug === "tukai")!,
    },
    {
      title: t.service3,
      body: t.service3Desc,
      stack: "HTML / CSS / Structured data / Cloudflare",
      project: projects.find(
        (project) => project.slug === "vtc-a-votre-service",
      )!,
    },
  ];
  return (
    <PortfolioFrame locale={locale} path="/services/">
      <JsonLd
        data={pageSchema(locale, "/services/", title, t.servicesPageIntro)}
      />
      <div className="shell interior-page">
        <div className="interior-heading">
          <p className="eyebrow">
            {t.nav.services} / {t.location}
          </p>
          <h1>
            {t.servicesPageTitle}
            <br />
            <em>{t.servicesPageItalic}</em>
          </h1>
          <p>{t.servicesPageIntro}</p>
        </div>
        <div className="service-detail-list">
          {services.map((service, index) => (
            <article key={service.title}>
              <span className="service-number">0{index + 1}</span>
              <div>
                <h2>{service.title}</h2>
                <p>{service.body}</p>
                <span className="mono service-tools">{service.stack}</span>
              </div>
              <a
                className="service-example"
                href={routeFor(locale, `/work/${service.project.slug}/`)}
              >
                <span className="eyebrow">
                  {locale === "fr"
                    ? "Un projet à découvrir"
                    : "A project to explore"}
                </span>
                <span>
                  {service.project.name}
                  <ArrowUpRight size={20} aria-hidden="true" />
                </span>
              </a>
            </article>
          ))}
        </div>
        <section className="process-section">
          <p className="eyebrow">{t.processLabel}</p>
          <h2>{t.processTitle}</h2>
          <div className="process-grid">
            {t.steps.map((step, index) => (
              <article key={step.title}>
                <span className="mono">0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="faq-section">
          <h2>{t.faqTitle}</h2>
          <div>
            {t.faq.map((faq) => (
              <details key={faq.question}>
                <summary>
                  {faq.question}
                  <Plus size={19} aria-hidden="true" />
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </PortfolioFrame>
  );
}

export function AboutPage({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <PortfolioFrame locale={locale} path="/about/">
      <JsonLd
        data={pageSchema(
          locale,
          "/about/",
          `${t.nav.about} — ${identity.name}`,
          t.aboutPageIntro,
          true,
        )}
      />
      <div className="shell interior-page about-page">
        <div className="about-page-top">
          <div>
            <p className="eyebrow">
              {t.nav.about} / {t.location}
            </p>
            <h1>
              {locale === "fr" ? "Derrière le code," : "Behind the code,"}
              <br />
              <em>{locale === "fr" ? "il y a Mahdi." : "there’s Mahdi."}</em>
            </h1>
            <p className="about-page-intro">{t.aboutPageIntro}</p>
            <div className="about-links">
              <a
                className="text-link"
                href={identity.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              <a
                className="text-link"
                href={identity.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="about-page-portrait">
            <img
              src="/images/profile.jpg"
              alt="Mahdi Ben Rhouma"
              width={717}
              height={742}
              fetchPriority="high"
              decoding="async"
            />
            <span className="mono">{t.location} / EN & FR</span>
          </div>
        </div>
        <div className="about-story">
          <article>
            <h2>{t.background}</h2>
            <p>{t.backgroundBody}</p>
          </article>
          <article>
            <h2>{t.approach}</h2>
            <p>{t.approachBody}</p>
            <p>{t.workBody}</p>
          </article>
        </div>
        <section id="skills" className="toolkit-section">
          <p className="eyebrow">{t.skillsTitle}</p>
          <div className="toolkit-grid">
            {skillGroups.map((group) => (
              <div key={group.label[locale]}>
                <h2>{group.label[locale]}</h2>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PortfolioFrame>
  );
}
