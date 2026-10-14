import { ServicesPage } from "@/components/PortfolioPages";
import { metadataFor } from "@/lib/portfolio-seo";
export const metadata = metadataFor(
  "en",
  "/services/",
  "Web Development Services in Tunisia | Mahdi Ben Rhouma",
  "Websites, React and Next.js interfaces, backend integrations and technical SEO. Discuss your project with Mahdi Ben Rhouma, a developer based in Tunisia.",
);
export default function Page() {
  return <ServicesPage locale="en" />;
}
