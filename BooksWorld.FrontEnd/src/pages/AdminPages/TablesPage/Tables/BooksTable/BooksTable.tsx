import type { BooksRequest } from "../../../../../types/requests/BooksRequest"
import { Link, useNavigate } from "react-router"
import { useTranslation } from "react-i18next"
import { useBooks } from "../../../../../hooks/queries/bookQueries/useBooks"
import { useState } from "react"
import { Search } from "../../../../../components/Search/Search"
import { Pager } from "../../../../../components/Pager/Pager"
import FlagIcons from "../../../../../components/FlagIcons/FlagIcons"
import booksSearchTypes from "./BooksSearchTypes.json"
import "./booksTable.scss"

export function BooksTable({ withActions=false } : { withActions?: boolean }){
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [request, setRequset] = useState({ page: 1, size: 15 } as BooksRequest)
  const { data: books } = useBooks(request)

  const onSearch = (
    searchString: string, 
    _searchType: string, //'Id' | 'Title' | 'ISBN'
    searchField: string, 
    searchLanguage: string // Language
  ) => {
    setRequset({
      page: 1, //request.page,
      size: request.size,
      search: searchString,
      searchField: searchField,
      searchLanguage: searchLanguage
    } as BooksRequest)
  }
  
  // in future we will add checkbox controller for table rows
  return (
    <>  
      {withActions &&
        <div className="actions">
          <Link
            to={"/admin/config/book"} 
            className="config-page-button"
            >
            <i className="fa-regular fa-plus"></i>
            <p>{t("pages.tables-page.create-button")}</p>
          </Link>
          
          <Search 
            onSearch={onSearch}
            searchTypes={booksSearchTypes} />
        </div>}

      <table className="books-table">
        <thead>
          <tr>
            <th>{t("pages.books-table.table-columns.id")}</th>
            <th>{t("pages.books-table.table-columns.title")}</th>
            <th>{t("pages.books-table.table-columns.author")}</th>
            <th>{t("pages.books-table.table-columns.rating")}</th>
            <th>{t("pages.books-table.table-columns.formats")}</th>
            <th>{t("pages.books-table.table-columns.languages")}</th>
            <th>{t("pages.books-table.table-columns.discount")}</th>
          </tr>
        </thead>

        <tbody>
          {books?.collection?.map(book => 
            <tr key={book.id} onClick={() => navigate(`/admin/config/book/${book.id}`)}>
              <td className="id-column">{book.id}</td>
              <td className="title-column"><p className="text">{book.title}</p></td>
              <td className="author-column"><p className="text">{book.authorFullName}</p></td>
              <td className="rating-column">
                <div className="container">
                  <i className="fa-solid fa-star"></i>
                  <p>{book.rating}</p>
                </div>
              </td>
              
              <td className="formats-column">
                <ul><FlagIcons flags={book.formats}/></ul>
              </td>

              <td className="languages-column">
                <ul><FlagIcons flags={book.languages}/></ul>
              </td>
              
              <td className="discount-column">
                {book.discountPercent ? book.discountPercent + '%' : '-'}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {books && 
        <Pager 
          data={books} 
          submit={(newPage) => setRequset({...request, page: newPage})}/>}
    </>
  )
}