import type { Metadata } from "next";
import HomeProfile from "@/components/home/home-profile";
import { getAllProjects } from "@/lib/getPostData";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: `${SITE_NAME} | ${SITE_TAGLINE}` },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
};
export default async function Home() {
  return <HomeProfile projects={await getAllProjects()} />;
}
