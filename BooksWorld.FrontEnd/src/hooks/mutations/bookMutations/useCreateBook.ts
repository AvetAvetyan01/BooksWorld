import type { BookConfigModel } from "../../../types/requests/configModels/BookConfigModel";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useRole } from "../../queries/userQueries/useRole";
import { mapper } from "../../../utilities/mapper";
import axios from "axios";

export function useCreateBook(){
  const navigate = useNavigate()
  const { data: role } = useRole()

  return useMutation({
    mutationKey: ["POST", "books"],
    mutationFn: async (request: BookConfigModel) => {
      if (role != "Admin") throw Error("403 Unauthorized");      
      
      const response = await axios.post<number>(`${import.meta.env.VITE_API_URL}/books`, 
        mapper.mapToFormData(request), 
        { withCredentials: true })
      
      return response
    },
    onSuccess: (response) => navigate(''+response.data)
  })
}