import type { BooksSuggestionsRequest } from "../../../types/requests/suggestionsRequests/BooksSuggestionsRequest";
import type { BookSuggestion } from "../../../types/searchSuggestions/BookSuggestion";
import { useBooksSuggestions } from "../../../hooks/queries/bookQueries/useBooksSuggestions";
import { useEffect } from "react";

type Props = {
  request: BooksSuggestionsRequest
  options: {
    onClick: (data: BookSuggestion, searchField: string) => void
    showId: boolean
  },
  setIsLoading: (isLoading: boolean) => void
  setSearchString: (searchString: string) => void
}

export function BooksSearchSuggestions({ request, options, setIsLoading, setSearchString } : Props){
  const { data: suggestions, isLoading } = useBooksSuggestions(request)

  useEffect(() => setIsLoading(isLoading), [isLoading, setIsLoading])

  // console.log(request)

  const presentation = (suggestion: BookSuggestion) => {
    if (!options.showId) return suggestion.title

    switch(request.searchField)
    {
      case "Id": return `${suggestion.id} ${suggestion.title}` 
      case "ISBN": return `${suggestion.isbn} ${suggestion.title}` 
    }
  }
  
  return (
    (!isLoading && suggestions?.length) ? (
      <ul className="matcheds-list">  
        {suggestions.map(d => 
          <li key={d.id} 
            onMouseDown={() => {options.onClick(d, request.searchField); setSearchString('')}}>
            
            {presentation(d)}
          </li>
        )}
      </ul> 
    ) : false
  )
}