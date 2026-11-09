export interface IBookCard
{
  id:               number
  imagePath:        string
  title:            string
  authorId:         number
  authorFullName:   string
  rating:           number
  discountPercent?: number
  languages:        string
  formats:          string  
}
