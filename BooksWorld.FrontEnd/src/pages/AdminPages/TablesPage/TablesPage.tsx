import { Outlet, useMatches, useNavigate } from "react-router"
import { DropdownMenu } from "../../../components/DropdownMenu/DropdownMenu"
import TablesMenuData from "./TablesMenuData.json"
import "./tablesPage.scss"

export function TablesPage() {
  const matches = useMatches()
  const navigate = useNavigate()

  const tableType = matches[matches.length - 1].pathname.split("/").at(-1)
  const menuClick = (page: string) => navigate(page)

  return (
    <section className="tables-page">
      <article className="tables-menu">
        <DropdownMenu 
          activeValue={tableType || TablesMenuData[0].value} 
          submit={menuClick}
          searchingTypesData={TablesMenuData} 
          translatable={true} />
      </article>

      <Outlet />
    </section>
  )
}
