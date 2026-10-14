import { ServicesPage } from "@/components/PortfolioPages";
import { metadataFor } from "@/lib/portfolio-seo";
export const metadata = metadataFor(
  "fr",
  "/services/",
  "Services de développement web en Tunisie | Mahdi Ben Rhouma",
  "Sites web, interfaces React et Next.js, intégrations backend et SEO technique. Échangez sur votre projet avec Mahdi Ben Rhouma, développeur en Tunisie.",
);
export default function Page() {
  return <ServicesPage locale="fr" />;
}
