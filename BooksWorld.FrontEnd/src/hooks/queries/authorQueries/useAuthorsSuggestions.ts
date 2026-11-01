import type { AuthorsSuggestionsRequest } from "../../../types/requests/suggestionsRequests/AuthorsSuggestionsRequest";
import type { AuthorSuggestion } from "../../../types/searchSuggestions/AuthorSuggestion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useAuthorsSuggestions(request: AuthorsSuggestionsRequest){
  return useQuery({
    queryKey: ["GET", 'authos/suggestions', request],
    enabled: request.search.length > 0 && (['Id','FullName'].includes(request.searchField)),
    // select: (p) => p,
    queryFn: async () =>
      new Promise<AuthorSuggestion[]>((resolve) =>
        setTimeout(async () => {
          const requestUrl = `${import.meta.env.VITE_API_URL}/authors/suggestions?` + 
            `Search=${request.search}` + 
            `&SearchField=${request.searchField}` + 
            `&SearchLanguage=${request.searchLanguage}` + 
            `&Size=${request.size}`

          const response = await axios.get<AuthorSuggestion[]>(requestUrl)

          resolve(response.data)
        }, 
        700))
  })
}