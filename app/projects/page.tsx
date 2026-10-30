import type { Metadata } from "next";
import { getAllProjects, getProjectCategories } from "@/lib/getPostData";
import ProjectsClient from "@/components/post-clients/projects-client";
import { DEFAULT_OG_IMAGE, SITE_NAME } from "@/lib/seo";

const PROJECTS_DESCRIPTION = "Les projets de Narjess Ben Romdhane.";

export const metadata: Metadata = {
  title: "Projets",
  description: PROJECTS_DESCRIPTION,
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: `Projects | ${SITE_NAME}`,
    description: PROJECTS_DESCRIPTION,
    type: "website",
    url: "/projects",
    siteName: SITE_NAME,
    images: [{ url: DEFAULT_OG_IMAGE, alt: `Projects | ${SITE_NAME}` }],
  },
};

interface ProjectsPageProps {
  searchParams?:
    { page?: string | string[] } | Promise<{ page?: string | string[] }>;
}

function parsePageParam(pageParam: string | string[] | undefined): number {
  const value = Array.isArray(pageParam) ? pageParam[0] : pageParam;
  const parsed = Number.parseInt(value ?? "1", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

export default async function ProjectsPage({
  searchParams,
}: ProjectsPageProps) {
  // Get data from JSON files on the server
  const projects = await getAllProjects();
  if (projects.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
          Projets
        </h1>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Mes projets seront ajoutés prochainement.
        </p>
      </main>
    );
  }
  const categories = await getProjectCategories();
  const resolvedSearchParams = searchParams
    ? await Promise.resolve(searchParams)
    : undefined;
  const initialPage = parsePageParam(resolvedSearchParams?.page);

  return (
    <ProjectsClient
      projects={projects}
      categories={categories}
      initialPage={initialPage}
    />
  );
}
