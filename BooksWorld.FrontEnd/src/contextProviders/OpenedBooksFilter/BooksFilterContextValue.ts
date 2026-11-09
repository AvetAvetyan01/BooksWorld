import type { Dispatch, SetStateAction } from "react";

export type BooksFilterContextValue = {
  booksFilterIsOpen: boolean
  setBooksFilterIsOpen: Dispatch<SetStateAction<boolean>>
}