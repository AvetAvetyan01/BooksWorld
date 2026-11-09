import type { AuthorConfigModel } from "../../../types/requests/configModels/AuthorConfigModel";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useRole } from "../../queries/userQueries/useRole";
import { mapper } from "../../../utilities/mapper";
import axios from "axios";

export function useCreateAuthor(){
  const navigate = useNavigate()
  const { data: role } = useRole()

  return useMutation({
    mutationKey: ["POST", "authors"],
    mutationFn: async (request: AuthorConfigModel) => {
      if (role != "Admin") throw Error("403 Unauthorized");      

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/authors`,
        mapper.mapToFormData(request),
        { withCredentials: true })

      return response
    },
    onSuccess: (response) => navigate(''+response.data)
  })
}