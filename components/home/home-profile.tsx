"use client";
import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { ProjectCarousel } from "@/components/home/home-carousels";
import { Skills } from "@/components/home/skills";
import { useLanguage } from "@/contexts/language-context";
import { experienceFr, educationFr } from "@/lib/profile-data";
import { experienceEn, educationEn } from "@/lib/profile-translations";
import type { Project } from "@/lib/getPostData";

export default function HomeProfile({ projects }: { projects: Project[] }) {
  const { language, t } = useLanguage();
  const experience = language === "fr" ? experienceFr : experienceEn;
  const education = language === "fr" ? educationFr : educationEn;

  return (
    <main className="mx-auto max-w-3xl px-6 pt-12 md:pt-10">
      <section className="text-center" aria-labelledby="profile-title">
        <div className="relative mx-auto mb-6 h-32 w-32 overflow-hidden rounded-full bg-slate-100 ring-4 ring-white dark:bg-slate-800 dark:ring-slate-950 md:h-36 md:w-36">
          <Image
            src="/narjess-profile.jpg"
            alt={t(
              "Portrait de Narjess Ben Romdhane",
              "Portrait of Narjess Ben Romdhane",
            )}
            width={992}
            height={1057}
            priority
            sizes="376px"
            className="absolute h-auto max-w-none"
            style={{ width: "261.05%", left: "-80.53%", top: "-97.37%" }}
          />
        </div>
        <h1
          id="profile-title"
          className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white md:text-4xl"
        >
          Narjess Ben Romdhane
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          {t(
            "Ingénieure Data Science & IA · Diplômée ESPRIT",
            "Data Science & AI Engineer · ESPRIT Graduate",
          )}
        </p>
        <div className="mx-auto mt-6 max-w-2xl space-y-3 text-pretty text-slate-700 dark:text-slate-300">
          <p>
            {t(
              "Ce qui me passionne et me passionnera toujours, c'est de voir une simple idée se transformer en un outil concret dont quelqu'un se sert vraiment. C’est ce moteur qui alimente ma curiosité et mon envie d'apprendre au quotidien.",
              "What excites me and always will is seeing a simple idea become a practical tool that someone actually uses. That is what fuels my curiosity and my desire to learn every day.",
            )}
          </p>
          <p>
            <Link href="/projects" className="underline underline-offset-4 transition-colors hover:text-slate-900 dark:hover:text-white">
              {t("N'hésitez pas à explorer mes projets.", "Feel free to explore my projects.")}
            </Link>
          </p>
        </div>
        <div
          className="mx-auto mt-7 flex max-w-md flex-nowrap items-center justify-center gap-1.5"
          aria-label={t("Liens de contact et CV", "Contact links and CV")}
        >
          {[
            {
              href: "https://github.com/narjess04",
              label: "GitHub",
              Icon: Github,
            },
            {
              href: "/CV_Narjess_Ben_Romdhane.pdf",
              label: "CV",
              Icon: FileText,
            },
            {
              href: "https://www.linkedin.com/in/narjess-ben-romdhane/",
              label: "LinkedIn",
              Icon: Linkedin,
            },
            {
              href: "mailto:narjess.benromdhane@esprit.tn",
              label: t("E-mail", "Email"),
              Icon: Mail,
            },
          ].map(({ href, label, Icon }) => (
            <a
              key={href}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={
                href.startsWith("mailto:") ? undefined : "noopener noreferrer"
              }
              className="inline-flex min-w-0 flex-1 items-center justify-center gap-1 whitespace-nowrap rounded-full border border-slate-300 px-1 py-2.5 text-[11px] font-medium text-slate-700 transition-colors hover:bg-slate-100 min-[400px]:px-2 sm:gap-2 sm:text-sm dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-900"
            >
              <Icon className="hidden h-4 w-4 shrink-0 min-[360px]:block" />
              {label}
            </a>
          ))}
        </div>
      </section>
      <ProjectCarousel projects={projects} />
      <section
        id="stages"
        aria-labelledby="stages-title"
        className="mt-12 scroll-mt-40 border-t border-slate-200 pt-10 dark:border-slate-800"
      >
        <h2
          id="stages-title"
          className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400"
        >
          {t("Expérience professionnelle", "Professional Experience")}
        </h2>
        <div className="mt-5">
          {experience.map((item) => (
            <article
              key={item.company}
              className="border-b border-slate-200 py-6 last:border-b-0 dark:border-slate-800"
            >
              <h3 className="font-semibold text-slate-900 dark:text-white">
                {item.role}
              </h3>
              <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                {item.company}
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {item.period} · {item.location}
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600 dark:text-slate-400">
                {item.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
      <section
        id="formation"
        aria-labelledby="formation-title"
        className="mt-12 scroll-mt-40 border-t border-slate-200 pt-10 dark:border-slate-800"
      >
        <h2
          id="formation-title"
          className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400"
        >
          {t("Formation", "Education")}
        </h2>
        <div className="relative mt-5">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-2 left-2 top-2 w-px bg-gradient-to-b from-slate-300 via-slate-200 to-transparent dark:from-slate-600 dark:via-slate-700"
          />
          {education.map((item) => (
            <article
              key={item.degree}
              className="group relative border-b border-slate-200 py-5 pl-8 last:border-b-0 dark:border-slate-800"
            >
              <span
                aria-hidden="true"
                className="absolute left-2 top-[22px] inline-flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full bg-white ring-1 ring-slate-300 dark:bg-slate-950 dark:ring-slate-600"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-slate-500" />
              </span>
              <h3 className="text-[15px] font-medium text-slate-900 dark:text-white">
                {item.degree}
              </h3>
              <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                {item.school}
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {item.period}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                {item.summary}
              </p>
            </article>
          ))}
        </div>
      </section>
      <Skills />
    </main>
  );
}
