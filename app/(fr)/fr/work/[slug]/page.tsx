import { notFound } from "next/navigation";
import { ProjectPage } from "@/components/PortfolioPages";
import { projects, getProject } from "@/lib/portfolio";
import { projectMetadata } from "@/lib/portfolio-seo";
export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return projectMetadata(project, "fr");
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return <ProjectPage project={project} locale="fr" />;
}
