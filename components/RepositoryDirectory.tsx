"use client";
import { useState } from "react";
import { ArrowUpRight, GitFork, Archive, Code2 } from "lucide-react";
import { ecosystemCopy, ecosystem, displayDate } from "@/lib/ecosystem";
import type { Locale } from "@/lib/portfolio";

export function RepositoryDirectory({ locale }: { locale: Locale }) {
  const t = ecosystemCopy[locale];
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const repos = ecosystem.github.repositories.filter((repo) => {
    const matches = (
      repo.name +
      " " +
      repo.description +
      " " +
      (repo.language || "")
    )
      .toLowerCase()
      .includes(query.toLowerCase().trim());
    return (
      matches &&
      (filter === "all" ||
        (filter === "archived" && repo.isArchived) ||
        (filter === "fork" && repo.isFork) ||
        (filter === "original" && !repo.isFork && !repo.isArchived))
    );
  });
  const describe = (repo: (typeof ecosystem.github.repositories)[number]) => {
    if (repo.name === "nextjs-seo-content-engine")
      return locale === "fr"
        ? "Instantané historique des scripts de scoring MDX, taxonomie, maillage et Search Console."
        : "Historical snapshot of MDX scoring, taxonomy, linking and Search Console scripts.";
    if (repo.name === "portfolio")
      return locale === "fr"
        ? "Le dépôt public d’origine du portfolio, lié à mahdibr.online."
        : "The original public portfolio repository, linked to mahdibr.online.";
    if (repo.name === "mahdibrr")
      return locale === "fr"
        ? "README du profil GitHub : présentation, liens et projets."
        : "GitHub profile README: introduction, links and selected projects.";
    return (
      repo.description ||
      (locale === "fr"
        ? "Consultez les fichiers et le README dans le dépôt public."
        : "Browse the files and README in this public repository.")
    );
  };
  return (
    <section className="repo-directory" id="repository-directory">
      <div className="directory-heading">
        <h2>{t.allRepositories}</h2>
        <span className="mono">
          {t.checked} / {displayDate(ecosystem.github.checkedAt, locale)}
        </span>
      </div>
      <div className="directory-toolbar">
        <label className="directory-search">
          <span>{t.search}</span>
          <input
            type="search"
            value={query}
            placeholder={t.searchHint}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <div
          className="directory-filters"
          aria-label={
            locale === "fr" ? "Filtrer les dépôts" : "Filter repositories"
          }
        >
          {[
            ["all", t.all],
            ["original", t.original],
            ["fork", t.fork],
            ["archived", t.archived],
          ].map(([key, label]) => (
            <button
              key={key}
              type="button"
              aria-pressed={filter === key}
              onClick={() => setFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <p className="directory-count" role="status">
        {repos.length}{" "}
        {repos.length === 1
          ? locale === "fr"
            ? "dépôt"
            : "repository"
          : t.results}
      </p>
      <div className="repo-grid">
        {repos.map((repo) => (
          <article className="repo-card" key={repo.fullName}>
            <div className="repo-card-top">
              <Code2 size={21} aria-hidden="true" />
              <span className="mono">
                {repo.isFork ? (
                  <>
                    <GitFork size={12} aria-hidden="true" />
                    {t.fork}
                  </>
                ) : repo.isArchived ? (
                  <>
                    <Archive size={12} aria-hidden="true" />
                    {t.archived}
                  </>
                ) : repo.name === "nextjs-seo-content-engine" ? (
                  t.historical
                ) : repo.name === "mahdibrr" ? (
                  t.profile
                ) : (
                  t.original
                )}
              </span>
            </div>
            <h3>
              <a href={repo.url} target="_blank" rel="noopener noreferrer">
                {repo.name}
                <ArrowUpRight size={19} aria-hidden="true" />
              </a>
            </h3>
            <p
              lang={
                locale === "fr" &&
                repo.description &&
                ![
                  "nextjs-seo-content-engine",
                  "portfolio",
                  "mahdibrr",
                ].includes(repo.name)
                  ? "en"
                  : locale
              }
            >
              {describe(repo)}
            </p>
            <div className="repo-card-bottom">
              <span className="mono">
                {repo.language ||
                  (locale === "fr" ? "Documentation" : "Documentation")}
              </span>
              <a href={repo.url} target="_blank" rel="noopener noreferrer">
                {t.visit}
                <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            </div>
          </article>
        ))}
      </div>
      {repos.length === 0 && <p className="empty-results">{t.noResults}</p>}
    </section>
  );
}
