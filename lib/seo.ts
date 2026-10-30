export const SITE_NAME = "Narjess Ben Romdhane";
export const SITE_AUTHOR = "Narjess Ben Romdhane";
export const SITE_TAGLINE = "Jeune diplômée en Data Science";
export const SITE_DESCRIPTION =
  "Portfolio de Narjess Ben Romdhane, jeune diplômée ESPRIT en 2026. Prépa Mathématiques–Physique de 2021 à 2023, puis cycle ingénieur en Data Science de 2023 à 2026.";
export const DEFAULT_OG_IMAGE = "/profile.svg";

export function getSiteUrl() {
  const rawUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    "http://localhost:3000";

  const url = rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`;
  return url.replace(/\/+$/, "");
}

export function absoluteUrl(pathOrUrl: string) {
  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }

  return `${getSiteUrl()}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

export function getFirstMarkdownImage(content: string) {
  const match = content.match(/!\[[^\]]*\]\((https?:\/\/[^)\s]+)\)/i);
  return match?.[1];
}

// Content dates are hand-written and not always zero-padded ("2026-1-18"),
// so normalize before handing them to Date/sitemap consumers.
export function parseContentDate(value?: string): Date | undefined {
  if (!value) {
    return undefined;
  }

  const parts = value.trim().split("-");
  const normalized =
    parts.length === 3
      ? `${parts[0]}-${parts[1].padStart(2, "0")}-${parts[2].padStart(2, "0")}`
      : value;

  const date = new Date(normalized);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

// A few entries have an update_date older than their post_date; take the later one.
export function getLastModified(postDate?: string, updateDate?: string) {
  const dates = [
    parseContentDate(postDate),
    parseContentDate(updateDate),
  ].filter((date): date is Date => Boolean(date));

  if (dates.length === 0) {
    return new Date();
  }

  return new Date(Math.max(...dates.map((date) => date.getTime())));
}
