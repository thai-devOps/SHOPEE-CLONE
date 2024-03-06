import { NextFunction, Request, Response } from 'express'
import { ValidationChain, validationResult } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/src/middlewares/schema'
import { ErrorHandler, responseError } from './response'
import { statusCode } from '~/constants/status'
import { ErrorThrow } from '~/type'
export const validateSchema = (schema: RunnableValidationChains<ValidationChain>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await schema.run(req)
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    const errorsObject = errors.mapped()
    const entity_err: ErrorThrow = {}
    for (const key in errorsObject) {
      const { msg } = errorsObject[key]
      if (msg instanceof ErrorHandler && msg.status !== statusCode.UNPROCESSABLE_ENTITY) {
        return next(msg)
      }
      entity_err[key] = msg
    }

    next(new ErrorHandler(statusCode.UNPROCESSABLE_ENTITY, entity_err))
  }
}
