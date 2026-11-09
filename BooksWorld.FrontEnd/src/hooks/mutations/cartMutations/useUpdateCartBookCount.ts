import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../contexts/useAuth";
import axios from "axios";

type Props = { cartBookId: number, isIncrease: boolean }

export function useUpdateCartBookCount(){
  const { user, setUser } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['PATCH', 'cart'],
    mutationFn: async ({ cartBookId, isIncrease } : Props) => {
      if (!user) throw new Error("User not found");

      const response = await axios.patch<number>(
        `${import.meta.env.VITE_API_URL}/users/cart/${cartBookId}`,
        { increase: isIncrease },
        { withCredentials: true })

      if (response.status == 200)
        return { cartBookId: response.data, isIncrease: isIncrease }

      throw new Error("Failed to update cart");
    },
    onSuccess: (response : Props) => {
      if (!user) return

      const updatedCartBooks = user.cartBooks.map(sb => {
        if (sb.id == response.cartBookId && sb?.quantity)
          sb.quantity = response.isIncrease ? ++sb.quantity : --sb.quantity

        return sb
      }) 

      setUser({ ...user, cartBooks: updatedCartBooks })
      queryClient.invalidateQueries({ queryKey: ["GET", "cart"]})
    }
  })
}