import type { BooksFormContextValue } from "./BooksFormContextValue"
import { createContext } from "react";

export const BooksFormContext = 
  createContext<BooksFormContextValue>({} as BooksFormContextValue)