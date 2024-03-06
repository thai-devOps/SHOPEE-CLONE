import { ObjectId } from 'mongodb'
import databaseServices from './database.services'
import { Product } from '~/models/schemas/Product.schema'
import { omit } from 'lodash'

class ProductService {
  public async createProduct({
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
  }: {
    name: string
    image: string
    price: number
    quantity: number
    category: string
    images: string[]
    rating: number
    price_before_discount: number
    sold: number
    view: number
  }) {
    const categoryDocument = await databaseServices.categories.findOne({ _id: new ObjectId(category) })
    if (!categoryDocument) {
      throw new Error('Category not found')
    }
    const result = await databaseServices.products.insertOne(
      new Product({
        name,
        image,
        price,
        quantity,
        category: {
          _id: new ObjectId(category),
          name: categoryDocument.name
        },
        images,
        rating,
        price_before_discount,
        sold,
        view
      })
    )
    return result
  }
  public async getProductById(id: string) {
    const product = await databaseServices.products.findOne({ _id: new ObjectId(id) })
    return product
  }
  public async getProducts({
    condition,
    sort_by,
    order,
    page,
    limit
  }: {
    condition: any
    sort_by: string
    order: string
    page: number
    limit: number
  }) {
    // console.log(condition)
    const [products, totalProducts] = await Promise.all([
      databaseServices.products
        .find(condition)
        .sort({
          [sort_by]: order === 'asc' ? 1 : -1
        })
        .skip((page - 1) * limit)
        .limit(limit)
        .toArray(),
      databaseServices.products.countDocuments(condition)
    ])
    return {
      products,
      paginate: {
        page,
        limit,
        totalItems: totalProducts,
        page_size: Math.ceil(totalProducts / limit)
      }
    }
  }
  // update a product
  public async updateProduct(id: string, data: Product) {
    const result = await databaseServices.products.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...omit(data, ['_id', 'createdAt']),
          updatedAt: new Date() // update updatedAt
        } // remove _id, createdAt, updatedAt from data
      }
    )
    return result
  }
  public async deleteProduct(id: string) {
    const result = await databaseServices.products.deleteOne({ _id: new ObjectId(id) })
    return result
  }
}
const productService = new ProductService()
export default productService
