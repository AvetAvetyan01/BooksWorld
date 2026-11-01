import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { PagedCollection } from "../../../generics/PagedCollection"
import type { IReview } from "../../../interfaces/entities/IReview";

type Props = {
  page: number 
  size: number
  bookId?: number 
}

export function useBookReviews(request: Props){
  return useQuery({
    // queryKey: ['GET', `book/${request.bookId}/reviews/${request?.page}`],
    queryKey: ["GET",`books/${request.bookId}/reviews/${request?.page}`],
    // queryKey: ['GET', `reviews`, 'book', request.bookId],
    queryFn: async () => {
      const requestUrl = `${import.meta.env.VITE_API_URL}/books/${request.bookId}/reviews/${request.page}/${request.size}`
    
      const bookReviews = await axios.get<PagedCollection<IReview>>(requestUrl)

      return bookReviews
    },  
    select: (data) => data.data, 
    enabled: !!request.bookId && !!request.page,
    placeholderData: (p) => (p),
  })
}