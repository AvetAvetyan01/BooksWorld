import type { ReactNode } from "react"
import type { IUser } from "../../interfaces/entities/IUser"
import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"

export function AuthProvider({ children } : { children : ReactNode }){
  const userName = "user"
  const anonymousUserLikedsName = "anonymousUserLikeds"

  const [user, setUser] = useState<IUser | null>(
    () => JSON.parse(localStorage.getItem(userName)!) || null) 

  const [anonymousUserLikeds, setAnonymousUserLikeds] = useState<number[]>(
    () => JSON.parse(localStorage.getItem(anonymousUserLikedsName)!) || [])
  
  useEffect(() => localStorage.setItem(userName, JSON.stringify(user)), 
  [user])
  
  useEffect(() => localStorage.setItem(anonymousUserLikedsName, JSON.stringify(anonymousUserLikeds)), 
  [anonymousUserLikeds])
  
  const isBookLiked = (bookId: number) => 
    (user ? user.likedBooksIds : anonymousUserLikeds)?.includes(bookId)

  const subbookIsInCart = (subbookId: number) => 
    Boolean(user?.cartBooks.find((b) => b.subbookId == subbookId)) 

  const subbookCountInCart = (subbookId: number) => 
    user?.cartBooks.find(b => b.subbookId == subbookId)?.quantity || 0
   
  const value = { 
    user,  
    anonymousUserLikeds, 
    setUser,
    setAnonymousUserLikeds,
    isBookLiked, 
    subbookIsInCart, 
    subbookCountInCart
  }

  return (
    <AuthContext.Provider value={value}> 
      {children}
    </AuthContext.Provider>
  )
}