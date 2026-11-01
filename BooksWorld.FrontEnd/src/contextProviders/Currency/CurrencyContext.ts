import { createContext } from "react";
import type { CurrencyContextValue } from "./CurrencyContextValue"

export const CurrencyContext = 
  createContext<CurrencyContextValue>({} as CurrencyContextValue)