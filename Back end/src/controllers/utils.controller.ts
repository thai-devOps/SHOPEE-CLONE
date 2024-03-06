import { Request } from 'express'
import { configEnv } from '~/constants/config'

export const getExpire = (req: Request) => {
  const expireAccessTokenConfig = configEnv.EXPIRE_ACCESS_TOKEN
  const expireRefreshTokenConfig = configEnv.EXPIRE_REFRESH_TOKEN
  return {
    expireAccessTokenConfig,
    expireRefreshTokenConfig
  }
}
