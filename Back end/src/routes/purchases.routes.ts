import { Router } from 'express'
import purchaseController from '~/controllers/purchase.controllers'
import { accessTokenValidator } from '~/middlewares/users.middlewares'
import { wrapAsync } from '~/utils/response'

const purchaseRouter = Router()

/**
 * description: Add to cart a product
 * method: POST
 * path: /purchase/add-to-cart
 * params: none
 * body: { product_id: string, buy_count: number }
 */
purchaseRouter.post('/purchase/add-to-cart', accessTokenValidator, wrapAsync(purchaseController.addToCartController))

/**
 * description: Get all products in cart of user by user_id
 * method: GET
 * path: /purchase?status=${status}
 * params: none
 * body: {}
 * headers: { Authorization: Bearer ${token} }
 */
purchaseRouter.get('/purchases', accessTokenValidator, wrapAsync(purchaseController.getProductsInCartController))

/**
 * description: get purchase by id
 * method: GET
 * path: /purchase/:id
 * params: none
 * body: {}
 */

purchaseRouter.get('/purchases/:id', accessTokenValidator, wrapAsync(purchaseController.getPurchaseByIdController))

/**
 * description: Update buy_count of product in cart of user by user_id
 * method: PUT
 * path: /purchase/update-buy-count
 * params: none
 * body: { product_id: string, buy_count: number }
 */
purchaseRouter.put(
  '/purchase/update-buy-count',
  accessTokenValidator,
  wrapAsync(purchaseController.updateBuyCountController)
)
/**
 * description: Remove product from cart of user by user_id
 * method: DELETE
 * path: /purchase/remove-from-cart
 * params: none
 * body: { product_id: string }
 */
purchaseRouter.delete(
  '/purchase/remove-from-cart',
  accessTokenValidator,
  wrapAsync(purchaseController.removeFromCartController)
)
/**
 * description: Checkout product in cart of user by user_id
 * method: POST
 * path: /purchase
 * body: { product_id: string, buy_count: number }
 * headers: { Authorization: Bearer ${token} }
 */
purchaseRouter.post('/purchase/buy-product', accessTokenValidator, wrapAsync(purchaseController.buyProductController))

/**
 * description: Get purchase of user by product_id
 * method: GET
 * path: /purchase/:product_id
 * params: product_id
 * body: {}
 * headers: { Authorization: Bearer ${token} }
 */
purchaseRouter.get(
  '/purchase-product/:product_id',
  accessTokenValidator,
  wrapAsync(purchaseController.getPurchaseByProductIdController)
)

export default purchaseRouter
