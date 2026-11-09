import { useQuery } from "@tanstack/react-query";
import type { IAuthor } from "../../../interfaces/entities/IAuthor"
import axios from "axios";

export function useAuthor(id?: number){
  return useQuery({
    queryKey: ["GET", "author", id],
    queryFn: async () => {
      const response = await axios.get<IAuthor>(`${import.meta.env.VITE_API_URL}/authors/${id}`)
      return response
    },
    select: (response) => response.data,
    enabled: !!id
  }) 
}