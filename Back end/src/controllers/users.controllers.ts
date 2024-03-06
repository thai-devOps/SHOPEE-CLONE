import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import responseMessage from '~/constants/message'
import { SignUp, TokenPayload, UpdateAccountBody } from '~/models/requests/users.request'
import userService from '~/services/users.services'
import { responseSuccess } from '~/utils/response'
import { SuccessResponse } from '~/type'
import { User } from '~/models/schemas/User.schema'
import { ObjectId } from 'mongodb'

export const signUpController = async (req: Request<ParamsDictionary, any, SignUp>, res: Response) => {
  const result = await userService.signUp(req.body)
  const data: SuccessResponse = {
    message: responseMessage.success.signup,
    data: result
  }
  responseSuccess(res, data)
}
export const signInController = async (req: Request<ParamsDictionary, any, SignUp>, res: Response) => {
  const user = req.user as User
  const user_id = user._id as ObjectId
  const result = await userService.signIn({
    user_id: user_id.toString(),
    email: user.email
  })
  const data: SuccessResponse = {
    message: responseMessage.success.signin,
    data: result
  }
  responseSuccess(res, data)
}

export const signOutController = async (
  req: Request<ParamsDictionary, any, { refresh_token: string }>,
  res: Response
) => {
  const { refresh_token } = req.body
  const result = await userService.signOut(refresh_token)
  return responseSuccess(res, {
    message: result
  })
}

export const refreshTokenController = async (
  req: Request<ParamsDictionary, any, { refresh_token: string }>,
  res: Response
) => {
  const { refresh_token } = req.body
  const { user_id, email, exp } = req.decoded_refresh_token as TokenPayload
  const result = await userService.refreshToken({ user_id, email, exp, refresh_token })
  responseSuccess(res, {
    message: responseMessage.success.refresh_token,
    data: result
  })
}
export const updateProfileController = async (req: Request, res: Response) => {
  const user: any = req.body
  const { user_id } = req.decoded_authorization as TokenPayload
  const result = await userService.updateProfile(user_id, user)
  responseSuccess(res, {
    message: responseMessage.success.update_profile,
    data: result
  })
}
export const updateAccountController = async (req: Request, res: Response) => {
  const user: UpdateAccountBody = req.body
  const { id } = req.params as { id: string }
  const result = await userService.updateAccount(id, user)
  responseSuccess(res, {
    message: responseMessage.success.update_account,
    data: result
  })
}

export const getAllUsersController = async (req: Request, res: Response) => {
  const result = await userService.getAllUsers()
  responseSuccess(res, {
    message: responseMessage.success.get_all_users,
    data: result
  })
}

export const deleteUserAccountController = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string }
  const result = await userService.deleteUserAccount(id)
  responseSuccess(res, {
    message: responseMessage.success.get_all_users,
    data: result
  })
}

export const createAccountController = async (req: Request, res: Response) => {
  const user: any = req.body
  const result = await userService.createAccount(user)
  responseSuccess(res, {
    message: responseMessage.success.get_all_users,
    data: result
  })
}
export const getUserByIdController = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string }
  const result = await userService.getUserById(id)
  responseSuccess(res, {
    message: responseMessage.success.get_all_users,
    data: result
  })
}
