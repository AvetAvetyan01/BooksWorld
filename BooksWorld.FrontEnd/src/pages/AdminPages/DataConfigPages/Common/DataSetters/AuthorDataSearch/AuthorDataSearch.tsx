import { useFormContext } from "react-hook-form"
import { useState } from "react"
import { Search } from "../../../../../../components/Search/Search"
import type { AuthorSuggestion } from "../../../../../../types/searchSuggestions/AuthorSuggestion"
import authorsSearchTypes from "./authorsSearchTypes.json"
import "./authorDataSearch.scss"
import "../dataSetter.scss"
import { useTranslation } from "react-i18next"

type Props = { registerName: string, defaultAuthor?: AuthorSuggestion }

export function AuthorDataSearch({ registerName, defaultAuthor } : Props){
  const { t } = useTranslation()
  const { register, setValue, formState } = useFormContext()
  const [author, setAuthor] = useState(defaultAuthor)

  const fieldError = formState.errors[registerName]?.message?.toString()
  const errorMessage = t("form-fields.errors.required", { fieldName: t("models.author.model-name")})

  return (
    <div className="data-setter">
      {/* <input {...register(registerName, { required: "Author Id is Required" })} hidden /> */}
      <input {...register(registerName, { required: errorMessage })} hidden />

      <p className="title">{t("models.author.model-name")}</p>
      
      {author?.id &&
        <ul className="data-list">
          <li className="id">{t("models.common.id")}: {author?.id}</li>
          <li className="name">{t("models.author.fullname")}: {author?.fullName}</li>
        </ul>}
          
      <Search
        searchTypes={authorsSearchTypes}
        suggestionsOptions={{
          authorSuggestionOnClick: (suggestion: AuthorSuggestion) => 
            {setValue(registerName, suggestion.id); setAuthor(suggestion)}, 
          showId: true,
          size: 10
        }}/>

      <p className="error">{fieldError}</p>
    </div>
  )
}