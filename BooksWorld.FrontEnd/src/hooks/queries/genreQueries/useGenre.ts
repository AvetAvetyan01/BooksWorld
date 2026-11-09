import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { IGenre } from "../../../interfaces/entities/IGenre";

export function useGenre(id?: number){
  return useQuery({
    queryKey: ["GET", "genres", id],
    queryFn: async () => {
      const response = await axios.get<IGenre>(`${import.meta.env.VITE_API_URL}/genres/${id}`)
      return response
    },
    select: (d) => d.data,
    enabled: !!id,
    placeholderData: (p) => p
  }) 
} 