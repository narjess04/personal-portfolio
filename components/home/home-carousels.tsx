"use client";

import { useLanguage } from "@/contexts/language-context";
import { localizeProject } from "@/lib/project-translations";
import { useState } from "react";
import Link from "next/link";
import { Github, Pause, Play } from "lucide-react";

interface ProjectCard {
  slug: string;
  title: string;
  description: string;
  categories: string[];
  github?: string;
}

export function ProjectCarousel({ projects }: { projects: ProjectCard[] }) {
  const { language, t } = useLanguage();
  const translatedProjects = projects.map((project) =>
    localizeProject(project, language),
  );
  const [paused, setPaused] = useState(false);
  if (projects.length === 0) return null;

  const cards = (duplicate: boolean) => (
    <div
      className={`project-carousel-group ${duplicate ? "project-carousel-copy" : ""}`}
      aria-hidden={duplicate || undefined}
      inert={duplicate || undefined}
    >
      {translatedProjects.map((project) => (
        <article
          key={project.slug}
          className="flex w-72 shrink-0 flex-col rounded-xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-lg dark:border-slate-800 dark:bg-slate-950"
        >
          <h3 className="font-semibold text-slate-900 dark:text-white">
            <Link
              href={`/projects/${project.slug}`}
              className="hover:underline"
            >
              {project.title}
            </Link>
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
            {project.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.categories.map((category) => (
              <span
                key={category}
                className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                {category}
              </span>
            ))}
          </div>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-medium text-slate-700 hover:underline dark:text-slate-300"
            >
              <Github className="h-4 w-4" />
              {t("Voir le code", "View code")}
            </a>
          )}
        </article>
      ))}
    </div>
  );

  return (
    <section
      aria-labelledby="projects-title"
      className="mt-12 border-t border-slate-200 pt-10 dark:border-slate-800"
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <h2
          id="projects-title"
          className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400"
        >
          {t("Projets sélectionnés", "Selected Projects")}
        </h2>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setPaused(!paused)}
            aria-pressed={paused}
            aria-label={
              paused
                ? t(
                    "Reprendre le défilement des projets",
                    "Resume project scrolling",
                  )
                : t(
                    "Mettre le défilement des projets en pause",
                    "Pause project scrolling",
                  )
            }
            className="project-carousel-toggle inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-xs text-slate-600 dark:border-slate-700 dark:text-slate-300"
          >
            {paused ? (
              <Play className="h-3.5 w-3.5" />
            ) : (
              <Pause className="h-3.5 w-3.5" />
            )}
            {paused ? t("Reprendre", "Resume") : t("Pause", "Pause")}
          </button>
          <Link
            href="/projects"
            className="text-sm text-slate-600 underline underline-offset-4 dark:text-slate-400"
          >
            {t("Tous les projets", "All projects")}
          </Link>
        </div>
      </div>
      <div
        className="project-carousel-viewport rounded-xl"
        role="region"
        aria-label={t("Carrousel des projets", "Project carousel")}
        tabIndex={0}
        data-paused={paused}
      >
        <div className="project-carousel-track">
          {cards(false)}
          {cards(true)}
        </div>
      </div>
    </section>
  );
}
