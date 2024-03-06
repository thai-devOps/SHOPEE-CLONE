import { ObjectId } from 'mongodb'

interface ProductType {
  _id?: ObjectId
  images: string[]
  price: number
  rating: number
  price_before_discount: number
  quantity: number
  sold: number
  view: number
  name: string
  category: {
    _id: ObjectId
    name: string
  }
  image: string
  createdAt?: Date
  updatedAt?: Date
}
export class Product {
  _id?: ObjectId
  images: string[]
  price: number
  rating: number
  price_before_discount: number
  quantity: number
  sold: number
  view: number
  name: string
  category: {
    _id: ObjectId
    name: string
  }
  image: string
  createdAt?: Date
  updatedAt?: Date
  constructor(product: ProductType) {
    const date = new Date()
    this._id = product._id || new ObjectId()
    this.images = product.images
    this.price = product.price
    this.rating = product.rating
    this.price_before_discount = product.price_before_discount
    this.quantity = product.quantity
    this.sold = product.sold
    this.view = product.view
    this.name = product.name
    this.category = product.category
    this.image = product.image
    this.createdAt = product.createdAt || date
    this.updatedAt = product.updatedAt || date
  }
}
