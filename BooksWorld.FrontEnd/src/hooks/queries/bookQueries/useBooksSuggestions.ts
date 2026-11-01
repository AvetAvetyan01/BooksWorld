import type { BookSuggestion } from "../../../types/searchSuggestions/BookSuggestion";
import type { BooksSuggestionsRequest } from "../../../types/requests/suggestionsRequests/BooksSuggestionsRequest";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useBooksSuggestions(request: BooksSuggestionsRequest){
  return useQuery({
    queryKey: ["GET", 'books/suggestions', request],
    enabled: request?.search?.length > 0 && (['Id','Title','ISBN'].includes(request.searchField)),
    // select: (p) => p,
    queryFn: async () =>
      new Promise<BookSuggestion[]>((resolve) =>
        setTimeout(async () => {
          const requestUrl = `${import.meta.env.VITE_API_URL}/books/suggestions?`+
            `Search=${request.search}`+
            `&SearchField=${request.searchField}`+
            `&SearchLanguage=${request.searchLanguage}`+
            `&Size=${request.size}`

          // in future we'll change to URL type 
          // const url = new URL().searchParams.append()

          const suggestions = await axios.get<BookSuggestion[]>(requestUrl)

          resolve(suggestions.data)
        }, 
        700))
  })
}