import { ObjectId } from 'mongodb'

interface CategoryType {
  _id?: ObjectId
  name: string
}
export class Category {
  _id?: ObjectId
  name: string
  constructor(category: CategoryType) {
    this._id = category._id || new ObjectId()
    this.name = category.name
  }
}
