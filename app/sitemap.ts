import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/getPostData";
import { getLastModified, getSiteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const projects = await getAllProjects();
  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...projects.map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      lastModified: getLastModified(project.post_date, project.update_date),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
