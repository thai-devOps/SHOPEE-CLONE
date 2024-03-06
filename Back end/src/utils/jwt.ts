import jwt, { SignOptions } from 'jsonwebtoken'
import { ErrorHandler } from './response'
import { statusCode } from '~/constants/status'
import { TokenPayload } from '~/models/requests/users.request'

// export const signToken = (
//   payload: string | object | Buffer,
//   secretKey: string,
//   token_life: number | string
// ): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     jwt.sign(payload, secretKey, { expiresIn: token_life }, (err, token) => {
//       if (err) reject(err)
//       resolve(token as string)
//     })
//   })
// }
export const signToken = ({
  payload,
  secretKey,
  options = {
    algorithm: 'HS256'
  }
}: {
  payload: string | object | Buffer
  secretKey: string
  options?: SignOptions
}) =>
  new Promise<string>((resolve, reject) => {
    jwt.sign(payload, secretKey, options, (err, token) => {
      if (err) reject(err)
      resolve(token as string)
    })
  })

export const verifyToken = ({ token, secretKey }: { token: string; secretKey: string }) => {
  return new Promise<TokenPayload>((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        throw reject(err)
      }
      resolve(decoded as TokenPayload)
    })
  })
}

// Verify token
// export const verifyToken = (token: string, token_type: string, secretKey: string) => {
//   return new Promise<string | object>((resolve, reject) => {
//     jwt.verify(token, secretKey, (err, decoded) => {
//       if (err) {
//         if (err.name === 'TokenExpiredError') {
//           reject(
//             new ErrorHandler(statusCode.UNAUTHORIZED, {
//               message: token_type + ' hết hạn',
//               name: token_type.toUpperCase() + '_EXPIRED'
//             })
//           )
//         } else
//           reject(
//             new ErrorHandler(statusCode.UNAUTHORIZED, {
//               message: token_type + ' không hợp lệ',
//               name: token_type.toUpperCase() + '_INVALID'
//             })
//           )
//       }
//       resolve(decoded as object)
//     })
//   })
// }
