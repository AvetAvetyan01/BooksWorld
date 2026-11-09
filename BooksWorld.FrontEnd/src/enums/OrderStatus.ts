export const OrderStatus = {
  pending: 1,
  paymentAwait: 2,
  paymentConfirmed: 3,
  processing: 4,
  completed: 5
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];