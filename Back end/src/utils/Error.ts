import responseMessage from '~/constants/message'
import { statusCode } from '~/constants/status'

type ErrorsType = Record<
  string,
  {
    msg: string
    [key: string]: any
  }
>
export class ErrorWithStatus {
  message: string
  status: number
  constructor({ message, status }: { message: string; status: number }) {
    this.message = message
    this.status = status
  }
}

export class EntityError extends ErrorWithStatus {
  errors: ErrorsType
  constructor({
    message = responseMessage.error.unprocessableEntity.default,
    errors
  }: {
    message?: string
    errors: ErrorsType
  }) {
    super({ message, status: statusCode.UNPROCESSABLE_ENTITY })
    this.errors = errors
  }
}
