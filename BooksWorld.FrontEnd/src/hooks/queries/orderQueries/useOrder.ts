import type { IOrder } from "../../../interfaces/entities/IOrder"
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useOrder(id?: number){
  return useQuery({
    queryKey: ["GET", `/orders/${id}`],
    queryFn: async () => {
      const response = await axios.get<IOrder>(
        `${import.meta.env.VITE_API_URL}/orders/${id}`
      );

      return response.data
    },
    enabled: !!id 
  })
}