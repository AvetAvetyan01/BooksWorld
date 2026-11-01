import type { Language } from "../unions/Language"
// import type { Format } from "../unions/Format"

export type BooksRequest = {
  page: number
  size: number
  search?: string
  searchLanguage?: Language
  searchField?: 'Id' | 'Title' | 'ISBN'
  sortBy: 'Rating' | 'Newest'
  genreId:      number
  authorId?:    number 
  highRated:    boolean
  byAscending:  boolean
  discounted:   boolean
  paper:        boolean
  electronic:   boolean
  audio:        boolean
  armenian:     boolean
  english:      boolean
  russian:      boolean
  frence:       boolean
  german:       boolean
  italian:      boolean
  // languages?: Language[]
  // formats?: Format[]
} 