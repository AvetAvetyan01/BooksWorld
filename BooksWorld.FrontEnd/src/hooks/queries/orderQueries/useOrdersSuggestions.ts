import type { GetOrdersRequest } from "../../../types/requests/GetOrdersRequest";
import type { OrderSuggestion } from "../../../types/searchSuggestions/OrderSuggestion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useOrdersSuggestions(request: GetOrdersRequest){
  return useQuery({
    queryKey: ["GET", "orders/suggestions", request],
    enabled: !!request.search && !!request.searchField && request.search.length > 0 && (['Id','UserId'].includes(request.searchField)),
    queryFn: async () => 
      new Promise<OrderSuggestion[]>((resolve) =>
        setTimeout(async () => {
          const requestUrl = `${import.meta.env.VITE_API_URL}/orders/suggestions?`+
            `Search=${request.search}`+
            `&SearchField=${request.searchField}`+
            `&Size=${request.size}`

          // in future we'll change to URL type 
          // const url = new URL().searchParams.append()

          const suggestions = await axios.get<OrderSuggestion[]>(requestUrl)

          resolve(suggestions.data)
        }, 
        700))
  })
}