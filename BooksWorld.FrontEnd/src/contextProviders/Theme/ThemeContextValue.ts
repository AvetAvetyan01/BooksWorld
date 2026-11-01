import { type Dispatch, type SetStateAction } from "react"

export type ThemeContextValue = {
  theme: 'light' | 'dark',
  setTheme: Dispatch<SetStateAction<'light' | 'dark'>>
}