import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRole } from "../../queries/userQueries/useRole";
import axios from "axios";

type Props = { 
  subbookId: number 
  bookId: number
}

export function useDeleteSubbook(){
  const queryClient = useQueryClient()
  const { data: role } = useRole()

  return useMutation({
    mutationKey: ["DELETE", "subbook"],
    mutationFn: async (request: Props) => {
      if (role != "Admin") throw Error("403 Unauthorized");      
      
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/subbooks/${request.subbookId}`, 
        { withCredentials: true })

      return { bookId: request.bookId, subbookId: response.data }
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["GET", `books/${response.bookId}/subbooks`] })
    }
  })
}