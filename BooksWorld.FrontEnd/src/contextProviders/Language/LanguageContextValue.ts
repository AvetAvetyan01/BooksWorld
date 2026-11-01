import type { Language } from "../../types/unions/Language"

export type LanguageContextValue = {
  language: Language,
  setLanguage: (language: Language) => void
}