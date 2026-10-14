import { DirectoryPage, directoryInfo } from "@/components/EcosystemPages";
import { metadataFor } from "@/lib/portfolio-seo";
const info = directoryInfo("tools", "fr");
export const metadata = metadataFor(
  "fr",
  "/tools/",
  info.title + " " + info.italic + " | Mahdi Ben Rhouma",
  info.description,
);
export default function Page() {
  return <DirectoryPage kind="tools" locale="fr" />;
}
