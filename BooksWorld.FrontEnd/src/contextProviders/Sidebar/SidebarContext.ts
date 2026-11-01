import { createContext } from "react";
import type { SidebarContextValue } from "./SidebarContextValue"

export const SidebarContext = 
  createContext<SidebarContextValue>({} as SidebarContextValue)