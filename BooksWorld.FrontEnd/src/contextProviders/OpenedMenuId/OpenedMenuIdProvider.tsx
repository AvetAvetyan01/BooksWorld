import { OpenedMenuIdContext } from "./OpenedMenuIdContext";
import { type ReactNode, useState } from "react";

export function OpenedMenuIdProvider({ children } : { children: ReactNode }){
  const [openedMenuId, setOpenedMenuId] = useState<number | null>(null)

  const value = { openedMenuId, setOpenedMenuId }

  return (
    <OpenedMenuIdContext.Provider value={value}>
      {children}
    </OpenedMenuIdContext.Provider>
  )
}