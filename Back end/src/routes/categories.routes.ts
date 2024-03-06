import { Router } from 'express'
import categoryController from '~/controllers/categories.controllers'
import { wrapAsync } from '~/utils/response'

const categoryRouter = Router()
/**
 * decription: Get all categories
 * method: GET
 * path: /api/categories
 * body: {}
 */
categoryRouter.get('/categories', wrapAsync(categoryController.getCategoríes))
/**
 * decription: Create a new category
 * method: POST
 * path: /api/categories
 * body: { name: string }
 */
categoryRouter.post('/categories', wrapAsync(categoryController.createCategory))

/**
 * decription: Update a category
 * method: PUT
 * path: /api/categories/:id
 * body: { name: string }
 * params: { id: string }
 */
categoryRouter.put('/categories/:id', wrapAsync(categoryController.updateCategory))

/**
 * decription: delete a category
 * method: DELETE
 * path: /api/categories/:id
 */
categoryRouter.delete('/categories/:id', wrapAsync(categoryController.deleteCategory))
export default categoryRouter
