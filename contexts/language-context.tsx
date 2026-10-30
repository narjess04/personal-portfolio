"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Language = "fr" | "en";
const LanguageContext = createContext<{
  language: Language;
  setLanguage: (language: Language) => void;
  t: (fr: string, en: string) => string;
}>({ language: "fr", setLanguage: () => {}, t: (fr) => fr });

export function LanguageProvider({
  children,
  initialLanguage,
}: {
  children: ReactNode;
  initialLanguage: Language;
}) {
  const [language, updateLanguage] = useState<Language>(initialLanguage);
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);
  const setLanguage = (next: Language) => {
    updateLanguage(next);
    document.cookie = `portfolio-language=${next}; Path=/; Max-Age=31536000; SameSite=Lax`;
  };
  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: (fr, en) => (language === "fr" ? fr : en),
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
export const useLanguage = () => useContext(LanguageContext);
