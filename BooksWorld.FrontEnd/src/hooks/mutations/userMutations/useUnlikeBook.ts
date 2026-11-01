import { useMutation } from "@tanstack/react-query"
import { useAuth } from "../../contexts/useAuth"
import axios from "axios"

export function useUnlikeBook(){
  const { user, setUser, anonymousUserLikeds, setAnonymousUserLikeds } = useAuth()

  return useMutation({
    mutationKey: ['POST', 'likeds'],
    mutationFn: async (bookId: number) => {
      if (!user) return bookId

      // 1. Որոշակի վալիդացիաններ կներառենք որպեսզի չխափանվի 
      //    սխալ ներմուծված կամ բրաուզերից փոփոխված տվյալներից
      await axios.delete<number>(
        `${import.meta.env.VITE_API_URL}/likeds/${bookId}`,
        { withCredentials: true })
        
      return bookId;
    },
    onSuccess: (bookId) => {
      const likeds = user ? user.likedBooksIds : anonymousUserLikeds

      const bookIndex = likeds.indexOf(bookId)
      const changedLikeds = likeds?.slice(0, bookIndex).concat(likeds.slice(bookIndex + 1))
      
      if (user) setUser({...user, likedBooksIds : changedLikeds})   
      else      setAnonymousUserLikeds(changedLikeds)    
    }
  })
}