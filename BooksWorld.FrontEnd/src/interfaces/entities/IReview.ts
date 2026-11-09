export interface IReview 
{
  id: number
  userId: string
  bookId: number
  userName: string
  grade: 1 | 2 | 3 | 4 | 5,
  comment?: string
}