import type { BookConfigModel } from "../../../types/requests/configModels/BookConfigModel";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mapper } from "../../../utilities/mapper"
import axios from "axios";

export function useEditBook(){
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["PUT", "books"],
    mutationFn: async (request: { Id: number } & BookConfigModel) => {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/books/${request.Id}`, 
        mapper.mapToFormData(request), 
        { withCredentials: true }
      )
      
      return response.data
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ["GET", "book", id] })
    }
  })
}