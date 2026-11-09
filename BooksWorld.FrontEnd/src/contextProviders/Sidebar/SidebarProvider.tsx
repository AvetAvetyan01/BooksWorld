import { type ReactNode, useState } from "react";
import { SidebarContext } from "./SidebarContext";

export function SidebarProvider({ children } : { children: ReactNode }){
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false)

  const value = {
    sidebarIsOpen,
    setSidebarIsOpen
  }

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  )
}