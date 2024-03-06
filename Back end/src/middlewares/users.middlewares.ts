import { NextFunction, Request, Response } from 'express'
import { checkSchema } from 'express-validator'
import { JsonWebTokenError } from 'jsonwebtoken'
import { capitalize } from 'lodash'
import { configEnv } from '~/constants/config'
import responseMessage from '~/constants/message'
import { statusCode } from '~/constants/status'
import { token_type } from '~/constants/tokenType'
import databaseServices from '~/services/database.services'
import refreshTokenService from '~/services/refresh_tokens.services'
import userService from '~/services/users.services'
import hashPassword from '~/utils/crypto'
import hashToken from '~/utils/hashToken'
import { verifyToken } from '~/utils/jwt'
import { ErrorHandler } from '~/utils/response'
import { validateSchema } from '~/utils/validateSchema'
import { ParamsDictionary } from 'express-serve-static-core'
import { verifyAccessToken } from '~/utils/commons'
import { TokenPayload } from '~/models/requests/users.request'

export const signUpValidator = validateSchema(
  checkSchema(
    {
      email: {
        notEmpty: {
          errorMessage: responseMessage.error.unprocessableEntity.email.empty
        },
        isString: {
          errorMessage: responseMessage.error.unprocessableEntity.email.invalid
        },
        isEmail: {
          errorMessage: responseMessage.error.unprocessableEntity.email.invalid
        },
        trim: true,
        custom: {
          options: async (value, { req }) => {
            const isEmailExist = await userService.checkEmailExist(value)
            if (isEmailExist)
              throw new ErrorHandler(statusCode.CONFLICT, responseMessage.error.unprocessableEntity.email.existed)
            return true
          }
        }
      },
      password: {
        notEmpty: {
          errorMessage: responseMessage.error.unprocessableEntity.password.empty
        },
        isLength: {
          options: { min: 6 },
          errorMessage: responseMessage.error.unprocessableEntity.password.invalid
        },
        trim: true,
        isStrongPassword: {
          errorMessage: responseMessage.error.unprocessableEntity.password.weak
        }
      }
    },
    ['body']
  )
)
export const signInValidator = validateSchema(
  checkSchema(
    {
      email: {
        notEmpty: {
          errorMessage: responseMessage.error.unprocessableEntity.email.empty
        },
        isString: {
          errorMessage: responseMessage.error.unprocessableEntity.email.invalid
        },
        isEmail: {
          errorMessage: responseMessage.error.unprocessableEntity.email.invalid
        },
        trim: true,
        custom: {
          options: async (value, { req }) => {
            const user = await databaseServices.users.findOne({
              email: value,
              password: hashPassword(req.body.password)
            })
            if (!user)
              throw new ErrorHandler(
                statusCode.NOT_FOUND,
                responseMessage.error.unprocessableEntity.incorrect_password_or_email
              )
            const request = req as Request
            request.user = user
            return true
          }
        }
      },
      password: {
        notEmpty: {
          errorMessage: responseMessage.error.unprocessableEntity.password.empty
        },
        isLength: {
          options: { min: 6 },
          errorMessage: responseMessage.error.unprocessableEntity.password.invalid
        },
        trim: true,
        isStrongPassword: {
          errorMessage: responseMessage.error.unprocessableEntity.password.weak
        }
      }
    },
    ['body']
  )
)

export const accessTokenValidator = validateSchema(
  checkSchema(
    {
      Authorization: {
        custom: {
          options: async (value: string, { req }) => {
            const accessToken = (value || '').split(' ')[1]
            return await verifyAccessToken(accessToken, req as Request)
          }
        }
      }
    },
    ['headers']
  )
)
export const refreshTokenValidator = validateSchema(
  checkSchema(
    {
      refresh_token: {
        trim: true,
        custom: {
          options: async (value: string, { req }) => {
            if (!value)
              throw new ErrorHandler(statusCode.UNAUTHORIZED, responseMessage.error.unauthorized.refresh_token_empty)
            try {
              const [decode_refresh_token, refresh_token] = await Promise.all([
                verifyToken({
                  token: value,
                  secretKey: configEnv.SECRET_KEY_REFRESH_TOKEN
                }),
                refreshTokenService.findRefreshToken(value)
              ])
              if (refresh_token === null) {
                throw new ErrorHandler(
                  statusCode.UNAUTHORIZED,
                  responseMessage.error.unauthorized.used_or_not_exitst_refresh_token
                )
              }
              const request = req as Request
              request.decoded_refresh_token = decode_refresh_token as TokenPayload
            } catch (error) {
              if (error instanceof JsonWebTokenError) {
                throw new ErrorHandler(
                  statusCode.UNAUTHORIZED,
                  capitalize(error.message.replace('jwt', 'refresh_token'))
                )
              }
              throw error
            }
          }
        }
      }
    },
    ['body']
  )
)
