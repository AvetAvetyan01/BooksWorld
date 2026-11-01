import { GenresPresentationList } from "./GenresMenu/GenresPresentationList";
import type { BooksRequest } from "../../types/requests/BooksRequest";
import { useTranslation } from "react-i18next";
import { HeaderSearch } from "../../components/Header/Navigation/HeaderSearch/HeaderSearch";
import { useAuthors } from "../../hooks/queries/authorQueries/useAuthors";
import { useBooks } from "../../hooks/queries/bookQueries/useBooks";
import BooksCollection from "../../components/Collections/BooksCollection/BooksCollection";
import AuthorsCollection from "../../components/Collections/AuthorsCollection/AuthorsCollection";
import Slider from "./Slider/Slider";
import "./homePage.scss"

export default function HomePage() {
  const { t } = useTranslation()

  const { data: popularBooks } = useBooks({ page: 1, size: 15 } as BooksRequest)
  const { data: newestBooks } = useBooks({ page: 3, size: 15 } as BooksRequest)
  const { data: bestsallerBooks } = useBooks({ page: 4, size: 15, highRated: true } as BooksRequest)
  const { data: authors } = useAuthors({ page: 1, size: 10 })  

  return (
    <section className="home-page">
      <HeaderSearch />

      <Slider />
      
      <BooksCollection 
        title={t(`pages.home.titles.popular-books`)}
        data={popularBooks?.collection} />

      <GenresPresentationList />

      <BooksCollection 
        title={t(`pages.home.titles.newest-books`)}
        data={newestBooks?.collection} />

      <AuthorsCollection 
        title={t(`pages.home.titles.popular-authors`)}                
        data={authors?.collection} />

      <BooksCollection 
        title={t(`pages.home.titles.bestsallers`)}
        data={bestsallerBooks?.collection} />
    </section>
  )
}