import type { Format } from "../../types/unions/Format"

export interface IOrderItem
{
  id: number
  orderId: number
  bookId: number
  subbookId: number
  format: Format
  quantity?: number
  unitPrice: number
  subtotal: number
  stripeCouponId?: string
  stripePriceId: string
}
