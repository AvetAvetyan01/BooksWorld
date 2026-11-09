import { useEffect, useState, type ReactNode } from "react";
import { WindowSizeContext } from "./WindowSizeContext";

export function WindowSizeProvider({ children } : { children: ReactNode }){
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)

  const changeWindowSize = () => {
    setWindowWidth(window.innerWidth)
    setWindowHeight(window.innerHeight)
  }

  useEffect(() => {
    window.addEventListener("resize", changeWindowSize)

    return () => window.removeEventListener("resize", changeWindowSize)
  },[])

  return (
    <WindowSizeContext.Provider value={{ windowWidth, windowHeight }}>
      {children}
    </WindowSizeContext.Provider>
  )
}