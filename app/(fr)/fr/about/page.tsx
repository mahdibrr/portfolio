import { AboutPage } from "@/components/PortfolioPages";
import { metadataFor } from "@/lib/portfolio-seo";
export const metadata = metadataFor(
  "fr",
  "/about/",
  "À propos de Mahdi Ben Rhouma — Développeur full-stack",
  "Découvrez Mahdi Ben Rhouma, développeur full-stack basé en Tunisie : son parcours, son approche et ses outils pour construire des produits web utiles.",
);
export default function Page() {
  return <AboutPage locale="fr" />;
}
