import type { ICartBook } from "../../../interfaces/entities/ICartBook";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCurrency } from "../../contexts/useCurrency";

export function useCartBooks(){
  const { currency } = useCurrency()

  return useQuery({
    queryKey: ['GET', 'cart', currency],
    queryFn: async () => 
    {
      const response = await axios.get<ICartBook[]>(
        `${import.meta.env.VITE_API_URL}/users/cart?currency=${currency}`, 
        { withCredentials: true })
      
      return response
    },
    select: (d) => d.data,
    placeholderData: (p) => p 
  })
}