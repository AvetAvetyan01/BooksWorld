import type { ISubbook } from "./ISubbook";
import type { IAuthor } from "./IAuthor";
import type { IGenre } from "./IGenre";

export interface IBook 
{
  id:                 number
  imageUrl:           string
  imagePath:          string
  title_AM:           string
  title_EN:           string
  title_RU:           string
  description_AM:     string
  description_EN:     string
  description_RU:     string
  // title:              Record<Language, string>,
  // description:        Record<Language, string>
  rating:             number
  gradesCount:        number
  discountPercent?:   number 
  discountDeadline?:  Date
  languages:          string // Language[]
  formats:            string // Format[]
  author:             IAuthor
  genre:              IGenre
  subbooks:           ISubbook[]
}