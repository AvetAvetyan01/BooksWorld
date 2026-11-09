import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import axios from "axios";
import { useRole } from "../../queries/userQueries/useRole";

export function useDeleteGenre(){
  const navigate = useNavigate()
  const { data: role } = useRole()

  return useMutation({
    mutationKey: ["DELETE", "genres"],
    mutationFn: async (id?: number) => {
      if (role != "Admin") throw Error("403 Unauthorized");      

      const response = await axios.delete<number>(`${import.meta.env.VITE_API_URL}/genres/${id}`, 
        { withCredentials: true })

      return response
    },
    onSuccess: () => navigate(-1)
  })
}