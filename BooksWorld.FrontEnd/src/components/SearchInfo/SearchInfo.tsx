import { useTranslation } from "react-i18next"
import "./searchInfo.scss"

export function SearchInfo({ searchString } : { searchString?: string }){
  const { t } = useTranslation()

  return searchString && searchString.trim()?.length > 0 && (
    <div className="search-info">
      <p className="text">{t("search-info.description")}</p>
      <p className="value">{searchString}</p>
    </div>
  )
}