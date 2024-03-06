import { Request, Response } from 'express'
import { TokenPayload } from '~/models/requests/users.request'
import orderService from '~/services/orders.services'
import productService from '~/services/products.services'
import purchaseService from '~/services/purchases.services'

const orderProduct = async (req: Request, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const { product_id, buy_count, payment_method, total_price } = req.body
  const product = await productService.getProductById(product_id)
  if (!product) {
    return res.status(400).json({ message: 'Sản phẩm không tồn tại' })
  }
  if (product.quantity < buy_count) {
    return res.status(400).json({ message: 'Số lượng sản phẩm trong kho không đủ để cung cấp' })
  }
  const result = await purchaseService.checkout(user_id, product_id, buy_count)
  if (!result) {
    return res.status(500).json({ message: 'Lỗi hệ thống' })
  }
  const orderResult = await orderService.createOrder(user_id, {
    product_id,
    buy_count,
    payment_method,
    total_price
  })
  if (!orderResult) {
    return res.status(500).json({ message: 'Lỗi hệ thống' })
  }
  // delete product in cart after checkout
  await purchaseService.removeProductFromCart(user_id, product_id)
  return res.status(200).json({ message: 'Đặt hàng thành công' })
}
const getOrders = async (req: Request, res: Response) => {
  const orders = await orderService.getOrders()
  if (!orders) {
    return res.status(500).json({ message: 'Lỗi hệ thống' })
  }
  return res.status(200).json({ message: 'Lấy danh sách đơn hàng thành công', data: orders })
}
const getOrderUserByStatus = async (req: Request, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const { status } = req.query
  const orderStatus = parseInt(status as string)
  const orders = await orderService.getOrderByStatus(user_id, orderStatus)
  if (!orders) {
    return res.status(500).json({ message: 'Lỗi hệ thống' })
  }
  return res.status(200).json({ message: 'Lấy danh sách đơn hàng thành công', data: orders })
}
const updateOrderStatus = async (req: Request, res: Response) => {
  const { id } = req.params
  const { status } = req.body
  const order = await orderService.updateOrderStatus(id, status)
  if (!order) {
    return res.status(500).json({ message: 'Lỗi hệ thống' })
  }
  return res.status(200).json({ message: 'Cập nhật trạng thái đơn hàng thành công', data: order })
}
const deleteOrderById = async (req: Request, res: Response) => {
  const { id } = req.params
  const order = await orderService.deleteOrderById(id)
  if (!order) {
    return res.status(500).json({ message: 'Lỗi hệ thống' })
  }
  return res.status(200).json({ message: 'Xóa đơn hàng thành công', data: order })
}
const orderController = {
  orderProduct,
  getOrders,
  getOrderUserByStatus,
  updateOrderStatus,
  deleteOrderById
}
export default orderController
