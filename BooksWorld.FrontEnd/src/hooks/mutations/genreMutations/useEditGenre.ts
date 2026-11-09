import type { GenreConfigModel } from "../../../types/requests/configModels/GenreConfigModel";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRole } from "../../queries/userQueries/useRole";
import axios from "axios";

export function useEditGenre(){
  const queryClient = useQueryClient()
  const { data: role } = useRole()

  return useMutation({
    mutationKey: ["PUT", "genres"],
    mutationFn: async (request: GenreConfigModel) => {
      if (role != "Admin") throw Error("403 Unauthorized");      

      const response = await axios.put<number>(`${import.meta.env.VITE_API_URL}/genres/${request.Id}`,
        request,
        { withCredentials: true })

      return response.data
    },
    onSuccess: (id: number) => {
      queryClient.invalidateQueries({ queryKey: ["GET", "genre", id] })
    }
  })
}