import type { GenresRequest } from "../../../types/requests/GenresRequest";
import type { PagedCollection } from "../../../generics/PagedCollection";
import type { IGenre } from "../../../interfaces/entities/IGenre";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGenres(request: GenresRequest){
  return useQuery({
    queryKey: ["GET", "genres", request],
    queryFn: async () => {
      // if (request.SearchType == "GenreName") request.SearchType = "Name"
      // else if (request.SearchType == "GenreId") request.SearchType = "Id"

      const requestUrl = `${import.meta.env.VITE_API_URL}/genres?` +
        (request.search ? 
          `Search=${request.search}`+
          `&Language=${request.searchLanguage}`+
          `&SearchField=${request.searchField}` : ``) +
        `&Page=${request.page}` +
        `&Size=${request.size}`
      
      const response = await axios.get<PagedCollection<IGenre>>(requestUrl)

      return response
    },
    select: (response) => response.data,
    // placeholderData: (d) => d
  })
}