import type { IReview } from "../../../interfaces/entities/IReview";
import { useAuth } from "../../contexts/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useUserReview(request: { bookId?: number }){
  const { user } = useAuth()

  return useQuery({
    queryKey: ["GET",'user/review'],
    queryFn: async () => {
      if (!user) throw Error("403 Forbidden") 
    
      const response = await axios.get<IReview>(
        `${import.meta.env.VITE_API_URL}/books/${request.bookId}/reviews/my`, 
        { withCredentials: true }
      )

      return response
    },
    select: (d) => d.data,
    enabled: !!user && !!request?.bookId,
  })
}