import type { AuthorsRequest } from "../../../types/requests/AuthorsRequest"
import type { PagedCollection } from "../../../generics/PagedCollection";
import type { IAuthor } from "../../../interfaces/entities/IAuthor";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useAuthors(request: AuthorsRequest){
  return useQuery({
    queryKey: ["authors", request],
    enabled: !!request,
    queryFn: async () => {
      const requestUrl = `${import.meta.env.VITE_API_URL}/authors?` +
        (request.search ? 
          `Search=${request.search}`+
          `&SearchField=${request.searchField}` +
          `&SearchLanguage=${request.searchLanguage}` : ``) +
        `&Page=${request.page}` +
        `&Size=${request.size}`

      const response = await axios.get<PagedCollection<IAuthor>>(requestUrl)
        
      return response
    },
    select: (response) => response.data,
    placeholderData: (p) => p,
  })
}