import type { AuthorsRequest } from "../../../types/requests/AuthorsRequest"
import type { PagedCollection } from "../../../generics/PagedCollection";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { IAuthorCard } from "../../../interfaces/cards/IAuthorCard";
import { useLanguage } from "../../contexts/useLanguage";

export function useAuthors(request: AuthorsRequest){
  const { language } = useLanguage()

  return useQuery({
    queryKey: ["authors", request],
    enabled: !!request,
    queryFn: async () => {
      const requestUrl = `${import.meta.env.VITE_API_URL}/authors?` +
        (request.search ? 
          `Search=${request.search}`+
          `&SearchField=${request.searchField}` +
          // `&SearchLanguage=${request.searchLanguage}` : ``) +
          `&SearchLanguage=${language}` : ``) +
        `&Page=${request.page}` +
        `&Size=${request.size}`

      const response = await axios.get<PagedCollection<IAuthorCard>>(requestUrl)
      
      console.log(response.data.collection[1].fullName)
          
      return response
    },
    select: (response) => response.data,
    placeholderData: (p) => p,
  })
}