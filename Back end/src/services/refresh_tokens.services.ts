import databaseServices from './database.services'
import { RefreshToken } from '~/models/schemas/RefreshToken.schema'
import hashToken from '~/utils/hashToken'
import { ObjectId } from 'mongodb'

class RefreshTokenService {
  public async createRefreshToken({
    user_id,
    token,
    exp,
    iat
  }: {
    user_id: string
    token: string
    exp: number
    iat: number
  }) {
    const refreshToken = await databaseServices.refresh_tokens.insertOne(
      new RefreshToken({
        user_id: new ObjectId(user_id),
        token,
        exp,
        iat
      })
    )
    return refreshToken
  }
  public async checkRefreshTokenExist(token: string) {
    const refreshToken = await databaseServices.refresh_tokens.findOne({ token })
    return !!refreshToken
  }
  public async findRefreshToken(token: string) {
    return await databaseServices.refresh_tokens.findOne({ token })
  }

  public async deleteRefreshToken(token: string) {
    return await databaseServices.refresh_tokens.deleteOne({ token })
  }
}
const refreshTokenService = new RefreshTokenService()
export default refreshTokenService
