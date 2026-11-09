import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type Props = { 
  reviewId: number
  bookId: number
  page: number 
}

export function useDeleteReview(){
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['DELETE', 'user/reviews'],
    mutationFn: async ({ reviewId, bookId, page } : Props) => {
      const response = await axios.delete<number>(
        `${import.meta.env.VITE_API_URL}/reviews/${reviewId}`,
        { withCredentials: true }
      )

      return { bookId: bookId, reviewId: response.data, page: page }
    },
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: ["GET","user/review"] })
      await queryClient.invalidateQueries({ queryKey: ["GET",`books/${response.bookId}/reviews/${response.page}`]})
      // await queryClient.invalidateQueries({ queryKey: ["GET",`books/${response.bookId}/reviews/1`]})
    }
  })
}