import { createContext } from "react";
import type { OpenedMenuIdContextValue } from "./OpenedMenuIdContextValue"

export const OpenedMenuIdContext = 
  createContext<OpenedMenuIdContextValue>({} as OpenedMenuIdContextValue)