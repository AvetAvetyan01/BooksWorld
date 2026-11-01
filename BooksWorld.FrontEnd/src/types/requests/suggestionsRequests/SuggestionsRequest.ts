import type { Language } from "../../unions/Language"

export type SuggestionsRequest = {
  search: string,
  searchType: string
  searchLanguage: Language
  // searchLanguage: string
  size: number
}