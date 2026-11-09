import type { Language } from "../unions/Language"

export type AuthorsRequest = {
  page: number
  size: number
  search?: string
  searchField?: 'Id' | 'FullName'
  searchLanguage?: Language
}