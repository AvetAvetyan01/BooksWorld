export type PagedCollection<T> = {
  page: number
  size: number
  pagesCount: number
  hasNext: boolean
  hasPrevious: boolean
  collection: T[]
}