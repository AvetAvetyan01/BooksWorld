import { useState, type ReactNode } from "react";
import { BooksFilterContext } from "./BooksFilterContext";

export function BooksFilterProvider({ children } : { children: ReactNode }){
  const [booksFilterIsOpen, setBooksFilterIsOpen] = useState(false)

  return (
    <BooksFilterContext.Provider value={{ booksFilterIsOpen, setBooksFilterIsOpen }}>
      {children}
    </BooksFilterContext.Provider>
  )
}