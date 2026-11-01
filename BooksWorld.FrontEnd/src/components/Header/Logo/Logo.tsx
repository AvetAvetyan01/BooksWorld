import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import "./logo.scss"

export default function Logo(){
  const { t } = useTranslation()

  return (
    <Link to="/" className="logo">
      <i className="fa-solid fa-book-open"></i>
      <p>{t("header.logo")}</p>
    </Link>
  )
}