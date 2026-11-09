import { type ReactNode, useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";

export function ThemeProvider({ children } : { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>
    (() => JSON.parse(localStorage.getItem("theme")!) || "light")
  
  useEffect(() => localStorage.setItem("theme", JSON.stringify(theme)), 
  [theme])

  const value = {
    theme,
    setTheme
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}