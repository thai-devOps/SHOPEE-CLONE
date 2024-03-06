import { ObjectId } from 'mongodb'
import { Request } from 'express'
import { User } from './models/schemas/User.schema'
import { TokenPayload } from './models/requests/users.request'

interface ErrorThrow {
  [key: string]: string
}
interface SuccessResponse {
  message: string
  data?: any
}

declare module 'express' {
  interface Request {
    user?: User
    decoded_authorization?: TokenPayload
    decoded_refresh_token?: TokenPayload
  }
}
