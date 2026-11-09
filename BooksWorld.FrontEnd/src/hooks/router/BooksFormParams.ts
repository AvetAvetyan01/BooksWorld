// import { Language } from "../../types/unions/Language"
// import { Format } from "../../types/unions/Format"

export type BooksFormParams = {
  page: string
  size?: string
  search?: string
  // searchField?: 'Id' | 'Title' | 'ISBN'
  // sortBy?: 'Rating' | 'Newest' 
  // searchField: string
  sortBy: string
  authorId?: number
  genreId?: number
  
  highRated: string
  discounted: string
  byAscending: string
  paper: string
  audio: string
  electronic: string
  armenian: string
  english: string
  russian: string
  frence: string
  german: string
  italian: string
  // languages?: Language[]
  // formats?: Format[]
} 