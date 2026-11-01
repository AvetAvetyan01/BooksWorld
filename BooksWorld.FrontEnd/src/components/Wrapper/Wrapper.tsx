import { useEffect, type ReactNode } from "react"
import "./wrapper.scss"

type Props = {
  children: ReactNode
  isActive: boolean
  closer: () => void,
}

export function Wrapper({ children, closer, isActive } : Props){
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key == "Escape") closer() } 

    window.addEventListener("keydown", handleKeyDown)

    return () => window.removeEventListener("keydown", handleKeyDown) 
  }, 
  [closer])

  // we need to write 'afterCloser' method for cleaning 
  // after wrapper if it need
  return (
    <section 
      id="wrapper"
      onClick={closer} 
      className={`wrapper ${isActive ? `active` : ''}`}>
      {children}
    </section>
  )
}