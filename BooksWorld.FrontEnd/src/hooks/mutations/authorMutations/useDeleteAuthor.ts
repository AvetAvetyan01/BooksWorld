import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useRole } from "../../queries/userQueries/useRole";
import axios from "axios";

export function useDeleteAuthor(){
  const navigate = useNavigate()
  const { data: role } = useRole()

  return useMutation({
    mutationKey: ["DELETE", "authors"],
    mutationFn: async (id?: number) => {
      if (role != "Admin") throw Error("403 Unauthorized");      
  
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/authors/${id}`,
        { withCredentials: true })
     
      return response.data
    },
    onSuccess: () => navigate(-1)
  })
}