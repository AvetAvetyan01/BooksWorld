import { startTransition, useEffect, useRef, useState } from "react"
import { useLanguage } from "../../hooks/contexts/useLanguage"
import { BooksSearchSuggestions } from "./TypesSearchSuggestions/BooksSearchSuggestions"
import { AuthorsSearchSuggestions } from "./TypesSearchSuggestions/AuthorsSearchSuggestions"
import { useTranslation } from "react-i18next"
import { DropdownMenu } from "../DropdownMenu/DropdownMenu"
import { useLocation } from "react-router"
import { GenresSearchSuggestions } from "./TypesSearchSuggestions/GenresSearchSuggestions"
import type { BookSuggestion } from "../../types/searchSuggestions/BookSuggestion";
import type { AuthorSuggestion } from "../../types/searchSuggestions/AuthorSuggestion";
import type { GenreSuggestion } from "../../types/searchSuggestions/GenreSuggestion";
import "./search.scss"

type Props = {
  searchTypes: {
    id: number
    value: string
    name: Record<string, string>
  }[]
  onSearch?: (searchString: string, searchType: string, searchField: string, language: string) => void
  suggestionsOptions?: {
    bookSuggestionOnClick?: (suggestion: BookSuggestion, searchType: string) => void
    authorSuggestionOnClick?: (suggestion: AuthorSuggestion, searchType: string) => void
    genreSuggestionOnClick?: (suggestion: GenreSuggestion, searchType: string) => void
    showId: boolean
    size: number
  }
}

export function Search({ searchTypes, onSearch, suggestionsOptions } : Props){
  const inputRef = useRef<HTMLInputElement>(null)
  const pathname = useLocation().pathname
  const { t } = useTranslation()
  const { language } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false) 
  const [searchString, setSearchString] = useState('')
  const [searchTypeName, setSearchTypeName] = useState(searchTypes[0].value)

  const suggestionsRequest = {
    search: searchString, 
    searchLanguage: language, 
    searchType: searchTypeName.split('-')[0],
    searchField: searchTypeName.split('-')[1],
    size: suggestionsOptions?.size || 10 
  } 

  useEffect(() => startTransition(() => setSearchString('')), [pathname]) 

  const search = () => {
    if (searchString && onSearch)
    {
      onSearch(searchString, searchTypeName.split('-')[0], searchTypeName.split('-')[1], language.toString())

      setSearchString('')
    }
  }

  const changeType = (newType: string) => {
    setSearchTypeName(newType);   
    setSearchString(''); 
    inputRef.current?.focus()
  }

  return (
    <article className="search">
      <DropdownMenu 
        activeValue={searchTypeName} 
        searchingTypesData={searchTypes} 
        submit={(newType: string) => changeType(newType)} />

      <div className="input-list">
        {isLoading && <div className="loader"></div>}

        <input
          value={searchString}
          placeholder={t(`header.search.input-placeholder.${searchTypeName}`)}
          spellCheck={false}
          ref={inputRef}
          onBlur={() => setIsOpen(false)}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => setSearchString(e.target.value)}
          onKeyDown={(e) => {
            switch (e.key) {
              case "Enter": search(); setIsLoading(false); break;
              case "Escape": setIsOpen(false); break;
            }
          }}
        />

        {(suggestionsOptions && isOpen && !!searchString) && (() => {
          switch(searchTypeName.split('-')[0]) {
            case "Book": 
              return suggestionsOptions.bookSuggestionOnClick &&
                <BooksSearchSuggestions 
                  request={suggestionsRequest}
                  options={{...suggestionsOptions, onClick: suggestionsOptions.bookSuggestionOnClick}}
                  setIsLoading={setIsLoading}
                  setSearchString={setSearchString} />    
            case "Author": 
              return suggestionsOptions.authorSuggestionOnClick && 
                <AuthorsSearchSuggestions
                  request={suggestionsRequest}
                  options={{...suggestionsOptions, onClick: suggestionsOptions.authorSuggestionOnClick}}
                  setIsLoading={setIsLoading}
                  setSearchString={setSearchString} />    
            case "Genre":
              return suggestionsOptions.genreSuggestionOnClick && 
                <GenresSearchSuggestions
                  request={suggestionsRequest}
                  options={{...suggestionsOptions, onClick: suggestionsOptions.genreSuggestionOnClick}}
                  setIsLoading={setIsLoading}
                  setSearchString={setSearchString} />    
          }
        })()}
      </div>
      
      {onSearch && 
        <button className="search-button" onClick={search}>
          {t(`header.search.button`)}
        </button>}
    </article>
  )
}