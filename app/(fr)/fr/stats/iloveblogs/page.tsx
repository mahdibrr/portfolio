import { DirectoryPage, directoryInfo } from "@/components/EcosystemPages";
import { metadataFor } from "@/lib/portfolio-seo";
const info = directoryInfo("stats/iloveblogs", "fr");
export const metadata = metadataFor(
  "fr",
  "/stats/iloveblogs/",
  info.title + " " + info.italic + " | Mahdi Ben Rhouma",
  info.description,
);
export default function Page() {
  return <DirectoryPage kind="stats/iloveblogs" locale="fr" />;
}
