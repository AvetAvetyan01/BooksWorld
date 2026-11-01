export type BooksUrlParams = {
  page:           number
  size:           number 
  genreId:        number
  authorId:       number | null
  search:         string 
  searchField:    string 
  searchLanguage: string | null
  sortBy:         string | null
  byAscending:    boolean
  highRated:      boolean
  discounted:     boolean
  paper:          boolean
  electronic:     boolean
  audio:          boolean
  armenian:       boolean
  english:        boolean
  russian:        boolean
  frence:         boolean
  german:         boolean
  italian:        boolean
}