import { useBooksSearchParams } from "../../../hooks/router/useBookSearchParams"
import { useFormContext } from "react-hook-form"
import { useBooksFilter } from "../../../hooks/contexts/useBooksFilter"
import { useTranslation } from "react-i18next"
import { useWindowSize } from "../../../hooks/contexts/useWindowSize"
import { useBooksForm } from "../../../hooks/contexts/useBooksForm"
import { DropdownMenu } from "../../../components/DropdownMenu/DropdownMenu"
import { ResetButton } from "../ResetButton/ResetButton"
import { SearchInfo } from "../../../components/SearchInfo/SearchInfo"
import { useEffect } from "react"
import { Loader } from "../../../components/Loading/Loader"
import sortingTypes from "./sortingTypes.json"
import sizes from "./sizes.json"
import "./topNavigation.scss"

export function TopNavigation({ isLoading }: { isLoading: boolean }){
  const { register, setValue } = useFormContext()
  const { booksSearchParams, isChanged } = useBooksSearchParams()
  const { setBooksFilterIsOpen } = useBooksFilter()
  const { submitForm } = useBooksForm()
  const { windowWidth } = useWindowSize() 
  const { t } = useTranslation()

  const changeSortingType = (newValue: string) => {
    setValue("sortBy", newValue)
    setValue("page", 1)
    submitForm()
  } 
  const changeSize = (newSize: string) => {
    setValue("size", +newSize)
    setValue("page", 1)
    submitForm()
  }

  // useEffect(() => { if (booksSearchParams.search) setValue("search", booksSearchParams.search)},
  // [booksSearchParams.search, setValue])

  useEffect(() => { 
    if (booksSearchParams.search) setValue("search", booksSearchParams.search)
  },
  [booksSearchParams.search, booksSearchParams.size, setValue])

  return (
    <div className="top-navigation">
      <input {...register("size")}   value={booksSearchParams.size}   hidden />      
      <input {...register("sortBy")} value={booksSearchParams.sortBy} hidden />      
      <input {...register("search")} value={booksSearchParams.search || ""} hidden />      
      <input {...register("searchField")} value={booksSearchParams.searchField || "Title"} hidden />      
      <input {...register("searchLanguage")} value={booksSearchParams.searchLanguage || "English"} hidden />      
          
      <SearchInfo searchString={booksSearchParams.search}/>

      <div className="dropdowns">
        <DropdownMenu 
          activeValue={booksSearchParams.sortBy?.toString()} 
          searchingTypesData={sortingTypes}
          submit={changeSortingType}/>

        <DropdownMenu
          activeValue={booksSearchParams.size.toString()}
          searchingTypesData={sizes}
          translatable={false}
          submit={changeSize}/>
      </div>

      <div className="buttons">
        {windowWidth < 1024 && 
          <button onClick={() => setBooksFilterIsOpen(true)} className="filter-button">
            <i className="fa-solid fa-sliders"></i>
            <p>{t('pages.books.filter-button')}</p>
          </button>}
        
        {isChanged() && <ResetButton />}

        {isLoading && <Loader message={"books are being searched"}/>}
      </div>
    </div>
  )
}