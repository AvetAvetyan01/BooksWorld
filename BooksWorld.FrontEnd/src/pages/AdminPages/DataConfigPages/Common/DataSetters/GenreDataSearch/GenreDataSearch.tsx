import type { GenreSuggestion } from "../../../../../../types/searchSuggestions/GenreSuggestion"
import { useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useState } from "react"
import { Search } from "../../../../../../components/Search/Search"
import genresSearchTypes from "./genresSearchTypes.json"
import "./genresDataSearch.scss"
import "../dataSetter.scss"

type Props = { fieldName: string, registerName: string, defaultGenre?: GenreSuggestion }

export function GenreDataSearch({ fieldName, registerName, defaultGenre }: Props){
  const { t } = useTranslation()
  const { register, setValue, formState } = useFormContext()
  const [genre, setGenre] = useState(defaultGenre)

  const fieldError = formState.errors[registerName]?.message?.toString()
  // const errorMessage = t("form-fields.errors.required", { fieldName: t("models.genre.model-name")})
  const errorMessage = t("form-fields.errors.required", { fieldName: fieldName})

  return (
    <article className="data-setter">
      {/* <input {...register(registerName, { required: "Genre Id Is Required" })} hidden /> */}
      <input {...register(registerName, { required: errorMessage })} hidden />

      {/* <p className="title">{t("models.genre.model-name")}</p> */}
      <p className="title">{fieldName}</p>

      {genre?.id &&
        <ul className="data-list">
          <li className="id">{t("models.common.id")}: {genre?.id}</li>
          <li className="name">{t("models.genre.name")}: {genre?.name}</li>
        </ul>}

      <Search 
        searchTypes={genresSearchTypes}        
        suggestionsOptions={{
          genreSuggestionOnClick: (suggestion: GenreSuggestion) => 
            { setValue(registerName, suggestion.id); setGenre(suggestion) },
          showId: true,
          size: 10
        }} />

      <p className="error">{fieldError}</p>
    </article>
  )
}