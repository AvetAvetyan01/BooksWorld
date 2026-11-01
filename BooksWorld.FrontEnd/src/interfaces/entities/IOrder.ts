import type { OrderStatus } from "../../enums/OrderStatus"
import type { Currency } from "../../types/unions/Currency"
import type { IOrderItem } from "./IOrderItem"

export interface IOrder
{
  id: number
  userId: string
  status: OrderStatus
  totalAmount: number
  currency: Currency
  shippingAddress?: string
  description?: string
  createdAt: Date
  stripeCheckoutSessionId: string
  orderItems?: IOrderItem[]
}