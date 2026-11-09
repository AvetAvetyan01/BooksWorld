import type { GenresRequest } from "../../../types/requests/GenresRequest";
import type { PagedCollection } from "../../../generics/PagedCollection";
import type { IGenreCard } from "../../../interfaces/cards/IGenreCard";
import { useLanguage } from "../../contexts/useLanguage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGenres(request: GenresRequest){
  const { language } = useLanguage()

  return useQuery({
    queryKey: ["GET", "genres", request],
    queryFn: async () => {
      // if (request.SearchType == "GenreName") request.SearchType = "Name"
      // else if (request.SearchType == "GenreId") request.SearchType = "Id"

      const requestUrl = `${import.meta.env.VITE_API_URL}/genres?` +
        (request.search ? 
          `Search=${request.search}`+
          `&Language=${language}`+
          `&SearchField=${request.searchField}` : ``) +
        `&Page=${request.page}` +
        `&Size=${request.size}`
      
      const response = await axios.get<PagedCollection<IGenreCard>>(requestUrl)
      
      return response
    },
    select: (response) => response.data,
    // placeholderData: (d) => d
  })
}