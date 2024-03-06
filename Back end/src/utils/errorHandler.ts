import { Request, Response, NextFunction } from 'express'
import { responseError } from './response'

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  responseError(res, err)
}
