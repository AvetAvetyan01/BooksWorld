import { useLanguage } from "../../../hooks/contexts/useLanguage"
import { Link } from "react-router"
import footerMenuData from "./footerMenuData.json"
import "./footerMenu.scss"

type FooterMenuItem = {
  url: string
  name: Record<string, string>
}

export default function FooterMenu() {
  const { language } = useLanguage()

  return (
    <ul className="footer-menu">
      {footerMenuData.map((d: FooterMenuItem) => 
        <li key={d.url}>
          <Link to={d.url}>{d.name[language]}</Link>
        </li>
      )}
    </ul>
  )
}
