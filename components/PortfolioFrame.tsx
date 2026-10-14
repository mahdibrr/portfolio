import type { ReactNode } from "react";
import { ArrowUpRight, ArrowUp, Github, Linkedin } from "lucide-react";
import { PortfolioHeader } from "./PortfolioHeader";
import { ContactForm } from "./ContactForm";
import { copy, identity, routeFor, type Locale } from "@/lib/portfolio";
import { sans, serif } from "@/lib/fonts";
import "@/app/globals.css";

export function PortfolioRoot({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <html lang={locale}>
      <body className={`${sans.variable} ${serif.variable}`}>
        <a className="skip-link" href="#main-content">
          {locale === "fr" ? "Aller au contenu" : "Skip to content"}
        </a>
        {children}
      </body>
    </html>
  );
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function ContactSection({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <section id="contact" className="contact-section">
      <div className="shell contact-grid">
        <div className="contact-copy">
          <p className="eyebrow">{t.contactLabel}</p>
          <h2>
            {t.contactTitle}
            <br />
            <em>{t.contactItalic}</em>
          </h2>
          <p className="contact-intro">{t.contactIntro}</p>
          <div className="direct-contact">
            <span>{t.emailLabel}</span>
            <a href={`mailto:${identity.email}`}>
              {identity.email}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
          <div className="social-links">
            <a href={identity.github} target="_blank" rel="noopener noreferrer">
              <Github size={16} aria-hidden="true" />
              GitHub
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
            <a
              href={identity.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={16} aria-hidden="true" />
              LinkedIn
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </div>
        </div>
        <ContactForm language={locale} />
      </div>
    </section>
  );
}

export function PortfolioFrame({
  locale,
  path = "/",
  children,
}: {
  locale: Locale;
  path?: string;
  children: ReactNode;
}) {
  const t = copy[locale];
  return (
    <>
      <div id="top" />
      <PortfolioHeader locale={locale} path={path} />
      <main id="main-content">{children}</main>
      <ContactSection locale={locale} />
      <footer className="site-footer">
        <div className="shell footer-inner">
          <a className="footer-name" href={routeFor(locale)}>
            {identity.name}
            <span>© {new Date().getFullYear()}</span>
          </a>
          <span className="footer-note">{t.footer}</span>
          <a href="#top" className="back-top">
            {t.backTop}
            <ArrowUp size={15} aria-hidden="true" />
          </a>
        </div>
      </footer>
    </>
  );
}
