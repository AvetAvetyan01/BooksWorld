import { BooksFiltrationForm } from "../../components/Forms/BooksFiltrationForm/BooksFiltrationForm"
import { useBooksSearchParams } from "../../hooks/router/useBookSearchParams"
import { DataErrorContainer } from "../DataErrorContainer/DataErrorContainer"
import { useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useBooksFilter } from "../../hooks/contexts/useBooksFilter"
import { TopNavigation } from "./TopNavigation/TopNavigation"
import { useWindowSize } from "../../hooks/contexts/useWindowSize"
import { useBooksForm } from "../../hooks/contexts/useBooksForm"
import { GoBackButton } from "../../components/GoBackButton/GoBackButton"
import { ResetButton } from "./ResetButton/ResetButton"
import { useBooks } from "../../hooks/queries/bookQueries/useBooks"
import { Wrapper } from "../../components/Wrapper/Wrapper"
import { Loader } from "../../components/Loading/Loader"
import { Pager } from "../../components/Pager/Pager"
import BookCard from "../../components/Cards/BookCard/BookCard"
import "./booksPage.scss"

export default function BooksPage(){
  const { register, setValue  } = useFormContext()
  const { booksFilterIsOpen, setBooksFilterIsOpen } = useBooksFilter()
  const { submitForm } = useBooksForm()
  const { t } = useTranslation()
  const { windowWidth } = useWindowSize()

  const { booksSearchParams } = useBooksSearchParams()
  const { data: books, isLoading } = useBooks(booksSearchParams)

  const pagerData = books && { 
    page: +books.page, 
    size: +books.size,
    pagesCount: books.pagesCount,
    hasPrevious: books.hasPrevious,
    hasNext: books.hasNext,
  }

  const changePage = (newPageNumber: number) => 
    { setValue("page", newPageNumber); submitForm() } 

  return (
    <section className="books-page">
      {/* getValues("page") - if needed */}
      <input {...register("page")} value={booksSearchParams.page} hidden /> 

      {windowWidth > 1024
        ? <BooksFiltrationForm /> 
        : <Wrapper isActive={booksFilterIsOpen} closer={() => setBooksFilterIsOpen(false)}>
            <BooksFiltrationForm isModal={true} isActive={booksFilterIsOpen} />
          </Wrapper>}
      
      <article className="content">
      {!isLoading  
        ? books && books.collection.length
          ?
          <>
            <TopNavigation isLoading={isLoading}/>            

            <ul className="books-vertical-list">
              {books?.collection?.map(book => 
                <BookCard key={book.id} {...book} />)}
            </ul>
  
            <Pager data={pagerData} submit={changePage}/>
          </> 
          :
          <DataErrorContainer message={t(`pages.books.empty-message`)}>
            <ResetButton />
            <GoBackButton />
          </DataErrorContainer>
        :
        <Loader message={t(`pages.books.loading-message`)}/>}
      </article> 
    </section>
  )
}