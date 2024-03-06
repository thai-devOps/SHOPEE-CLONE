export const STATUS_PURCHASE = {
  IN_CART: -1, // Product is in cart
  ALL: 0, // All status of purchase (include in cart)
  WAIT_FOR_CONFIRMATION: 1, // Wait for confirmation from admin to buy product (after user click buy button)
  WAIT_FOR_GETTING: 2, // Wait for getting product (after admin confirm)
  IN_PROGRESS: 3, // Product is in progress (after admin confirm)
  DELIVERED: 4, // Product is delivered (after admin confirm)
  CANCELLED: 5 // Product is cancelled (after admin confirm)
}

export interface PurchaseType {
  _id: string
  user_id: string
  product_id: string
  buy_count: number
  status: number
  price: number
  price_before_discount: number
  created_at?: string
  updated_at?: string
}
