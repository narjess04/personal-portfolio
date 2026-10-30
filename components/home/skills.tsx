"use client";
import { useLanguage } from "@/contexts/language-context";
import { skillGroups, strengths } from "@/lib/profile-translations";

export function Skills() {
  const { t } = useLanguage();
  return (
    <section
      aria-labelledby="skills-title"
      className="mt-12 border-t border-slate-200 pt-10 dark:border-slate-800"
    >
      <h2
        id="skills-title"
        className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400"
      >
        {t("Compétences techniques", "Hard Skills")}
      </h2>
      <div className="mt-5 space-y-5">
        {skillGroups.map((group) => (
          <div key={group.en}>
            <h3 className="mb-2 text-sm font-medium text-slate-900 dark:text-white">
              {t(group.fr, group.en)}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                >
                  {skill === "Agents IA / AI agents"
                    ? t("Agents IA", "AI agents")
                    : skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <h2 className="mt-10 text-sm font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
        {t("Points forts", "Core Strengths")}
      </h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {strengths.map((strength) => (
          <article
            key={strength.en}
            className="rounded-xl border border-slate-200 p-4 dark:border-slate-800"
          >
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              {t(strength.fr, strength.en)}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              {t(strength.detailFr, strength.detailEn)}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
