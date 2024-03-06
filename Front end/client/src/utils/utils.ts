import axios, { AxiosError } from 'axios'
import { httpStatusCode } from './httpStatusCode'

export function isAxiosError<T>(err: unknown): err is AxiosError<T> {
  return axios.isAxiosError(err)
}
export function isAxiosUnprocessableEntityError<FormError>(
  err: unknown
): err is AxiosError<FormError> {
  return isAxiosError(err) && err.response?.status === httpStatusCode.UNPROCESSABLE_ENTITY
}
export function isAxiosUnauthorizedError<AuthorizedError>(
  err: unknown
): err is AxiosError<AuthorizedError> {
  return isAxiosError(err) && err.response?.status === httpStatusCode.UNAUTHORIZED
}
export function isAxiosAccessTokenExpired(err: unknown): boolean {
  return (
    isAxiosUnauthorizedError<{
      message: string
    }>(err) && err.response?.data.message === 'Access_token expired'
  )
}
export function convertUTCtoCustomFormat(utcTimestamp: string): string {
  const utcDate = new Date(utcTimestamp)
  const day = utcDate.getUTCDate()
  const month = utcDate.getUTCMonth() + 1 // Months are zero-based, so we add 1
  const year = utcDate.getUTCFullYear()

  // Create a string in the desired format
  const formattedDate = `${day.toString().padStart(2, '0')}-${month
    .toString()
    .padStart(2, '0')}-${year}`

  return formattedDate
}

export function formatDate(inputDate: string): string {
  const [year, month, day] = inputDate.split('-')
  const formattedDate = `${day}-${month}-${year}`
  return formattedDate
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('de-DE').format(amount)
}
export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
}
export function rateSalePrice(price: number, salePrice: number) {
  return Math.round(((price - salePrice) / price) * 100)
}
// convert vnd to usd
export function convertVNDtoUSD(amount: number) {
  // Làm tròn đến 2 chữ số thập phân
  return Math.round(amount / 23000)
}
