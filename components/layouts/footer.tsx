"use client";
import { useLanguage } from "@/contexts/language-context";
export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-8 text-sm text-slate-600 dark:text-slate-400">
        <p>
          © {new Date().getFullYear()} Narjess Ben Romdhane.{" "}
          {t("Tous droits réservés.", "All rights reserved.")}
        </p>
      </div>
    </footer>
  );
}
