import { OrderBody } from '~/models/requests/orders.request'
import databaseServices from './database.services'
import { Order } from '~/models/schemas/Order.schema'
import { ObjectId } from 'mongodb'

class OrderService {
  public createOrder = async (user_id: string, order: OrderBody) => {
    const result = await databaseServices.orders.insertOne(
      new Order({
        user_id: new ObjectId(user_id),
        product_id: new ObjectId(order.product_id as string),
        buy_count: order.buy_count as number,
        payment_method: order.payment_method as string,
        total_price: order.total_price as number
      })
    )
    return result
  }
  public getOrders = async () => {
    // const result = await databaseServices.orders.find().toArray()
    // get orders descending by order_date (newest first)
    const result = await databaseServices.orders.find().sort({ order_date: -1 }).toArray()
    return result
  }
  public getOrderByStatus = async (user_id: string, status: number) => {
    const result = await databaseServices.orders
      .find({
        user_id: new ObjectId(user_id),
        status
      })
      .sort({ order_date: -1 })
      .toArray()
    return result
  }
  public getOrderById = async (id: string) => {
    const result = await databaseServices.orders.findOne({
      _id: new ObjectId(id)
    })
    return result
  }
  public updateOrderStatus = async (id: string, status: number) => {
    // check status if status  === 3 completed -> update product quantity
    if (status === 3) {
      const orderDocument = await this.getOrderById(id)
      if (orderDocument) {
        const productDocument = await databaseServices.products.findOne({
          _id: new ObjectId(orderDocument.product_id)
        })
        if (productDocument) {
          const newQuantity = productDocument.quantity - orderDocument.buy_count
          await databaseServices.products.findOneAndUpdate(
            {
              _id: new ObjectId(orderDocument.product_id)
            },
            {
              $set: {
                quantity: newQuantity
              }
            }
          )
        }
      }
    }
    const result = await databaseServices.orders.findOneAndUpdate(
      {
        _id: new ObjectId(id)
      },
      {
        $set: {
          status
        }
      }
    )
    return result
  }
  public deleteOrderById = async (id: string) => {
    const result = await databaseServices.orders.findOneAndDelete({
      _id: new ObjectId(id)
    })
    return result
  }
}
const orderService = new OrderService()
export default orderService
