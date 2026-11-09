import type { ICartBook } from "./ICartBook";

export interface IUser 
{
  id: string
  name: string
  email: string
  phone: string
  likedBooksIds: number[]
  cartBooks: ICartBook[]
}