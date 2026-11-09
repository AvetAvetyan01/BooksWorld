import type { ReviewConfigModel } from "../../../types/requests/configModels/ReviewConfigModel";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useRole } from "../../queries/userQueries/useRole";
import axios from "axios";

export function useCreateReview(){
  const queryClient = useQueryClient()
  // const { data: role } = useRole()

  return useMutation({
    mutationKey: ['POST', 'user/reviews'],
    mutationFn: async (request: ReviewConfigModel) => {
      // if (role != "Admin") throw Error("403 Unauthorized");      

      console.log(request)

      const response = await axios.post<number>(`${import.meta.env.VITE_API_URL}/reviews`, 
        request, 
        { withCredentials: true }
      )
      
      console.log(response)

      return { bookId: request.BookId, reviewId: response.data }
    },
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: ["GET","user/review"] })
      await queryClient.invalidateQueries({ queryKey: ["GET",`books/${response?.bookId}/reviews/1`]})
    }
  })
}