import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useAuth } from "../../contexts/useAuth"

export function useClientSecret(){
  const { user } = useAuth()

  return useQuery({
    queryKey: ["GET", "client/secret"],
    // in examples use with 'useMemo' hook
    queryFn: async () => {
      const response = await axios.post<string>(
        `${import.meta.env.VITE_API_URL}/checkout/session`, 
        {},
        { withCredentials: true }
      )  

      return response.data
    },
    enabled: !!user, 
    refetchOnWindowFocus: false, // Prevents refetching when user switches tabs
    refetchOnMount: false,       // Prevents refetching if the parent re-renders
    refetchOnReconnect: false,   // Prevents refetching if network drops and reconnects
    staleTime: Infinity,         // Treats the data as fresh indefinitely
    gcTime: 1000 * 60 * 30,
  })
}