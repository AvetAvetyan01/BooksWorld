import { useContext } from "react";
import { LanguageContext } from "../../contextProviders/Language/LanguageContext";

export function useLanguage(){
  return useContext(LanguageContext)
}