import { config } from 'dotenv'
config()

export const configEnv = {
  PORT: process.env.PORT || 3000,
  EXPIRE_ACCESS_TOKEN: '100d',
  EXPIRE_REFRESH_TOKEN: '365d',
  DB_USERNAME: process.env.DB_USERNAME || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || 'root',
  DB_CATEGORIES_COLLECTION: process.env.DB_CATEGORIES_COLLECTION || '',
  DB_PURCHASES_COLLECTION: process.env.DB_PURCHASES_COLLECTION || '',
  DB_NAME: process.env.DB_NAME || '',
  SECRET_KEY_ACCESS_TOKEN: process.env.SECRET_KEY_ACCESS_TOKEN || '',
  SECRET_KEY_REFRESH_TOKEN: process.env.SECRET_KEY_REFRESH_TOKEN || '',
  PASSWORD_SECRET: process.env.PASSWORD_SECRET || '',
  DB_USERS_COLLECTION: process.env.DB_USERS_COLLECTION || '',
  DB_REFRESH_TOKENS_COLLECTION: process.env.DB_REFRESH_TOKENS_COLLECTION || '',
  DB_PRODUCTS_COLLECTION: process.env.DB_PRODUCTS_COLLECTION || '',
  DB_ORDERS_COLLECTION: process.env.DB_ORDERS_COLLECTION || '',
  uri: process.env.MONGO_URI || ''
}
