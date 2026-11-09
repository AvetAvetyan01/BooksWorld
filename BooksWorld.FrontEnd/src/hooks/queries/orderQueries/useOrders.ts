import type { GetOrdersRequest } from "../../../types/requests/GetOrdersRequest";
import type { PagedCollection } from "../../../generics/PagedCollection";
import type { IOrder } from "../../../interfaces/entities/IOrder"
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useOrders(request: GetOrdersRequest){
  return useQuery({
    queryKey: ["GET", "/orders", request],
    queryFn: async () => {
      const response = await axios.get<PagedCollection<IOrder>>(
        `${import.meta.env.VITE_API_URL}/orders`+
          `?page=${request.page}&size=${request.size}`+ 
          `${!!request.search && !!request.searchField 
            ? `&search=${request.search}&searchField=${request.searchField}` : ``}`
      );

      return response.data
    }, 
    placeholderData: (p) => p
  })
}