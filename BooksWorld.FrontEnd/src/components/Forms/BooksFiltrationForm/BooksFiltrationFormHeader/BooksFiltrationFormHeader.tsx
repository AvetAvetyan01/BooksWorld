import { useBooksFilter } from "../../../../hooks/contexts/useBooksFilter"
import { useTranslation } from "react-i18next"
import "./booksFiltrationFormHeader.scss"

export function BooksFiltrationFormHeader(){
  const { t } = useTranslation()
  const { booksFilterIsOpen, setBooksFilterIsOpen } = useBooksFilter()

  return (
    <article className="books-filter-header">
      <h2 className="title">{t('pages.books.titles.header')}</h2>

      {booksFilterIsOpen && 
        <i onClick={() => setBooksFilterIsOpen(false)} 
          className={`fa-solid fa-xmark close-button ${booksFilterIsOpen ? `active` : ``}`}></i>}
    </article>
  )
}