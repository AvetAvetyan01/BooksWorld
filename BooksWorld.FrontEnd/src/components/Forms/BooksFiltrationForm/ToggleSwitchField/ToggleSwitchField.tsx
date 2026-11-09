import { useBooksSearchParams } from "../../../../hooks/router/useBookSearchParams"
import { CheckboxController } from "../CheckboxController/CheckboxController"
import "./toggleSwitchField.scss"

type Props = {
  icon: string
  value: string
  name: string
}

export function ToggleSwitchField({ name, icon, value }: Props) {
  const { booksSearchParams } = useBooksSearchParams()
  
  return (
    <li className="toggle-switch">
      <div className="name-container">
        <i className={icon}></i>
        <p className="name">{name}</p>
      </div>
        
      <CheckboxController 
        name={value} 
        // defaultValue={booksSearchParams[value]}/>
        defaultValue={Reflect.get(booksSearchParams, value)}/>
    </li>
  )
}