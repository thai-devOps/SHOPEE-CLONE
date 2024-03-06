import { Request } from 'express'
import { ErrorHandler } from './response'
import { statusCode } from '~/constants/status'
import responseMessage from '~/constants/message'
import { verifyToken } from './jwt'
import { configEnv } from '~/constants/config'
import { capitalize } from 'lodash'
import { JsonWebTokenError } from 'jsonwebtoken'

export const verifyAccessToken = async (access_token: string, req?: Request) => {
  if (!access_token) {
    throw new ErrorHandler(statusCode.UNAUTHORIZED, responseMessage.error.unauthorized.access_token_empty)
  }
  try {
    const decoded_authorization = await verifyToken({
      token: access_token,
      secretKey: configEnv.SECRET_KEY_ACCESS_TOKEN
    })
    if (req) {
      ;(req as Request).decoded_authorization = decoded_authorization
    }
    return decoded_authorization
  } catch (err) {
    throw new ErrorHandler(
      statusCode.UNAUTHORIZED,
      capitalize((err as JsonWebTokenError).message.replace('jwt', 'access_token'))
    )
  }
}
