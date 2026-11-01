import type { GenresSuggestionsRequest } from "../../../types/requests/suggestionsRequests/GenresSuggestionsRequest";
import type { GenreSuggestion } from "../../../types/searchSuggestions/GenreSuggestion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGenresSuggestions(request: GenresSuggestionsRequest){
  return useQuery({
    queryKey: ["GET", 'genres/suggestions', request],
    enabled: request.search.length > 0 && (['Id','Name'].includes(request.searchField)),
    // select: (p) => p,
    queryFn: async () =>
      new Promise<GenreSuggestion[]>((resolve) =>
        setTimeout(async () => {
          const requestUrl = `${import.meta.env.VITE_API_URL}/genres/suggestions?`+
            `Search=${request.search}`+
            `&SearchField=${request.searchField}`+
            `&SearchLanguage=${request.searchLanguage}`+
            `&Size=${request.size}`

          // in future we'll change to URL type 
          // const url = new URL().searchParams.append()
          
          const suggestions = await axios.get<GenreSuggestion[]>(requestUrl)
          
          resolve(suggestions.data)
        }, 
        700))
  })
}