import { configEnv } from '~/constants/config'
import { SignUp, UpdateAccountBody } from '~/models/requests/users.request'
import { signToken, verifyToken } from '~/utils/jwt'
import databaseServices from './database.services'
import { User } from '~/models/schemas/User.schema'
import hashPassword from '~/utils/crypto'
import { omit } from 'lodash'
import refreshTokenService from './refresh_tokens.services'
import hashToken from '~/utils/hashToken'
import responseMessage from '~/constants/message'
import { token_type } from '~/constants/tokenType'
import { ObjectId } from 'mongodb'

class UserService {
  private signAccessToken({ user_id, email }: { user_id: string; email: string }) {
    return signToken({
      payload: {
        user_id,
        email,
        token_type: token_type.accessToken
      },
      secretKey: configEnv.SECRET_KEY_ACCESS_TOKEN,
      options: {
        expiresIn: configEnv.EXPIRE_ACCESS_TOKEN
      }
    })
  }
  private signRefreshToken({ user_id, email, exp }: { user_id: string; email: string; exp?: number }) {
    if (exp) {
      return signToken({
        payload: {
          user_id,
          email,
          token_type: token_type.refreshToken
        },
        secretKey: configEnv.SECRET_KEY_REFRESH_TOKEN,
        options: {
          expiresIn: exp
        }
      })
    }
    return signToken({
      payload: {
        user_id,
        email,
        token_type: token_type.refreshToken
      },
      secretKey: configEnv.SECRET_KEY_REFRESH_TOKEN,
      options: {
        expiresIn: configEnv.EXPIRE_REFRESH_TOKEN
      }
    })
  }
  private signAccessAndRefreshToken = ({ user_id, email, exp }: { user_id: string; email: string; exp?: number }) => {
    return Promise.all([this.signAccessToken({ user_id, email }), this.signRefreshToken({ user_id, email })])
  }
  private decodeRefreshToken = (token: string) => {
    return verifyToken({
      token,
      secretKey: configEnv.SECRET_KEY_REFRESH_TOKEN
    })
  }
  public async signUp(payload: SignUp) {
    const result = await databaseServices.users.insertOne(
      new User({
        ...payload,
        password: hashPassword(payload.password)
      })
    )
    return {
      _id: result.insertedId,
      email: payload.email
    }
  }
  public async checkEmailExist(email: string) {
    const user = await databaseServices.users.findOne({ email })
    return !!user
  }
  public async checkPassword(email: string, password: string) {
    const user = await databaseServices.users.findOne({ email })
    return user?.password === hashPassword(password)
  }
  public async signIn({ user_id, email }: { user_id: string; email: string }) {
    const [accessToken, refreshToken] = await this.signAccessAndRefreshToken({ user_id, email })

    const { exp, iat } = await this.decodeRefreshToken(refreshToken)
    await refreshTokenService.createRefreshToken({
      user_id,
      token: refreshToken,
      exp,
      iat
    })
    const userDB = await databaseServices.users.findOne({ _id: new ObjectId(user_id) })
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: omit(userDB, ['password'])
    }
  }
  public async signOut(token: string) {
    const refreshToken = await refreshTokenService.findRefreshToken(token)
    if (!refreshToken) throw new Error('Refresh token not found')
    const result = await refreshTokenService.deleteRefreshToken(token)
    if (!result) throw new Error('Delete refresh token failed')
    return responseMessage.success.signout
  }
  public async refreshToken({
    user_id,
    email,
    refresh_token,
    exp
  }: {
    user_id: string
    email: string
    refresh_token: string
    exp: number
  }) {
    const [new_access_token, new_refresh_token] = await Promise.all([
      this.signAccessToken({ user_id, email }),
      this.signRefreshToken({ user_id, email, exp }),
      refreshTokenService.deleteRefreshToken(refresh_token)
    ])
    const decoded_refresh_token = await this.decodeRefreshToken(new_refresh_token)
    await refreshTokenService.createRefreshToken({
      user_id: decoded_refresh_token.user_id,
      token: new_refresh_token,
      exp: decoded_refresh_token.exp,
      iat: decoded_refresh_token.iat
    })
    return {
      access_token: new_access_token,
      refresh_token: new_refresh_token
    }
  }
  public async updateProfile(userId: string, data: any) {
    const result = await databaseServices.users.updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          ...data,
          updatedAt: new Date()
        }
      }
    )
    return result
  }
  public async findUserByEmail(email: string) {
    const result = await databaseServices.users.findOne({ email })
    return result
  }
  public async updateAccount(userId: string, data: UpdateAccountBody) {
    const result = await databaseServices.users.updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          avatar: data.avatar,
          name: data.name,
          date_of_birth: data.date_of_birth,
          phone: data.phone,
          gender: data.gender,
          role: data.role,
          address: data.address,
          createdAt: new Date(data.createdAt),
          updatedAt: new Date()
        }
      }
    )
    return result
  }
  public async getAllUsers() {
    const result = await databaseServices.users.find().toArray()
    return result
  }
  public async deleteUserAccount(userId: string) {
    const result = await databaseServices.users.deleteOne({ _id: new ObjectId(userId) })
    return result
  }
  public async createAccount(payload: any) {
    const result = await databaseServices.users.insertOne(
      new User({
        ...payload,
        password: hashPassword(payload.password)
      })
    )
    return result
  }
  public async getUserById(userId: string) {
    const result = await databaseServices.users.findOne({ _id: new ObjectId(userId) })
    return result
  }
}
const userService = new UserService()
export default userService
