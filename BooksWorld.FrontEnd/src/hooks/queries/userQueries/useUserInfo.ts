import type { UserInfo } from "../../../types/responses/UserInfo";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../contexts/useAuth";
import axios from "axios";

export function useUserInfo(){  
  const { user } = useAuth()

  return useQuery({
    queryKey: ["GET", "users/me"],
    queryFn: async () => {
      const response = await axios.get<UserInfo>(
        `${import.meta.env.VITE_API_URL}/users/me`,
        { withCredentials: true }) 

        return response.data
    },
    enabled: !!user
  }) 
}