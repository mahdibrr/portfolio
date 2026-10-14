import { DirectoryPage, directoryInfo } from "@/components/EcosystemPages";
import { metadataFor } from "@/lib/portfolio-seo";
const info = directoryInfo("stats/iloveblogs", "en");
export const metadata = metadataFor(
  "en",
  "/stats/iloveblogs/",
  info.title + " " + info.italic + " | Mahdi Ben Rhouma",
  info.description,
);
export default function Page() {
  return <DirectoryPage kind="stats/iloveblogs" locale="en" />;
}
