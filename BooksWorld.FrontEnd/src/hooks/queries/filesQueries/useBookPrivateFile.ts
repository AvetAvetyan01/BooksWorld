import { useUserBoughtSubbooks } from "../userQueries/useUserBoughtSubbooks";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../contexts/useAuth";
import axios from "axios";

type GetFileRequest = { subbookId?: number, isPaperbook: boolean }

export function useBookPrivateFile(props: GetFileRequest){
  const { user } = useAuth()
  const { data: boughtSubbooks } = useUserBoughtSubbooks()

  return useQuery({ 
    queryKey: ["GET", "book/file", props.subbookId],
    queryFn: async () => {
      const isSubbookBought = boughtSubbooks?.some(bs => bs.subbookId == props.subbookId)
      if (!isSubbookBought) return null

      const response = await axios.get<string>(
        `${import.meta.env.VITE_API_URL}/files/private/books/${props.subbookId}`,
        { withCredentials: true })

      return response
    },
    enabled: !!props.subbookId && !props.isPaperbook && !!user,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 15 // 15m
  }) 
}