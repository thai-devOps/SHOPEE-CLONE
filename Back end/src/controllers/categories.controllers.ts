import categoryService from '~/services/categories.services'
import { responseSuccess } from '~/utils/response'
import { Request, Response } from 'express'
const getCategoríes = async (req: Request, res: Response) => {
  const result = await categoryService.getCategories()
  responseSuccess(res, {
    data: result,
    message: 'Get categories successfully'
  })
}
// create a new category
const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body
  const result = await categoryService.createCategory(name)
  responseSuccess(res, {
    data: result,
    message: 'Create category successfully'
  })
}

// update a category
const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params
  const { name } = req.body
  const result = await categoryService.updateCategory(id, name)
  responseSuccess(res, {
    data: result,
    message: 'Update category successfully'
  })
}

// delete a category
const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await categoryService.deleteCategory(id)
  responseSuccess(res, {
    data: result,
    message: 'Delete category successfully'
  })
}

const categoryController = {
  getCategoríes,
  createCategory,
  updateCategory,
  deleteCategory
}
export default categoryController
