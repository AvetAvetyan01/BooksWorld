import type { GenresSuggestionsRequest } from "../../../types/requests/suggestionsRequests/GenresSuggestionsRequest";
import type { GenreSuggestion } from "../../../types/searchSuggestions/GenreSuggestion";
import { useGenresSuggestions } from "../../../hooks/queries/genreQueries/useGenresSuggestions";
import { useEffect } from "react";

type Props = {
  request: GenresSuggestionsRequest
  options: {
    onClick: (data: GenreSuggestion, searchField: string) => void
    showId: boolean
  },
  setIsLoading: (isLoading: boolean) => void
  setSearchString: (searchString: string) => void
}

export function GenresSearchSuggestions({ request, options, setIsLoading, setSearchString } : Props){
  const { data: suggestions, isLoading } = useGenresSuggestions(request)

  useEffect(() => setIsLoading(isLoading), [isLoading, setIsLoading])

  const presentation = (suggestion: GenreSuggestion) => 
    options.showId ? `${suggestion.id}  ${suggestion.name}` : suggestion.name
  
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