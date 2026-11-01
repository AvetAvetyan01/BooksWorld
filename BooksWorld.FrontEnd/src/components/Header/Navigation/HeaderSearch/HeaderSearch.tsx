import type { GenreSuggestion } from "../../../../types/searchSuggestions/GenreSuggestion";
import type { BookSuggestion } from "../../../../types/searchSuggestions/BookSuggestion";
import type { AuthorSuggestion } from "../../../../types/searchSuggestions/AuthorSuggestion";
import { useNavigate } from "react-router"
import { Search } from "../../../Search/Search"
import searchTypesData from "./searchTypesData.json"
import "./headerSearch.scss"

export function HeaderSearch(){
  const navigate = useNavigate()

  const onSearch = (searchString: string, searchType: string, searchField: string, language: string) => {
    switch (searchType)
    {     
      case "Book":
        navigate(`/books?search=${searchString}&searchField=${searchField}&language=${language}`); break;
      case "Author":
        navigate(`/authors/1/${searchString}`); break;
    }
  }

  const bookSuggestionOnClick = (suggestion: BookSuggestion) => navigate("/book/" + suggestion.id)
  const authorSuggestionOnClick = (suggestion: AuthorSuggestion) => navigate("/author/" + suggestion.id)
  const genreSuggestionOnClick = (suggestion: GenreSuggestion) => navigate("/genre/" + suggestion.id)
      
  return (
    <Search
      onSearch={onSearch}
      searchTypes={searchTypesData}
      suggestionsOptions={{
        authorSuggestionOnClick: authorSuggestionOnClick,
        bookSuggestionOnClick: bookSuggestionOnClick,
        genreSuggestionOnClick: genreSuggestionOnClick,
        showId: false,
        size: 10
      }} 
    />
  )
}