import type { CreateOrderRequest } from "../../../types/requests/CreateOrderRequest";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import axios from "axios";

export function useCreateOrder(){
  const navigate = useNavigate()

  return useMutation({
    mutationKey: ["POST", "orders"],
    mutationFn: async (request: CreateOrderRequest) => {
      const response = await axios.post<string>(
        `${import.meta.env.VITE_API_URL}/orders`,
        request,
        { withCredentials: true }
      )

      return response
    },
    onSuccess: (response) => navigate("/checkout/payment", { state: { secret: response.data } }),
    gcTime: 1000 * 60 * 30,
  })
}