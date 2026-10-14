import { ArrowUpRight, Code2, BookOpen, Wrench } from "lucide-react";
import {
  ecosystemCopy,
  ecosystem,
  sourceProjects,
  displayDate,
} from "@/lib/ecosystem";
import { routeFor, type Locale } from "@/lib/portfolio";

export function EcosystemBridge({ locale }: { locale: Locale }) {
  const t = ecosystemCopy[locale];
  return (
    <section className="ecosystem-bridge shell">
      <div className="section-heading">
        <div>
          <p className="eyebrow">
            {locale === "fr" ? "Code & articles" : "Code & writing"}
          </p>
          <h2>
            {t.homeTitle}
            <br />
            <em>{t.homeItalic}</em>
          </h2>
        </div>
        <div>
          <p className="section-intro">{t.homeIntro}</p>
          <a
            className="text-link bridge-more-link"
            href={routeFor(locale, "/open-source/")}
          >
            {t.openSource}
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="bridge-grid">
        {sourceProjects.slice(0, 2).map((project, index) => (
          <article key={project.slug} className="bridge-card">
            <span className="bridge-symbol" aria-hidden="true">
              {index === 0 ? <Code2 size={27} /> : <BookOpen size={27} />}
            </span>
            <p className="mono">{project.label[locale]}</p>
            <h3>{project.name}</h3>
            <p>{project.summary[locale]}</p>
            <a
              className="text-link"
              href={routeFor(locale, "/open-source/" + project.slug + "/")}
            >
              {t.readProject}
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </article>
        ))}
        <article className="bridge-card bridge-publication">
          <span className="bridge-symbol" aria-hidden="true">
            <Wrench size={27} />
          </span>
          <p className="mono">iloveblogs.blog</p>
          <h3>
            {locale === "fr"
              ? "Du code à l’explication."
              : "From code to explanation."}
          </h3>
          <div className="bridge-metrics">
            <div>
              <strong>
                {ecosystem.publication.posts +
                  ecosystem.publication.guides +
                  ecosystem.publication.fixes}
              </strong>
              <span>{t.pages}</span>
            </div>
            <div>
              <strong>{ecosystem.publication.tools}</strong>
              <span>{t.browserTools}</span>
            </div>
          </div>
          <p className="bridge-date">
            {t.checked} / {displayDate(ecosystem.publication.checkedAt, locale)}
          </p>
          <a
            className="text-link"
            href={routeFor(locale, "/stats/iloveblogs/")}
          >
            {t.stats}
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </article>
      </div>
    </section>
  );
}
