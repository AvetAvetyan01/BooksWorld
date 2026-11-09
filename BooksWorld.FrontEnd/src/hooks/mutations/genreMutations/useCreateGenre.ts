import type { GenreConfigModel } from "../../../types/requests/configModels/GenreConfigModel";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useRole } from "../../queries/userQueries/useRole";
import axios from "axios";

export function useCreateGenre(){
  const navigate = useNavigate()
  const { data: role } = useRole()

  return useMutation({
    mutationKey: ["POST", "genres"],
    mutationFn: async (request: GenreConfigModel) => {
      if (role != "Admin") throw Error("403 Unauthorized");      

      const response = await axios.post<number>(`${import.meta.env.VITE_API_URL}/genres`, 
        request,
        { withCredentials: true })
      
      return response
    },
    onSuccess: (response) => navigate(''+response.data)
  })
}