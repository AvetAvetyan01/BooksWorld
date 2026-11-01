import LanguageDetector from "i18next-browser-languagedetector"
import Backend from "i18next-http-backend"
import i18n from "i18next"
import { initReactI18next } from "react-i18next"

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'English'
  })

export default i18n