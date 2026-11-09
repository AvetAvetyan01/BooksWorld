import type { ReactNode } from "react"
import "./dataErrorContainer.scss"

type Props = {
  message: string
  children?: ReactNode
}

export function DataErrorContainer({ message, children } : Props){
  return (
    <div className="error-container">
      <div className="message">
        <i className="fa-regular fa-circle-xmark"></i>
        <p className="text">{message}</p>
      </div>
      
      {children}
    </div>
  )
}