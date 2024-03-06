import { Router } from 'express'
import orderController from '~/controllers/orders.controllers'
import { accessTokenValidator } from '~/middlewares/users.middlewares'
import { wrapAsync } from '~/utils/response'

const orderRouter = Router()

/**
 * description: order a product
 * method: POST
 * path: /api/orders
 * params: none
 * body: { product_id: string, buy_count: number, payment_method: string, total_price: number,  }
 */
orderRouter.post('/orders', accessTokenValidator, wrapAsync(orderController.orderProduct))

/**
 * description: Get all orders
 * method: GET
 * path: /api/orders
 * params: none
 */
orderRouter.get('/orders', accessTokenValidator, wrapAsync(orderController.getOrders))

/**
 * description: Update order status
 * method: PUT
 * path: /api/orders/:id
 * params: none
 * body: { status: number }
 */
orderRouter.put('/orders/:id', accessTokenValidator, wrapAsync(orderController.updateOrderStatus))
/**
 * description: Get order by id of user
 * method: GET
 * path: /api/orders/:id
 * params: none
 * body: {}
 * headers: { Authorization: Bearer ${token} }
 */
orderRouter.get('/orders-user', accessTokenValidator, wrapAsync(orderController.getOrderUserByStatus))

/**
 * description: delete order by id
 * method: DELETE
 * path: /api/orders/:id
 * params: none
 * body: {}
 * headers: { Authorization: Bearer ${token} }
 */
orderRouter.delete('/orders/:id', accessTokenValidator, wrapAsync(orderController.deleteOrderById))
export default orderRouter
