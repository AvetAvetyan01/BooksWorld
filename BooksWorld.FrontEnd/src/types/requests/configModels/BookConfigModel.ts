export type BookConfigModel = {
  Id: number
  // Title: Record<Language, string>
  // Description: Record<Language, string>
  Title_AM:string
  Title_EN:string
  Title_RU:string
  Description_AM: string
  Description_EN: string
  Description_RU: string
  GenreId: number
  AuthorId: number
  Image?: File
  DiscountPercent?: number  
  DiscountDeadline?: Date
}