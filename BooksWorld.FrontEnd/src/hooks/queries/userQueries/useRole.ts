import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../contexts/useAuth";
import axios from "axios";

export function useRole(){
  const { user } = useAuth()
  
  return useQuery({
    queryKey: ["GET", "user/role", user?.name],
    queryFn: async () => {
      // temporary solution
      const role = await axios.get<"Admin" | "User">(
        `${import.meta.env.VITE_API_URL}/users/role`,
        { withCredentials: true })
        .then(r => r.data) 
        
      if (!role && localStorage.getItem("user"))
        localStorage.removeItem("user")

      return role
    },
    select: (d) => d,
  }) 
}