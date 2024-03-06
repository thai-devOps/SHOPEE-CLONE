import { NextFunction, Request, Response } from 'express'
import { statusCode } from '~/constants/status'
import { TokenPayload } from '~/models/requests/users.request'
import userService from '~/services/users.services'
import { ErrorWithStatus } from '~/utils/Error'

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.decoded_authorization as TokenPayload
  const result = await userService.findUserByEmail(email)
  if (result && result.role === 'admin') {
    next()
  } else {
    throw new ErrorWithStatus({
      message: 'Bạn không có quyền truy cập',
      status: statusCode.FORBIDDEN
    })
  }
}

const helperMiddlewares = {
  isAdmin
}
export default helperMiddlewares
