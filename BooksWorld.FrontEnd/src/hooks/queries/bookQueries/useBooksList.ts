import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { IBook } from "../../../interfaces/entities/IBook";

export function useBooksList(idsList?: number[]){
  return useQuery({
    queryKey: ["GET", "books/list", idsList],
    enabled: !!idsList,
    queryFn: async () => {
      const response = await axios.get<IBook[]>(`${import.meta.env.VITE_API_URL}/books/list?${idsList?.join(",")}`)
      return response
    },  
    select: (d) => d.data,
    placeholderData : (p) => p,
  })
}