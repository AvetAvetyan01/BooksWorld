import type { IBook } from "../../../interfaces/entities/IBook"
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useBook(id? : number){
  return useQuery({
    queryKey: ["GET", "book", id],
    queryFn: async () => {
      const response = await axios.get<IBook>(`${import.meta.env.VITE_API_URL}/books/${id}`)
      return response
    },
    select: (data) => data.data,
    enabled: !!id,
  }) 
}