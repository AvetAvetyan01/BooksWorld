import type { ReviewConfigModel } from "../../../types/requests/configModels/ReviewConfigModel";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useEditReview(){
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['PUT', 'review'],
    mutationFn: async (request: ReviewConfigModel) => {
      const response = await axios.put<number>(
        `${import.meta.env.VITE_API_URL}/reviews/${request.Id}`, 
        request, 
        { withCredentials: true })
      
      return { bookId: request.BookId, reviewId: response.data }
    },  
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: ["GET","user/review"] })
      await queryClient.invalidateQueries({ queryKey: ["GET",`books/${response.bookId}/reviews/1`]})
    }
  })
}