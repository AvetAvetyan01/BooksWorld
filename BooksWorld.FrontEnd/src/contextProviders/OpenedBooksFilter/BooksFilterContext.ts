import { createContext } from "react";
import type { BooksFilterContextValue } from "./BooksFilterContextValue"

export const BooksFilterContext = 
  createContext<BooksFilterContextValue>({} as BooksFilterContextValue)