import type { Dispatch, SetStateAction } from "react"

export type OpenedMenuIdContextValue = {
  openedMenuId: number | null,
  setOpenedMenuId: Dispatch<SetStateAction<number | null>>
}