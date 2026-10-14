import { HomePage } from "@/components/PortfolioPages";
import { homeMetadata } from "@/lib/portfolio-seo";
export const metadata = homeMetadata("fr");
export default function Page() {
  return <HomePage locale="fr" />;
}
