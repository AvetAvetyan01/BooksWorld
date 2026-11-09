import type { CheckoutStatus } from "../../../types/responses/CheckoutStatus"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export function useCheckoutStatus(sessionId?: string){
  return useQuery({
    queryKey: ["GET", "checkout/status", sessionId],
    enabled: sessionId != undefined && sessionId != null && sessionId.length > 0,
    queryFn: async () => {
      const requestUrl = `${import.meta.env.VITE_API_URL}/checkout/session/${sessionId}`
      const response = await axios.get<CheckoutStatus>(requestUrl, {withCredentials: true})
      
      console.log(response)
      return response.data
    }
  })
}