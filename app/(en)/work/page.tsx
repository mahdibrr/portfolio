import { DirectoryPage, directoryInfo } from "@/components/EcosystemPages";
import { metadataFor } from "@/lib/portfolio-seo";
const info = directoryInfo("work", "en");
export const metadata = metadataFor(
  "en",
  "/work/",
  info.title + " " + info.italic + " | Mahdi Ben Rhouma",
  info.description,
);
export default function Page() {
  return <DirectoryPage kind="work" locale="en" />;
}
