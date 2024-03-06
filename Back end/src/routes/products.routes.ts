import { Router } from 'express'
import { accessTokenValidator } from '~/middlewares/users.middlewares'
import productController from '~/controllers/products.controllers'
import { wrapAsync } from '~/utils/response'
const productRouter = Router()

/**
 * description: Create a new product
 * method: POST
 * path: /api/products
 * body: { name, price, quantity, category_name, images, rating, price_before_discount, sold, view }
 * headers: { Authorization: Bearer ${token} }
 */

productRouter.post('/products', accessTokenValidator, wrapAsync(productController.createProduct))

/**
 * decription: Get all products
 * method: GET
 * path: /api/products
 * body: {}
 */
productRouter.get('/products', accessTokenValidator, wrapAsync(productController.getProducts))

/**
 * decription: Get a product by id
 * method: GET
 * path: /api/products/:id
 */
productRouter.get('/products/:id', accessTokenValidator, wrapAsync(productController.getProductById))
/**
 * decription: Update a product by id
 * method: PUT
 * path: /api/products/:id
 * body: { name, price, quantity, category_name, images, rating, price_before_discount, sold, view }
 */
productRouter.put('/products/:id', accessTokenValidator, wrapAsync(productController.updateProduct))
/**
 * description: Delete a product by id
 * method: DELETE
 * path: /api/products/:id
 * body: {}
 */
productRouter.delete('/products/:id', accessTokenValidator, wrapAsync(productController.deleteProduct))

export default productRouter
