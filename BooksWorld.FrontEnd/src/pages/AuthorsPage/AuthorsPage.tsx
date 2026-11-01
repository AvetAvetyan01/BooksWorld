import { useNavigate, useParams } from "react-router"
import { DataErrorContainer } from "../DataErrorContainer/DataErrorContainer"
import { useTranslation } from "react-i18next"
import { GoBackButton } from "../../components/GoBackButton/GoBackButton"
import { useLanguage } from "../../hooks/contexts/useLanguage"
import { useAuthors } from "../../hooks/queries/authorQueries/useAuthors"
import { SearchInfo } from "../../components/SearchInfo/SearchInfo"
import { Loader } from "../../components/Loading/Loader"
import { Pager } from "../../components/Pager/Pager"
import AuthorCard from "../../components/Cards/AuthorCard/AuthorCard"
import "./authorsPage.scss"
import { pickAuthorFullname } from "../../utilities/languagePickers"

export default function AuthorsPage(){
  const params = useParams()
  const page = params?.page ? +params.page : 1
  const search = params.search && params.search
  const navigate = useNavigate()
  const { language } = useLanguage()
  const { t } = useTranslation()
  const lngContext = useLanguage()

  const { data: authors, isLoading } = useAuthors({ 
    search: search, 
    searchField: "FullName",
    searchLanguage: lngContext.language, 
    page: page, 
    size: 30 
  })

  const pagerData = authors && {
    page: authors?.page,
    size: authors?.size,
    pagesCount: authors?.pagesCount,
    hasPrevious: authors?.hasPrevious,
    hasNext: authors?.hasNext
  }

  const changePage = (newPage: number) => 
    navigate(`/authors/${newPage}${search ? "/" + search : ""}`)

  return (
    <section className="authors-page">
      {!isLoading
        ? authors && authors?.collection?.length 
          ?
          <>
            <SearchInfo searchString={search}/>

            <ul className="authors-vertical-list">
              {authors.collection.map(author => 
                <AuthorCard key={author.id} {...author} fullName={pickAuthorFullname(language, author)} />
              )}
            </ul>
            
            <Pager data={pagerData} submit={changePage}/>
          </>
          : 
          <DataErrorContainer message={t(`pages.authors.empty-message`)}>
            <GoBackButton />
          </DataErrorContainer>
        : 
        <Loader message={t(`pages.authors.loading-message`)}/>}
    </section>
  )
}