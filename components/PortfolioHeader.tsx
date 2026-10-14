"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { copy, routeFor, type Locale } from "@/lib/portfolio";

export function PortfolioHeader({
  locale,
  path = "/",
}: {
  locale: Locale;
  path?: string;
}) {
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const t = copy[locale];
  const links = [
    {
      label: t.nav.work,
      href: routeFor(locale, "/work/"),
      active: path.startsWith("/work"),
    },
    {
      label: t.nav.openSource,
      href: routeFor(locale, "/open-source/"),
      active: path.startsWith("/open-source/"),
    },
    {
      label: t.nav.writing,
      href: routeFor(locale, "/writing/"),
      active: path === "/writing/",
    },
    {
      label: t.nav.services,
      href: routeFor(locale, "/services/"),
      active: path === "/services/",
    },
    {
      label: t.nav.about,
      href: routeFor(locale, "/about/"),
      active: path === "/about/",
    },
  ];

  useEffect(() => {
    if (!open) return;
    menu.current?.querySelector("a")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <a
          className="wordmark"
          href={routeFor(locale)}
          aria-label="Mahdi Ben Rhouma — Home"
        >
          <span className="monogram" aria-hidden="true">
            m.
          </span>
          <span>
            mahdi
            <br />
            <small>ben rhouma</small>
          </span>
        </a>
        <nav
          className="desktop-nav"
          aria-label={
            locale === "fr" ? "Navigation principale" : "Main navigation"
          }
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={link.active ? "is-active" : ""}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a
            className="language-link"
            href={routeFor(locale === "en" ? "fr" : "en", path)}
            lang={locale === "en" ? "fr" : "en"}
            aria-label={t.nav.language}
          >
            {locale === "en" ? "FR" : "EN"}
          </a>
          <a className="header-contact" href={`${routeFor(locale)}#contact`}>
            {t.nav.contact}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <button
            ref={toggle}
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? t.nav.close : t.nav.menu}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <div ref={menu} id="mobile-navigation" className="mobile-nav shell">
          <nav
            aria-label={
              locale === "fr" ? "Navigation mobile" : "Mobile navigation"
            }
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
                <ArrowUpRight size={19} aria-hidden="true" />
              </a>
            ))}
            <a
              href={`${routeFor(locale)}#contact`}
              onClick={() => setOpen(false)}
            >
              {t.nav.contact}
              <ArrowUpRight size={19} aria-hidden="true" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
