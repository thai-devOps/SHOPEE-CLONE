import { MongoClient, Db, Collection } from 'mongodb'
import { configEnv } from '~/constants/config'
import { Category } from '~/models/schemas/Category.schema'
import { Order } from '~/models/schemas/Order.schema'
import { Product } from '~/models/schemas/Product.schema'
import { Purchase } from '~/models/schemas/Purchase.schema'
import { RefreshToken } from '~/models/schemas/RefreshToken.schema'
import { User } from '~/models/schemas/User.schema'
const uri = configEnv.uri
class DatabaseServices {
  private client: MongoClient
  private db: Db

  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(configEnv.DB_NAME)
  }

  async connect() {
    try {
      await this.db.command({ ping: 1 })
      console.log('Connected successfully to database server')
    } catch (error) {
      console.log('Could not connect to database server')
      throw error
    }
  }
  get users(): Collection<User> {
    return this.db.collection(configEnv.DB_USERS_COLLECTION)
  }
  get refresh_tokens(): Collection<RefreshToken> {
    return this.db.collection(configEnv.DB_REFRESH_TOKENS_COLLECTION)
  }
  get products(): Collection<Product> {
    return this.db.collection(configEnv.DB_PRODUCTS_COLLECTION)
  }
  get categories(): Collection<Category> {
    return this.db.collection(configEnv.DB_CATEGORIES_COLLECTION)
  }
  get purchases(): Collection<Purchase> {
    return this.db.collection(configEnv.DB_PURCHASES_COLLECTION)
  }
  get orders(): Collection<Order> {
    return this.db.collection(configEnv.DB_ORDERS_COLLECTION)
  }
}
const databaseServices = new DatabaseServices()
export default databaseServices
