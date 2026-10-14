import { notFound } from "next/navigation";
import { SourceProjectPage } from "@/components/EcosystemPages";
import { sourceProjects } from "@/lib/ecosystem";
import { metadataFor } from "@/lib/portfolio-seo";
export const dynamicParams = false;
export function generateStaticParams() {
  return sourceProjects.map((project) => ({ slug: project.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = sourceProjects.find((project) => project.slug === slug);
  if (!project) notFound();
  return metadataFor(
    "fr",
    "/open-source/" + slug + "/",
    project.name + " — " + project.lead["fr"] + " | Mahdi Ben Rhouma",
    project.summary["fr"],
  );
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = sourceProjects.find((project) => project.slug === slug);
  if (!project) notFound();
  return <SourceProjectPage project={project} locale="fr" />;
}
