import { ObjectId } from 'mongodb'

interface RefreshTokenType {
  _id?: ObjectId
  user_id: ObjectId
  token: string
  exp: number
  iat: number
  createdAt?: Date
}
export class RefreshToken {
  _id?: ObjectId
  user_id: ObjectId
  token: string
  exp: Date
  iat: Date
  createdAt?: Date
  constructor(refreshToken: RefreshTokenType) {
    this._id = refreshToken._id || new ObjectId()
    this.user_id = refreshToken.user_id
    this.token = refreshToken.token
    this.exp = new Date(refreshToken.exp * 1000)
    this.iat = new Date(refreshToken.iat * 1000)
    this.createdAt = refreshToken.createdAt || new Date()
  }
}
