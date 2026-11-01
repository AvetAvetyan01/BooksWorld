import { useTranslation } from "react-i18next"
import FlagIcons from "../../../../../../components/FlagIcons/FlagIcons"
import type { ISubbook } from "../../../../../../interfaces/entities/ISubbook"
import "./subbooksTable.scss"

type Props = {
  subbooks: ISubbook[]
  onClick: (subbook: ISubbook) => void
}

export function SubbooksTable({ subbooks, onClick } : Props){
  const { t } = useTranslation()

  return (
    <table className="subbooks-table">
      <thead>
        <tr>
          <th>{t("pages.books-table.subbooks-table.id")}</th>
          <th>{t("pages.books-table.subbooks-table.publisher")}</th>
          <th>{t("pages.books-table.subbooks-table.year")}</th>
          <th>{t("pages.books-table.subbooks-table.price")}</th>
          <th>{t("pages.books-table.subbooks-table.format")}</th>
          <th>{t("pages.books-table.subbooks-table.language")}</th>
        </tr>
      </thead>

      <tbody>
        {subbooks?.map(subbook => 
          <tr key={subbook.id} onClick={() => onClick(subbook)}>
            <td className="id-column">{subbook.id}</td>
            <td className="publisher-column">{subbook.publisher}</td>
            <td className="year-column">{subbook.year}</td>
            <td className="price-column">{subbook.price}</td>

            <td className="format-column">
              <div>
                <ul><FlagIcons flags={subbook.format} /></ul>
                <p>{subbook.format}</p>
              </div>
            </td>

            <td className="language-column">
              <div>
                <ul><FlagIcons flags={subbook.language}/></ul>
                <p>{subbook.language}</p>
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}