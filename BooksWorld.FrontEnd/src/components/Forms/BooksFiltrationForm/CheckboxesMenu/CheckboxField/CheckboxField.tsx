import { CheckboxController } from "../../CheckboxController/CheckboxController"
import { useBooksSearchParams } from "../../../../../hooks/router/useBookSearchParams"
import "./checkboxField.scss"

type Props = {
  value: string
  image?: string
  icon?: string
  name: string
  // name: Record<string, string>
}

export default function CheckboxField({ value, image, icon, name } : Props) {
  // in future we need to unify icon and image 
  const { booksSearchParams } = useBooksSearchParams()

  return (
    <li className="checkbox-field">
      <CheckboxController 
        name={value}
        // defaultValue={booksSearchParams[value]} />
        defaultValue={Reflect.get(booksSearchParams, value)} />

      <div className="value"> 
        <p>{name}</p> 
        {icon && <i className={icon}></i>}
        {image && <img src={image} />}
      </div>
    </li>
  )
}