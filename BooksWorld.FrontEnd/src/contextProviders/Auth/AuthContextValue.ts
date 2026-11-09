import type { Dispatch, SetStateAction } from "react"
import type { IUser } from "../../interfaces/entities/IUser"

export type AuthContextValue = {
  user: IUser | null
  anonymousUserLikeds: number[] 
  setUser: Dispatch<SetStateAction<IUser | null>>
  setAnonymousUserLikeds: Dispatch<SetStateAction<number[]>>
  isBookLiked: (bookId: number) => boolean
  subbookIsInCart: (subbookId: number) => boolean
  subbookCountInCart: (subbookId: number) => number
}