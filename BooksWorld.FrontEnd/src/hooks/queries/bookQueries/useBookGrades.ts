import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useBookGrades(bookId?: number){
  return useQuery({
    queryKey: ["GET", "grades", bookId],
    queryFn: async () => {
      const requestUrl = `${import.meta.env.VITE_API_URL}/books/${bookId}/grades`

      const response = await axios.get<Record<number, number>[]>(requestUrl)

      return response
    },
    select: (d) => d.data,
    enabled: !!bookId,
  })
}