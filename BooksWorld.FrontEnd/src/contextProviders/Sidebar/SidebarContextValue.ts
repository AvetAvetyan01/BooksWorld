import { type Dispatch, type SetStateAction } from "react"

export type SidebarContextValue = {
  sidebarIsOpen: boolean,
  setSidebarIsOpen: Dispatch<SetStateAction<boolean>>
}