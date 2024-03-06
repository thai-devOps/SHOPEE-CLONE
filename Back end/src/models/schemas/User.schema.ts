import { ObjectId } from 'mongodb'
import { role } from '~/constants/role'
interface UserType {
  _id?: ObjectId
  email: string
  password: string
  avatar?: string
  name?: string
  gender?: string
  date_of_birth?: string
  phone?: string
  address?: string
  role?: (typeof role)[keyof typeof role]
  createdAt?: Date
  updatedAt?: Date
}
export class User {
  _id?: ObjectId
  email: string
  password: string
  avatar?: string
  name?: string
  gender?: string
  date_of_birth?: string
  phone?: string
  address?: string
  role?: (typeof role)[keyof typeof role]
  createdAt?: Date
  updatedAt?: Date
  constructor(user: UserType) {
    const date = new Date()
    this._id = user._id || new ObjectId()
    this.email = user.email
    this.password = user.password
    this.avatar = user.avatar || ''
    this.name = user.name || ''
    this.role = user.role || role.USER
    this.gender = user.gender || ''
    this.date_of_birth = user.date_of_birth || ''
    this.phone = user.phone || ''
    this.address = user.address || ''
    this.createdAt = user.createdAt || date
    this.updatedAt = user.updatedAt || date
  }
}
