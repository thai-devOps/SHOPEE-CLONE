import type { User } from '@/types/user'

export interface ResponseSuccess<T> {
  message: string
  data: T
}
export interface ResponseError<T> {
  message: string
  data?: T
}

export type Auth = ResponseSuccess<{
  access_token: string
  refresh_token: string
  user: User
}>
