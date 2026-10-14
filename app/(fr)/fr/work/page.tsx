import { DirectoryPage, directoryInfo } from "@/components/EcosystemPages";
import { metadataFor } from "@/lib/portfolio-seo";
const info = directoryInfo("work", "fr");
export const metadata = metadataFor(
  "fr",
  "/work/",
  info.title + " " + info.italic + " | Mahdi Ben Rhouma",
  info.description,
);
export default function Page() {
  return <DirectoryPage kind="work" locale="fr" />;
}
