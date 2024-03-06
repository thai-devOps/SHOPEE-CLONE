export const OrderStatus = {
  WAIT_FOR_CONFIRM: 0, // Đang chờ xác nhận
  WAIT_FOR_GETTING: 1, // Đang lấy hàng
  IN_PROGRESS: 2, // Vận chuyển
  COMPLETED: 3, // Hoàn thành
  CANCELLED: -1 // Đã hủy
} as const

export interface Order {
  _id: string
  user_id: string
  product_id: string
  buy_count: number
  status: number
  order_date: string
  total_price: number
  created_at?: string
  updated_at?: string
}
