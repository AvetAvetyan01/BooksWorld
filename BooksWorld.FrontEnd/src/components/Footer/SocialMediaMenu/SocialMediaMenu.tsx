import { useTranslation } from "react-i18next"
import SM_MenuData from "./socialMediaMenuData.json"
import "./socialMediaMenu.scss"

type SM_MenuData = {
  icon: string
  url: string
}

export default function SocialMediaMenu() {
  const { t } = useTranslation()

  return (
    <article className="sm-menu">
      <h4 className="title">{t(`footer.sm-menu.title`)}</h4>

      <ul className="sm-icons">
        {SM_MenuData.map((d: SM_MenuData) => 
          <li key={d.icon}><i className={d.icon}></i></li>)}
      </ul>
    </article>
  )
}