import type { AuthorConfigModel } from "../../../types/requests/configModels/AuthorConfigModel";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRole } from "../../queries/userQueries/useRole";
import { mapper } from "../../../utilities/mapper";
import axios from "axios";

export function useEditAuthor(){
  const queryClient = useQueryClient()
  const { data: role } = useRole() 

  return useMutation({
    mutationKey: ["PUT", "authors"],
    mutationFn: async (request: AuthorConfigModel) => {
      if (role != "Admin") throw Error("403 Unauthorized");

      console.log(request)
      
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/authors/${request.Id}`,
        mapper.mapToFormData(request),
        { withCredentials: true })
           
      return response.data
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey : ["GET", "author", id] })
    } 
  })
}