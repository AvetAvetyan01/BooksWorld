import type { Format } from "../../types/unions/Format";
import type { ISubbook } from "./ISubbook";

export interface ICartBook 
{
  id: number
  userId: string
  bookId: number
  subbookId: number
  quantity?: number
  discountPercent?: number
  bookFormat: Format
  bookImgUrl: string
  bookTitle_AM: string
  bookTitle_EN: string
  bookTitle_RU: string
  // bookTitle: Record<Language, string>
  subbook: ISubbook
}