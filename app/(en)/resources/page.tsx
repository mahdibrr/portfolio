import { DirectoryPage, directoryInfo } from "@/components/EcosystemPages";
import { metadataFor } from "@/lib/portfolio-seo";
const info = directoryInfo("resources", "en");
export const metadata = metadataFor(
  "en",
  "/resources/",
  info.title + " " + info.italic + " | Mahdi Ben Rhouma",
  info.description,
);
export default function Page() {
  return <DirectoryPage kind="resources" locale="en" />;
}
