import { Request, Response } from 'express'
import { TokenPayload } from '~/models/requests/users.request'
import productService from '~/services/products.services'
import purchaseService from '~/services/purchases.services'
import { responseSuccess } from '~/utils/response'

const addToCartController = async (req: Request, res: Response) => {
  const { product_id, buy_count } = req.body
  const { user_id } = req.decoded_authorization as TokenPayload
  const product = await productService.getProductById(product_id)
  if (!product) {
    return res.status(400).json({ message: 'Sản phẩm không tồn tại' })
  }
  if (product.quantity < buy_count) {
    return res.status(400).json({ message: 'Số lượng sản phẩm trong kho không đủ để cung cấp' })
  }
  //Check if product is in cart
  const productInCart = await purchaseService.getProductInCart(user_id, product_id)
  if (productInCart) {
    const buyCount =
      productInCart.buy_count + buy_count > product.quantity ? product.quantity : productInCart.buy_count + buy_count
    const updatedProductInCart = await purchaseService.updateProductInCart(user_id, product_id, buyCount)
    if (!updatedProductInCart) {
      return res.status(500).json({ message: 'Lỗi hệ thống' })
    }
    return res.status(200).json({ message: 'Cập nhật sản phẩm vào giỏ hàng thành công', data: updatedProductInCart })
  } else {
    const newProductInCart = await purchaseService.addProductToCart(user_id, product_id, buy_count)
    if (!newProductInCart) {
      return res.status(500).json({ message: 'Lỗi hệ thống' })
    }
    return res.status(200).json({ message: 'Thêm sản phẩm vào giỏ hàng thành công', data: newProductInCart })
  }
}

const getProductsInCartController = async (req: Request, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const { status } = req.query
  const productsInCart = await purchaseService.getProductsInCart(user_id, status as string)
  if (!productsInCart) {
    return res.status(500).json({ message: 'Lỗi hệ thống' })
  }
  responseSuccess(res, {
    message: 'Lấy danh sách sản phẩm trong giỏ hàng thành công',
    data: productsInCart
  })
}

const updateBuyCountController = async (req: Request, res: Response) => {
  const { product_id, buy_count } = req.body
  const { user_id } = req.decoded_authorization as TokenPayload
  const product = await productService.getProductById(product_id)
  if (!product) {
    return res.status(400).json({ message: 'Sản phẩm không tồn tại' })
  }
  if (product.quantity < buy_count) {
    return res.status(400).json({ message: 'Số lượng sản phẩm trong kho không đủ để cung cấp' })
  }
  const updatedProductInCart = await purchaseService.updateProductInCart(user_id, product_id, buy_count)
  if (!updatedProductInCart) {
    return res.status(500).json({ message: 'Lỗi hệ thống' })
  }
  return res.status(200).json({ message: 'Cập nhật số lượng sản phẩm trong giỏ hàng thành công' })
}
const removeFromCartController = async (req: Request, res: Response) => {
  const { product_id } = req.body
  const { user_id } = req.decoded_authorization as TokenPayload
  const product = await productService.getProductById(product_id)
  if (!product) {
    return res.status(400).json({ message: 'Sản phẩm không tồn tại' })
  }
  const result = await purchaseService.removeProductFromCart(user_id, product_id)
  if (!result) {
    return res.status(500).json({ message: 'Lỗi hệ thống' })
  }
  return res.status(200).json({ message: 'Xóa sản phẩm khỏi giỏ hàng thành công' })
}
const buyProductController = async (req: Request, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const { product_id, buy_count } = req.body
  const product = await productService.getProductById(product_id)
  if (!product) {
    return res.status(400).json({ message: 'Sản phẩm không tồn tại' })
  }
  if (product.quantity < buy_count) {
    return res.status(400).json({ message: 'Số lượng sản phẩm trong kho không đủ để cung cấp' })
  }
  const result = await purchaseService.checkout(user_id, product_id, buy_count)
  if (!result) {
    return res.status(500).json({ message: 'Lỗi hệ thống' })
  }
  return res.status(200).json({ message: 'Đặt phòng thành công' })
}

const getPurchaseByIdController = async (req: Request, res: Response) => {
  const { id } = req.params
  const purchase = await purchaseService.getPurchaseById(id)
  if (!purchase) {
    return res.status(400).json({ message: 'Đơn hàng không tồn tại' })
  }
  return res.status(200).json({ message: 'Lấy thông tin đơn hàng thành công', data: purchase })
}
const getPurchaseByProductIdController = async (req: Request, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const { product_id } = req.params
  res.json({ user_id, product_id })
  const purchase = await purchaseService.getPurchaseByProductId(user_id, product_id)
  if (!purchase) {
    return res.status(400).json({ message: 'Đơn hàng không tồn tại' })
  }
  return res.status(200).json({ message: 'Lấy thông tin đơn hàng thành công', data: purchase })
}

const purchaseController = {
  addToCartController,
  getProductsInCartController,
  updateBuyCountController,
  removeFromCartController,
  buyProductController,
  getPurchaseByIdController,
  getPurchaseByProductIdController
}
export default purchaseController
