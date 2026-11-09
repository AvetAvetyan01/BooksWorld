import { DataErrorContainer } from "../DataErrorContainer/DataErrorContainer"
import { useGenreSubgenres } from "../../hooks/queries/genreQueries/useGenreSubgenres"
import { Link, useParams } from "react-router"
import { useTranslation } from "react-i18next"
import { pickGenreName } from "../../utilities/languagePickers"
import { GoBackButton } from "../../components/GoBackButton/GoBackButton"
import { useLanguage } from "../../hooks/contexts/useLanguage"
import { useGenre } from "../../hooks/queries/genreQueries/useGenre"
import { Loader } from "../../components/Loading/Loader"
import "./genresPage.scss"

export function GenresPage(){
  const params = useParams()
  const genreId = params?.id ? +params.id : undefined
  const { t } = useTranslation()
  const { language } = useLanguage()
  const { data: genre } = useGenre(genreId)
  const { data: subgenres, isLoading: isSubgenresLoading } = useGenreSubgenres(genreId)

  return (
    <section className="genres-page">
      <article className="top-elements">
        <GoBackButton />

        <Link 
          to={`/books?genreId=${genre?.id}`} 
          className="base-genre-name">
          {genre && pickGenreName(language, genre)}
        </Link>
      </article>  

      {!isSubgenresLoading
        ? subgenres?.length 
          ? 
            <ul className="subgenres">
              {subgenres?.map(subgenre =>   
                <li 
                  key={subgenre.id}
                  className="subgenre"
                  data-id={subgenre.id}>

                  <Link className="name" to={`/books?genreId=${subgenre.id}`}>{pickGenreName(language, subgenre)}</Link>

                  {subgenre.subgenresCount > 0 &&
                    <Link className="children-link" to={`/genre/${subgenre.id}`}>
                      <p>({subgenre?.subgenresCount})</p>
                      <i className="fa-solid fa-chevron-right"></i>
                    </Link>}
                </li>
              )}
            </ul>
          : <DataErrorContainer message={t(`pages.genres.empty-message`)}/>
        : <Loader message={t(`pages.genres.loading-message`)}/> 
      }
    </section>
  )
}