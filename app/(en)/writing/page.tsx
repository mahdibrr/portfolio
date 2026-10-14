import { DirectoryPage, directoryInfo } from "@/components/EcosystemPages";
import { metadataFor } from "@/lib/portfolio-seo";
const info = directoryInfo("writing", "en");
export const metadata = metadataFor(
  "en",
  "/writing/",
  info.title + " " + info.italic + " | Mahdi Ben Rhouma",
  info.description,
);
export default function Page() {
  return <DirectoryPage kind="writing" locale="en" />;
}
