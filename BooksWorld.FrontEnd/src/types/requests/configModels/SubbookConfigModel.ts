import type { Format } from "../../../types/unions/Format"
import type { Language } from "../../../types/unions/Language"

export type SubbookConfigModel = {
  Id?:        number
  BookId:     number
  Publisher:  string
  Language:   Language
  Format:     Format
  Price:      number
  Year:       number
  File?:      File
  IntroductionFile?: File
  Details: {
    Quantity?:    number
    PagesCount?:  number
    Duration?:    string
    Reader?:      string
  }
}