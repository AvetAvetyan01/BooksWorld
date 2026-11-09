import { type ReactNode } from "react"
import "./agreementField.scss"

export default function AgreementField({ children } : { children: ReactNode }) {
  return (
    <li className="agreement-field">
      <input type="checkbox" />

      <div className="content">
        {children}
      </div>
    </li>
  )
}