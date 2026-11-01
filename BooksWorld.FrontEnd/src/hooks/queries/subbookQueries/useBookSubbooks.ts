import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { ISubbook } from "../../../interfaces/entities/ISubbook";
import { useCurrency } from "../../contexts/useCurrency";

export function useBookSubbooks(bookId?: number | null, discountedPercent?: number){
  const { currency } = useCurrency()

  return useQuery({
    queryKey: ["GET", `books/${bookId}/subbooks?currency=${currency}${discountedPercent ? `&discountPercent=${discountedPercent}` : ''}`],
    queryFn: async () => {
      const response = await axios.get<ISubbook[]>(
        `${import.meta.env.VITE_API_URL}/books/${bookId}/subbooks?currency=${currency}
            ${discountedPercent ? `&discountPercent=${discountedPercent}` : ''}`, 
        { withCredentials: true }) 

      return response
    },
    select: (d) => d.data,
    enabled: !!bookId,
  })
}