import type { LanguageContextValue } from "./LanguageContextValue"
import { createContext } from "react";

export const LanguageContext = 
  createContext<LanguageContextValue>({} as LanguageContextValue) 