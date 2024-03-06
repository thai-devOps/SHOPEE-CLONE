import { Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import { ORDER, SORT_BY } from '~/constants/product'
import { Product } from '~/models/schemas/Product.schema'
import categoryService from '~/services/categories.services'
import databaseServices from '~/services/database.services'
import productService from '~/services/products.services'
import { responseSuccess } from '~/utils/response'

const createProduct = async (req: Request, res: Response) => {
  const { name, image, price, quantity, category, images, rating, price_before_discount, sold, view } = req.body
  const result = await productService.createProduct({
    name,
    image,
    price,
    quantity,
    category,
    images,
    rating,
    price_before_discount,
    sold,
    view
  })
  responseSuccess(res, {
    message: 'Create product successfully',
    data: {
      result
    }
  })
}

/**
 * decription: Get all products paginate
 */
const getProducts = async (req: Request, res: Response) => {
  const { rating_filter, price_max, exclude, price_min, name, category } = req.query as {
    [key: string]: string | number
  }
  // convert string to number
  const ratingFilter = parseInt(rating_filter as string) || 1
  let { sort_by, order, page, limit } = req.query as { [key: string]: string | number }
  const condition: any = {}
  page = Number(page) || 1
  limit = Number(limit) || 1000
  if (rating_filter) {
    condition.rating = { $gte: ratingFilter }
  }
  if (price_min && price_max) {
    condition.price = { $gte: Number(price_min), $lte: Number(price_max) }
  }
  if (category) {
    const categoryDocument = await databaseServices.categories.findOne({ _id: new ObjectId(category as string) })
    if (!categoryDocument) {
      throw new Error('Category not found')
    }
    condition.category = {
      _id: new ObjectId(category as string),
      name: categoryDocument.name
    }
  }
  if (name) {
    condition.name = { $regex: name, $options: 'i' }
  }
  if (exclude) {
    condition._id = { $nin: exclude }
  }
  if (!ORDER.includes(order as string)) {
    order = ORDER[0]
  }
  if (!SORT_BY.includes(sort_by as string)) {
    sort_by = SORT_BY[0]
  }
  const result = await productService.getProducts({
    condition,
    sort_by: sort_by as string,
    order: order as string,
    page,
    limit
  })
  responseSuccess(res, {
    message: 'Get products successfully',
    data: result
  })
}

/**
 * decription: Get all products by category
 */

const getAllProducts = async (req: Request, res: Response) => {
  const { category } = req.query
}

/**
 * description: Update a product by id
 * method: PUT
 * path: /api/products/:id
 */
const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params
  const product: Product = req.body
  const result = await productService.updateProduct(id, product)
  responseSuccess(res, {
    message: 'Update product successfully',
    data: result
  })
}

/**
 * description: Delete a product by id
 */
const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params
  await productService.deleteProduct(id)
  responseSuccess(res, {
    message: 'Delete product successfully'
  })
}

const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await productService.getProductById(id)
  responseSuccess(res, {
    message: 'Get product successfully',
    data: result
  })
}

const productController = {
  createProduct,
  getProducts,
  getAllProducts,
  deleteProduct,
  getProductById,
  updateProduct
}
export default productController
