import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export function usePaymentIntent(){
  return useQuery({
    queryKey: ["GET", "payment/intent"],
    queryFn: async () => {
      const requestUrl = `${import.meta.env.VITE_API_URL}/payment/intent`
      const response = await axios.post<string>(requestUrl)
      
      return response.data
    }
  })
}