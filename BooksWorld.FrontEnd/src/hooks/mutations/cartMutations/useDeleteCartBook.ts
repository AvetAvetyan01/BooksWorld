import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../contexts/useAuth";
import axios from "axios";

export function useDeleteCartBook(){
  const { user, setUser } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['DELETE', 'cart'],
    mutationFn: async (cartBookId?: number) => {
    // mutationFn: async (subbookId?: number) => {
      // if (!user || !subbookId) return;  
      if (!user || !cartBookId) return;  

      // const cartBookId = user.cartBooks.find(cb => cb.subbookId == subbookId)?.id

      if (!cartBookId) return;

      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/users/cart/${cartBookId}`, { withCredentials: true })

      // probably we need to give cartBookId with out response from BACK-END
      // response.status == 204 ? response.cartBookId = cartBookId : false
      
      return response
    },
    onSuccess: (response) => {
      if (!user) return;

      const cartBookIndex = user.cartBooks.findIndex(b => b.id == response?.data)
      const changedCartBooks = [...user.cartBooks.slice(0, cartBookIndex), ...user.cartBooks.slice(cartBookIndex + 1)]
      
      setUser({ ...user, cartBooks: changedCartBooks})

      queryClient.invalidateQueries({ queryKey: ['GET','cart'] }) 
    }
  })
}