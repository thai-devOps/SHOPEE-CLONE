import { ObjectId } from 'mongodb'
import databaseServices from './database.services'

class CategoryService {
  // create a new category
  public async createCategory(name: string) {
    const result = await databaseServices.categories.insertOne({ name })
    return result
  }
  // get a category by id
  public async getCategoryById(id: string) {
    const result = await databaseServices.categories.findOne({ _id: new ObjectId(id) })
    return result
  }
  // get all categories
  public async getCategories() {
    const result = await databaseServices.categories.find().toArray()
    return result
  }
  // update a category
  public async updateCategory(id: string, name: string) {
    const result = await databaseServices.categories.updateOne({ _id: new ObjectId(id) }, { $set: { name } })
    return result
  }

  // delete a category
  public async deleteCategory(id: string) {
    const result = await databaseServices.categories.deleteOne({ _id: new ObjectId(id) })
    return result
  }
}
const categoryService = new CategoryService()
export default categoryService
