import { useRouter } from "next/router";
import { JaTexts } from "../locales/ja";
import { EnTexts } from "../locales/en";
import { useEffect } from "react";

export const useTranslate = () => {
  const { locale } = useRouter();
  useEffect(() => {
    document.cookie = `locale=${locale}`;
  }, []);
  return locale === "ja" ? JaTexts : EnTexts;
};
