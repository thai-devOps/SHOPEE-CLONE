import { ObjectId } from 'mongodb'

export const OrderStatus = {
  WAIT_FOR_CONFIRM: 0,
  WAIT_FOR_GETTING: 1,
  IN_PROGRESS: 2,
  COMPLETED: 3,
  CANCELLED: -1
} as const

interface OrderType {
  _id?: ObjectId
  user_id: ObjectId
  product_id: ObjectId
  buy_count: number
  status?: number
  order_date?: string
  payment_method: string
  total_price: number
  created_at?: string
  updated_at?: string
}
export class Order {
  _id?: ObjectId
  user_id: ObjectId
  product_id: ObjectId
  buy_count: number
  status?: number
  order_date?: string
  payment_method: string
  total_price: number
  created_at?: string
  updated_at?: string
  constructor(order: OrderType) {
    const date = new Date().toISOString()
    this._id = order._id || new ObjectId()
    this.user_id = order.user_id
    this.product_id = order.product_id
    this.buy_count = order.buy_count
    this.status = order.status || OrderStatus.WAIT_FOR_CONFIRM
    this.payment_method = order.payment_method
    this.order_date = order.order_date || date
    this.total_price = order.total_price
    this.created_at = order.created_at || date
    this.updated_at = order.updated_at || date
  }
}
