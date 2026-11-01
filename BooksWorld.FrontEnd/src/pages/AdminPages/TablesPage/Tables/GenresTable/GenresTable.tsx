import type { GenresRequest } from "../../../../../types/requests/GenresRequest"
import { Link, useNavigate } from "react-router"
import { useTranslation } from "react-i18next"
import { pickGenreName } from "../../../../../utilities/languagePickers"
import { useLanguage } from "../../../../../hooks/contexts/useLanguage"
import { useGenres } from "../../../../../hooks/queries/genreQueries/useGenres"
import { useState } from "react"
import { Search } from "../../../../../components/Search/Search"
import { Pager } from "../../../../../components/Pager/Pager"
import genresSearchTypes from "./GenresSearchTypes.json"
import "./genresTable.scss"

export function GenresTable({ withActions } : { withActions?: boolean }){
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { language } = useLanguage()
  const [request, setRequset] = useState<GenresRequest>({ page: 1, size: 20 })
  const { data: genres } = useGenres(request)

  const onSearch = (
    searchString: string, 
    _searchType: string, // "Id" | "Name" 
    searchField: string,
    searchLanguage: string // enum
  ) => {
    setRequset({
      page: 1,
      size: request.size,
      search: searchString,
      searchField: searchField,
      searchLanguage: searchLanguage
    } as GenresRequest)
  }

  return (
    <>
      {withActions &&
        <div className="actions">
          <Link
            to={"/admin/config/genre"} 
            className="config-page-button"
            >
            <i className="fa-regular fa-plus"></i>
            <p>{t("pages.tables-page.create-button")}</p>
          </Link>

          <Search 
            onSearch={onSearch}
            searchTypes={genresSearchTypes} />
        </div>}

      <table className="genres-table">
        <thead>
          <tr>
            <th>{t("pages.genres-table.table-columns.id")}</th>
            <th>{t("pages.genres-table.table-columns.name")}</th>
          </tr>
        </thead>

        <tbody>
          {genres?.collection.map(genre => 
            <tr key={genre.id} onClick={() => navigate(`/admin/config/genre/${genre.id}`)}>
              <td>{genre.id}</td>
              <td className="name-column">{pickGenreName(language, genre)}</td>
            </tr>)}
        </tbody>
      </table>

      {genres &&
        <Pager 
          data={genres}
          submit={(newPage) => setRequset({...request, page: newPage})}/>}
    </>
  )
}