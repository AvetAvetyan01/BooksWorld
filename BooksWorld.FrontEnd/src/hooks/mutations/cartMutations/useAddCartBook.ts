import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../contexts/useAuth";
import axios from "axios";

export function useAddCartBook() {
  const { user, setUser } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['POST', 'cart'],
    mutationFn: async (subbookId: number) => {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/cart`,
        { subbookId: subbookId },  
        { withCredentials: true })

      return response
    },
    onSuccess: (response) => {
      if (user) setUser({...user, cartBooks: [...user.cartBooks, response.data]})
      queryClient.invalidateQueries({ queryKey: ['GET','cart'] })
    }
  })
}