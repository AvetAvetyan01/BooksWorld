import type { Language } from "../unions/Language"

export type GenresRequest = {
  page: number
  size: number
  // baseId: number
  search?: string
  searchLanguage?: Language
  searchField?: 'Id' | 'Name'
}