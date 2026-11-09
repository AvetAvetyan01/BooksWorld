import type { BoughtSubbook } from "../../../types/responses/BoughtSubbook";
import { useAuth } from "../../contexts/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useUserBoughtSubbooks(){  
  const { user } = useAuth()

  return useQuery({
    queryKey: ["GET", "users/me/boughts"],
    enabled: !!user,
    queryFn: async () => {
      const response = await axios.get<BoughtSubbook[]>(
        `${import.meta.env.VITE_API_URL}/users/me/boughts`,
        { withCredentials: true }) 

      return response.data
    },
  }) 
}