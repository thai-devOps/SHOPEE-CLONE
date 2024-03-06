import { Request, Response, Router } from 'express'
import {
  createAccountController,
  deleteUserAccountController,
  getAllUsersController,
  getUserByIdController,
  refreshTokenController,
  signInController,
  signOutController,
  signUpController,
  updateAccountController,
  updateProfileController
} from '~/controllers/users.controllers'
import {
  accessTokenValidator,
  refreshTokenValidator,
  signInValidator,
  signUpValidator
} from '~/middlewares/users.middlewares'
import helperMiddlewares from '~/middlewares/utils.middlewares'
import { wrapAsync } from '~/utils/response'

// Create userRouter
const userRouter = Router()

/**
 * decription: Sign up a new user
 * method: POST
 * path: /api/sign-up
 * body: {email: string, password: string}
 */
userRouter.post('/sign-up', signUpValidator, wrapAsync(signUpController))
/**
 * decription: Sign in a new user
 * method: POST
 * path: /api/sign-in
 * body: {email: string, password: string}
 */
userRouter.post('/sign-in', signInValidator, wrapAsync(signInController))

/**
 * decription: Sign out a user
 * method: POST
 * path: /api/sign-out
 * body: {email: string, password: string}
 */
userRouter.post('/sign-out', accessTokenValidator, refreshTokenValidator, wrapAsync(signOutController))

/**
 * decription: Refresh token
 * method: POST
 * path: /api/refresh-token
 * body: {refresh_token: string}
 */
userRouter.post('/refresh-token', refreshTokenValidator, wrapAsync(refreshTokenController))
/**
 * decription: Get all users
 * method: GET
 * path: /api/users
 * body: {}
 */
userRouter.get('/users', accessTokenValidator, helperMiddlewares.isAdmin, wrapAsync(getAllUsersController))
/**
 * decription: Update user profile
 * method: PUT
 * path: /api/profile
 */
userRouter.put('/profile', accessTokenValidator, wrapAsync(updateProfileController))

/**
 * decription: Update user account
 * method: PUT
 * path: /api/update-account
 * body: {}
 */

/**
 * decription: Create a account
 * method: post
 * path: /api/create-account
 * body: { User }
 */
userRouter.post(
  '/create-account',
  accessTokenValidator,
  signUpValidator,
  helperMiddlewares.isAdmin,
  wrapAsync(createAccountController)
)

userRouter.put(
  '/update-account/:id',
  accessTokenValidator,
  helperMiddlewares.isAdmin,
  wrapAsync(updateAccountController)
)
/**
 * decription: delete a account
 * method: DELETE
 * path: /api/delete-account
 * body: {}
 * params: {id: string}
 */
userRouter.delete(
  '/delete-account/:id',
  accessTokenValidator,
  helperMiddlewares.isAdmin,
  wrapAsync(deleteUserAccountController)
)
/**
 * decription: Get user by id
 * method: GET
 * path: /api/users/:id
 * body: {}
 * params: {id: string}
 */
userRouter.get('/users/:id', accessTokenValidator, wrapAsync(getUserByIdController))

export default userRouter
