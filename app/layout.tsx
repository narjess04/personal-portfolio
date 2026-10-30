import type React from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { LanguageProvider } from "@/contexts/language-context";
import { Geist, Geist_Mono } from "next/font/google";

import { ThemeProvider, themeInitScript } from "../contexts/theme-context";
import MainLayout from "../components/layouts/main-layout";
import {
  DEFAULT_OG_IMAGE,
  SITE_AUTHOR,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  absoluteUrl,
  getSiteUrl,
} from "../lib/seo";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

const siteUrl = getSiteUrl();
const defaultTitle = `${SITE_NAME} | ${SITE_TAGLINE}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  icons: { icon: "/icon", apple: "/icon" },
  authors: [{ name: SITE_AUTHOR, url: siteUrl }],
  creator: SITE_AUTHOR,
  publisher: SITE_AUTHOR,
  keywords: [
    "Narjess Ben Romdhane",
    "ESPRIT",
    "jeune diplômée",
    "portfolio",
    "Tunisie",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: defaultTitle,
    description: SITE_DESCRIPTION,
    type: "website",
    siteName: SITE_NAME,
    locale: "fr_FR",
    images: [{ url: DEFAULT_OG_IMAGE, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteUrl}/#person`,
  name: SITE_AUTHOR,
  url: siteUrl,
  image: absoluteUrl(DEFAULT_OG_IMAGE),
  jobTitle: "Jeune diplômée en Data Science",
  sameAs: [
    "https://github.com/narjess04",
    "https://www.linkedin.com/in/narjess-ben-romdhane/",
  ],
  email: "mailto:narjess.benromdhane@esprit.tn",
  description: SITE_DESCRIPTION,

  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "ESPRIT - Private Higher School of Engineering and Technology",
    },
    { "@type": "CollegeOrUniversity", name: "ESPRIT Prépa" },
  ],
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: SITE_NAME,
  url: siteUrl,
  description: SITE_DESCRIPTION,
  inLanguage: "fr",
  publisher: { "@id": `${siteUrl}/#person` },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const language =
    (await cookies()).get("portfolio-language")?.value === "en" ? "en" : "fr";
  return (
    <html lang={language} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([personJsonLd, siteJsonLd]),
          }}
        />

        <ThemeProvider>
          <LanguageProvider initialLanguage={language}>
            <MainLayout>{children}</MainLayout>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
