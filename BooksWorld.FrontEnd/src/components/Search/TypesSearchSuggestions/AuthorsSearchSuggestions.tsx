import { useEffect } from "react";
import { useAuthorsSuggestions } from "../../../hooks/queries/authorQueries/useAuthorsSuggestions";
import type { AuthorsSuggestionsRequest } from "../../../types/requests/suggestionsRequests/AuthorsSuggestionsRequest";
import type { AuthorSuggestion } from "../../../types/searchSuggestions/AuthorSuggestion";

type Props = {
  request: AuthorsSuggestionsRequest
  options: {
    onClick: (data: AuthorSuggestion, searchField: string) => void
    showId: boolean
    // presentation: (data: AuthorSuggestion, searchField: string) => string 
  },
  setIsLoading: (isLoading: boolean) => void
  setSearchString: (searchString: string) => void
}

export function AuthorsSearchSuggestions({ request, options, setIsLoading, setSearchString } : Props){
  const { data: suggestions, isLoading } = useAuthorsSuggestions(request)

  const presentation = (suggestion: AuthorSuggestion) => 
    options.showId ? `${suggestion.id}  ${suggestion.fullName}` : suggestion.fullName

  useEffect(() => setIsLoading(isLoading), [isLoading, setIsLoading])

  return (
    (!isLoading && suggestions?.length) ? (
      <ul className="matcheds-list">  
        {suggestions.map(d => 
          <li key={d.id} 
            onMouseDown={() => {options.onClick(d, request.searchType); setSearchString('')}}>
            {presentation(d)}
            {/* {options.presentation(d, request.searchType)} */}
          </li>
        )}
      </ul> 
    ) : false
  )
}