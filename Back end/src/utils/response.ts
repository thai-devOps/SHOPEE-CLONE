import { Request, Response, NextFunction } from 'express'
import { statusCode } from '~/constants/status'
import { SuccessResponse } from '~/type'
import { ErrorThrow } from '~/type'
// Wrap async function to catch error
export const wrapAsync = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next)
  }
}

export class ErrorHandler {
  status: number
  error: string | ErrorThrow

  constructor(status: number, error: string | ErrorThrow) {
    this.status = status
    this.error = error
  }
}

export const responseError = async (res: Response, error: ErrorHandler | ErrorThrow | any) => {
  if (error instanceof ErrorHandler) {
    const status = error.status
    // Xử lý trường hợp lỗi là chuổi (string)
    if (typeof error.error === 'string') {
      const message = error.error
      return res.status(status).json({ message })
    }
    // Xử lý trường hợp lỗi là object
    if (typeof error.error === 'object') {
      const errorObject = error.error
      return res.status(status).json({
        message: 'Lỗi',
        data: errorObject
      })
    }
  }
  return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
    message: error.message
  })
}

export const responseSuccess = (res: Response, data: SuccessResponse) => {
  return res.status(statusCode.OK).json({
    message: data.message,
    data: data.data
  })
}
