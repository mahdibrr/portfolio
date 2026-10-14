import { AboutPage } from "@/components/PortfolioPages";
import { metadataFor } from "@/lib/portfolio-seo";
export const metadata = metadataFor(
  "en",
  "/about/",
  "About Mahdi Ben Rhouma — Full-Stack Developer",
  "Meet Mahdi Ben Rhouma, a full-stack developer based in Tunisia. Explore his background, approach and toolkit for building useful web products.",
);
export default function Page() {
  return <AboutPage locale="en" />;
}
