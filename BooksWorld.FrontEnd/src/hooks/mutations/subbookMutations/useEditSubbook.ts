import type { SubbookConfigModel } from "../../../types/requests/configModels/SubbookConfigModel";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRole } from "../../queries/userQueries/useRole";
import { mapper } from "../../../utilities/mapper";
import axios from "axios";

export function useEditSubbook(){
  const queryClient = useQueryClient()
  const { data: role } = useRole()

  return useMutation({
    mutationKey: ["PUT", "subbooks"],
    mutationFn: async (request: SubbookConfigModel) => {
      if (role != "Admin") throw Error("403 Unauthorized");          

      const response = await axios.put(`${import.meta.env.VITE_API_URL}/subbooks/${request.Id}`, 
        mapper.mapToFormData(request), 
        { withCredentials: true })

      return { bookId: request.BookId, subbookId: response.data }
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["GET", `books/${response.bookId}/subbooks`] })
    }
  })
}