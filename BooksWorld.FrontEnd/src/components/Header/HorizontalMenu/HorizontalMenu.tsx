import { useLanguage } from "../../../hooks/contexts/useLanguage"
import { NavLink } from "react-router"
import horizontalMenuData from "./HorizontalMenuData.json"
import "./horizontalMenu.scss"

type Props = {
  url: string
  name: Record<string, string>
}

export default function HorizontalMenu(){
  const { language } = useLanguage()

  return (
    <ul className="horizontal-menu">
      {horizontalMenuData.map((data : Props) =>
        <li key={data.name[language]}>
          <NavLink to={data.url}>{data.name[language]}</NavLink>
        </li>
      )}
    </ul>
  )
}