import type { Format } from "../../types/unions/Format";
import type { Language } from "../../types/unions/Language";

export interface ISubbook 
{
  id: number
  bookId: number
  year: number
  language: Language
  format: Format
  price: number
  discountedPrice: number
  publisher: string
  filePath: string
  introductionFilePath: string
  details: Record<string, string>
}