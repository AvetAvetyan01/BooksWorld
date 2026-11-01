import type { IAuthor } from "../interfaces/entities/IAuthor";
import type { Language } from "../types/unions/Language"
import type { IGenre } from "../interfaces/entities/IGenre";
import type { IBook } from "../interfaces/entities/IBook"
import type { ICartBook } from "../interfaces/entities/ICartBook";

export function pickBookTitle(language: Language, book: IBook){
  switch(language)
  {
    case "Armenian": return book.title_AM;
    case "English":  return book.title_EN;
    case "Russian":  return book.title_RU;
    default: return book.description_EN;
  }
}
export function pickBookDescription(language: Language, book: IBook){
  switch(language)
  {
    case "Armenian": return book.description_AM;
    case "English":  return book.description_EN;
    case "Russian":  return book.description_RU;
    default: return book.description_EN;
  }
}
export function pickAuthorFullname(language: Language, author: IAuthor){
  switch(language)
  {
    case "Armenian": return author.fullName_AM;
    case "English":  return author.fullName_EN;
    case "Russian":  return author.fullName_RU;
    default: return author.autobiographical_EN;
  }
}
export function pickAuthorAutobiographical(language: Language, author: IAuthor){
  switch(language)
  {
    case "Armenian": return author.autobiographical_AM;
    case "English":  return author.autobiographical_EN;
    case "Russian":  return author.autobiographical_RU;
    default: return author.autobiographical_EN;
  }
}
export function pickGenreName(language: Language, genre: IGenre){
  switch(language)
  {
    case "Armenian": return genre.name_AM;
    case "English":  return genre.name_EN;
    case "Russian":  return genre.name_RU;
    default: return genre.name_EN;
  }
}
export function pickCartBookTitle(language: Language, cartBook: ICartBook){
  switch(language)
  {
    case "Armenian": return cartBook.bookTitle_AM;
    case "English":  return cartBook.bookTitle_EN;
    case "Russian":  return cartBook.bookTitle_RU;
    default: return cartBook.bookTitle_EN;
  }
}

