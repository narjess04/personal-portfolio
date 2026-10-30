import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetail from "@/components/post-clients/project-detail";

import { getAllProjects, getProject } from "@/lib/getPostData";
import {
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  absoluteUrl,
  getFirstMarkdownImage,
  getLastModified,
  getSiteUrl,
  parseContentDate,
} from "@/lib/seo";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return {};
  }

  const cover =
    project.cover || getFirstMarkdownImage(project.content) || DEFAULT_OG_IMAGE;
  const images = [{ url: cover, alt: project.title }];

  return {
    title: project.title,
    description: project.description,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      url: `/projects/${project.slug}`,
      publishedTime: project.post_date,
      modifiedTime: project.update_date,
      authors: [project.author],
      tags: project.categories,
      siteName: SITE_NAME,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [cover],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const siteUrl = getSiteUrl();
  const canonical = `${siteUrl}/projects/${project.slug}`;
  const cover =
    project.cover || getFirstMarkdownImage(project.content) || DEFAULT_OG_IMAGE;
  const published = parseContentDate(project.post_date);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "@id": `${canonical}#project`,
      name: project.title,
      headline: project.title,
      description: project.description,
      url: canonical,
      mainEntityOfPage: canonical,
      inLanguage: "fr",
      datePublished: (published ?? new Date()).toISOString(),
      dateModified: getLastModified(
        project.post_date,
        project.update_date,
      ).toISOString(),
      keywords: [...project.categories, ...project.technologies].join(", "),
      image: [absoluteUrl(cover)],
      author: { "@type": "Person", name: project.author, url: siteUrl },
      publisher: { "@id": `${siteUrl}/#person` },
      ...(project.demo ? { sameAs: [project.demo] } : {}),
      ...(project.github ? { codeRepository: project.github } : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
        {
          "@type": "ListItem",
          position: 2,
          name: "Projects",
          item: `${siteUrl}/projects`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: project.title,
          item: canonical,
        },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectDetail project={project} />
    </main>
  );
}
