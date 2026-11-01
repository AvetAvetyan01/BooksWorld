import { type ReactNode, useEffect, useState } from "react"
import type { Language } from "../../types/unions/Language"
import { LanguageContext } from "./LanguageContext"
import { useTranslation } from "react-i18next"

export function LanguageProvider({ children } : { children: ReactNode }){
  const { i18n } = useTranslation()
  const [language, setLanguage] = useState<Language>(
    () => JSON.parse(localStorage.getItem("language")!) || "English")

  useEffect(() => {
    localStorage.setItem("language", JSON.stringify(language))
    i18n.changeLanguage(language.toString())
  }, 
  [i18n, language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}