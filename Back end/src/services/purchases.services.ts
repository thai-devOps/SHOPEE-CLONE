import { ObjectId } from 'mongodb'
import databaseServices from './database.services'
import { Purchase, STATUS_PURCHASE } from '~/models/schemas/Purchase.schema'

/**
 * Flow to add product to cart:
 * 1. Check if product is in cart
 * 2. If product is in cart, update buy_count of product in cart
 * 3. If product is not in cart, add product to cart
 * 4. If product is in cart but buy_count = 0, remove product from cart
 * 5. If product is in cart but buy_count < 0, set buy_count = 0 (remove product from cart)
 * 6. If product is in cart but buy_count > product.quantity, set buy_count = product.quantity
 */

class PurchaseService {
  public async getProductInCart(user_id: string, product_id: string) {
    // Get product in cart
    const result = await databaseServices.purchases.findOne({
      user_id: new ObjectId(user_id),
      product_id: new ObjectId(product_id)
    })
    return result
  }
  // update buy_count of product in cart (if product is in cart)

  public async updateProductInCart(user_id: string, product_id: string, buy_count: number) {
    const productDetail = await databaseServices.products.findOne({ _id: new ObjectId(product_id) })
    if (!productDetail) {
      return null
    }
    const result = await databaseServices.purchases.updateOne(
      {
        user_id: new ObjectId(user_id),
        product_id: new ObjectId(product_id)
      },
      {
        $set: {
          buy_count,
          price: productDetail.price * buy_count,
          updated_at: new Date().toISOString()
        }
      }
    )
    // find purchase after update
    const updatedProductInCart = await databaseServices.purchases.findOne({
      user_id: new ObjectId(user_id),
      product_id: new ObjectId(product_id)
    })
    return updatedProductInCart
  }
  public async addProductToCart(user_id: string, product_id: string, buy_count: number) {
    const productDetail = await databaseServices.products.findOne({ _id: new ObjectId(product_id) })
    if (!productDetail) {
      return null
    }
    // Handle if buy_count > product.quantity
    if (buy_count > productDetail.quantity) {
      buy_count = productDetail.quantity
    }
    const result = await databaseServices.purchases.insertOne(
      new Purchase({
        product_id: new ObjectId(product_id),
        user_id: new ObjectId(user_id),
        buy_count,
        status: STATUS_PURCHASE.IN_CART,
        price: productDetail.price * buy_count,
        price_before_discount: productDetail.price_before_discount
      })
    )
    // find purchase after insert
    const newProductInCart = await databaseServices.purchases.findOne({
      user_id: new ObjectId(user_id),
      product_id: new ObjectId(product_id)
    })
    return newProductInCart
  }
  public async getProductsInCart(user_id: string, status: string) {
    const query = {
      user_id: new ObjectId(user_id),
      status: status ? parseInt(status) : STATUS_PURCHASE.IN_CART
    }
    const result = await databaseServices.purchases
      .find(query)
      .sort({
        created_at: -1
      })
      .toArray()
    return result
  }
  public async removeProductFromCart(user_id: string, product_id: string) {
    const result = await databaseServices.purchases.deleteOne({
      user_id: new ObjectId(user_id),
      product_id: new ObjectId(product_id)
    })
    return result
  }
  public async checkout(user_id: string, product_id: string, buy_count: number) {
    const productDetail = await databaseServices.products.findOne({ _id: new ObjectId(product_id) })
    if (!productDetail) {
      return null
    }
    // Handle if buy_count > product.quantity
    if (buy_count > productDetail.quantity) {
      buy_count = productDetail.quantity
    }
    const result = await databaseServices.purchases.updateOne(
      {
        user_id: new ObjectId(user_id),
        product_id: new ObjectId(product_id)
      },
      {
        $set: {
          buy_count,
          status: STATUS_PURCHASE.WAIT_FOR_CONFIRMATION,
          price: productDetail.price * buy_count,
          updated_at: new Date().toISOString()
        }
      }
    )
    return result
  }
  public async getPurchaseById(id: string) {
    const result = await databaseServices.purchases.findOne({ _id: new ObjectId(id) })
    return result
  }
  public async getPurchaseByProductId(user_id: string, product_id: string) {
    const result = await databaseServices.purchases.findOne({
      user_id: new ObjectId(user_id),
      product_id: new ObjectId(product_id)
    })
    return result
  }
}

const purchaseService = new PurchaseService()
export default purchaseService
