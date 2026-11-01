import { createContext } from "react";
import type { WindowSizeContextValue } from "./WindowSizeContextValue"

export const WindowSizeContext = 
  createContext<WindowSizeContextValue>({} as WindowSizeContextValue)