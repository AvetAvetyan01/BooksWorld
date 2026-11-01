import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../contexts/useAuth"; 
import axios from "axios";

export function useLikeBook(){
  const { user, setUser, anonymousUserLikeds, setAnonymousUserLikeds } = useAuth()
  
  return useMutation({
    mutationKey: ['POST', 'likeds'],
    mutationFn: async (bookId: number) => {
      // 1. Որոշակի վալիդացիաններ կներառենք որպեսզի չխափանվի սխալ ներմուծված կամ բրաուզերից փոփոխված տվյալներից
      if (!user) return bookId 

      await axios.post<number>(
        `${import.meta.env.VITE_API_URL}/likeds`, 
        { bookId: bookId },
        { withCredentials: true })
      
      return bookId
    },
    onSuccess: (bookId) => {
      const likeds = user ? user.likedBooksIds : anonymousUserLikeds
      const changedLikeds = [...likeds, bookId]

      if (user) setUser({ ...user, likedBooksIds: changedLikeds })
      else      setAnonymousUserLikeds(changedLikeds)
    }
  })
}