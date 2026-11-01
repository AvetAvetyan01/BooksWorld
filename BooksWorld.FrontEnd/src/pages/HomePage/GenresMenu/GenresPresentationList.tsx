import { pickGenreName } from "../../../utilities/languagePickers"
import { useLanguage } from "../../../hooks/contexts/useLanguage"
import { useGenres } from "../../../hooks/queries/genreQueries/useGenres"
import { Link } from "react-router"
import "./genresPresentationList.scss"

export function GenresPresentationList(){
  const { language } = useLanguage()
  const { data: genres } = useGenres({ page: 1, size: 20 })

  return (
    <ul className="genres-presentation-list">
      {genres?.collection?.map(g => 
        <li key={g.id} className="genre">
          <Link to={`/books?genreId=${g.id}`}>{pickGenreName(language, g)}</Link>
        </li>
      )}
    </ul> 
  )
}