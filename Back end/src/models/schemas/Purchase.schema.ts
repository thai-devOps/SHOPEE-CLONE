import { ObjectId } from 'mongodb'

export const STATUS_PURCHASE = {
  IN_CART: -1, // Product is in cart
  ALL: 0, // All status of purchase (include in cart)
  WAIT_FOR_CONFIRMATION: 1, // Wait for confirmation from admin to buy product (after user click buy button)
  WAIT_FOR_GETTING: 2, // Wait for getting product (after admin confirm)
  IN_PROGRESS: 3, // Product is in progress (after admin confirm)
  DELIVERED: 4, // Product is delivered (after admin confirm)
  CANCELLED: 5 // Product is cancelled (after admin confirm)
}

interface PurchaseType {
  _id?: ObjectId
  user_id: ObjectId
  product_id: ObjectId
  buy_count: number
  status: number
  price: number
  price_before_discount: number
  created_at?: string
  updated_at?: string
}
export class Purchase {
  _id?: ObjectId
  user_id: ObjectId
  product_id: ObjectId
  buy_count: number
  status: number
  price: number
  price_before_discount: number
  created_at?: string
  updated_at?: string
  constructor(purchase: PurchaseType) {
    this._id = purchase._id || new ObjectId()
    this.user_id = purchase.user_id
    this.product_id = purchase.product_id
    this.buy_count = purchase.buy_count
    this.status = purchase.status
    this.price = purchase.price
    this.price_before_discount = purchase.price_before_discount
    this.created_at = purchase.created_at || new Date().toISOString()
    this.updated_at = purchase.updated_at || new Date().toISOString()
  }
}
