import { BooksFiltrationFormHeader } from "./BooksFiltrationFormHeader/BooksFiltrationFormHeader";
import { GenresDropdownMenu } from "./GenresDropdownMenu/GenresDropdownMenu";
import { ToggleSwitchesMenu } from "./ToggleSwitchesMenu/ToggleSwitchesMenu";
import { useTranslation } from "react-i18next";
import { CheckboxesMenu } from "./CheckboxesMenu/CheckboxesMenu";
import languages from "./data/languages.json"
import formats from "./data/formats.json"
import toggles from "./data/toggles.json"
import "./booksFiltrationForm.scss"

export function BooksFiltrationForm({ isModal=false, isActive=false }){  
  const { t } = useTranslation()

  return (
    <form 
      // onClick={(e) => {e.stopPropagation(); e.preventDefault()}} 
      onClick={(e) => e.stopPropagation()} 
      className={`books-filtration-form ${isModal ? `modal` : ``} ${isActive ? `active` : ``}`}>
      
      <BooksFiltrationFormHeader />

      <GenresDropdownMenu />
      
      <ToggleSwitchesMenu data={toggles}/>
      
      <CheckboxesMenu title={t(`pages.books.titles.formats`)}   data={formats}/>
      <CheckboxesMenu title={t(`pages.books.titles.languages`)} data={languages}/>

      {/* ADS also in the bottom */}
    </form>
  )
}