import type { AuthorsRequest } from "../../../../../types/requests/AuthorsRequest"
import { useState } from "react"
import { useAuthors } from "../../../../../hooks/queries/authorQueries/useAuthors"
import { useTranslation } from "react-i18next"
import { Link, useNavigate } from "react-router"
import { Pager } from "../../../../../components/Pager/Pager"
import { Search } from "../../../../../components/Search/Search"
import authorsSearchTypes from "./AuthorsSearchTypes.json"
import "./authorsTable.scss"

export function AuthorsTable({ withActions } : { withActions?: boolean }){
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [request, setRequset] = useState<AuthorsRequest>({ page: 1, size: 15 })
  const { data: authors, isLoading } = useAuthors(request)
  
  const onSearch = (
    searchString: string, 
    _searchType: string, 
    searchField: string, 
    searchLanguage: string // Language
  ) => {
    setRequset({
      page: 1, //request.page,
      size: request.size,
      search: searchString,
      searchField: searchField,
      searchLanguage: searchLanguage
    } as AuthorsRequest)
  }

  if (!isLoading)
  return (
    <>
      {withActions &&
        <div className="actions">
          <Link 
            to={"/admin/config/author"} 
            className="config-page-button"
            >
            <i className="fa-regular fa-plus"></i>
            <p>{t("pages.tables-page.create-button")}</p>
          </Link>

          <Search 
            onSearch={onSearch}
            searchTypes={authorsSearchTypes} />
        </div>}

      <table className="authors-table">
        <thead>
          <tr>
            <th>{t("pages.authors-table.table-columns.id")}</th>
            <th>{t("pages.authors-table.table-columns.fullname")}</th>
          </tr>
        </thead>

        <tbody>
          {authors?.collection?.map(author => 
            <tr key={author.id} onClick={() => navigate(`/admin/config/author/${author.id}`)}>
              <td>{author.id}</td>
              <td className="name-column">{author.fullName}</td>
            </tr>)}
        </tbody>
      </table>
    
      {authors && 
        <Pager
          data={authors} 
          submit={(newPage) => setRequset({...request, page: newPage})}/>}
    </>      
  )
}