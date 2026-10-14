import type { Metadata } from "next";
import { PortfolioRoot } from "@/components/PortfolioFrame";
export const metadata: Metadata = {
  title: "Page not found | Mahdi Ben Rhouma",
  description:
    "This page could not be found. Explore the projects and services of Mahdi Ben Rhouma.",
  robots: { index: false, follow: true },
};
export default function NotFound() {
  return (
    <PortfolioRoot locale="en">
      <main id="main-content" className="shell not-found">
        <a className="wordmark" href="/">
          m.
        </a>
        <p className="eyebrow">404 / Page not found</p>
        <h1>
          A wrong turn.
          <br />
          <em>A fresh start.</em>
        </h1>
        <p>The page you’re looking for could not be found.</p>
        <a className="button button-forest" href="/">
          Explore the portfolio ↗
        </a>
      </main>
    </PortfolioRoot>
  );
}
