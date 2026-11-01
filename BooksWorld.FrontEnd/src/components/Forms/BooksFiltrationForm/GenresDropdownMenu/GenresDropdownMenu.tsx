import { useBooksSearchParams } from "../../../../hooks/router/useBookSearchParams"
import { useEffect, useState, type MouseEvent } from "react"
import { useGenreSubgenres } from "../../../../hooks/queries/genreQueries/useGenreSubgenres"
import { useTranslation } from "react-i18next"
import { useFormContext } from "react-hook-form"
import { pickGenreName } from "../../../../utilities/languagePickers"
import { useBooksForm } from "../../../../hooks/contexts/useBooksForm"
import { useLanguage } from "../../../../hooks/contexts/useLanguage"
import { useGenre } from "../../../../hooks/queries/genreQueries/useGenre"
import "./genresDropdownMenu.scss"

export function GenresDropdownMenu(){
  const { t } = useTranslation()
  const { language } = useLanguage()
  const { register, setValue } = useFormContext()
  const { submitForm } = useBooksForm()
  const { booksSearchParams } = useBooksSearchParams()
  const { data: genre } = useGenre(booksSearchParams?.genreId) 
  const { data: subgenres } = useGenreSubgenres(booksSearchParams?.genreId)
  const [open, setOpen] = useState(false)

  useEffect(() => setValue("genreId", genre?.id), [genre, setValue])

  const handleSubbookClick = (e: MouseEvent<HTMLLIElement>) => {
    const newGenreId = e.currentTarget.dataset.id
    
    if (!newGenreId) return;

    setValue("genreId", +newGenreId) 
    setValue("page", 1)
    setOpen(false)
    submitForm()
  }

  return (
    <article className="genres-menu">
      <input 
        {...register("genreId")} 
        value={booksSearchParams.genreId} 
        type="number" 
        hidden />
      
      {genre &&
        <div className="genre-info">
          {genre?.baseId != 0 && 
            <i 
              onClick={handleSubbookClick} 
              data-id={genre.baseId} 
              className="fa-solid fa-arrow-turn-up fa-flip-horizontal"></i>}

          <p>{pickGenreName(language, genre)}</p>
        </div>}
      
      {subgenres && 
        <ul className={"menu " + (open && "spreaded")}>
          {(open ? subgenres : subgenres.slice(0,8))
            .map((subgenre, index) =>
              <li 
                key={index}
                data-id={subgenre.id}
                onClick={handleSubbookClick}
                >
                {pickGenreName(language, subgenre)}
              </li>)}
        </ul>}
      
      {subgenres && subgenres?.length > 7 &&
        <button 
          onClick={(e) => { e.preventDefault(); setOpen(!open) }}>
          {open ? t(`pages.books.genres-menu.button.close`) : t(`pages.books.genres-menu.button.open`) }
        </button>}
    </article>
  )
}