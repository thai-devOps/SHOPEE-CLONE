import { JwtPayload } from 'jsonwebtoken'

export interface SignUp {
  email: string
  password: string
}

export interface UpdateAccountBody {
  name: string
  email: string
  address: string
  avatar: string
  phone: string
  createdAt: string
  date_of_birth: string
  gender: string
  role: 'admin' | 'user'
}

export interface TokenPayload extends JwtPayload {
  user_id: string
  email: string
  role: string
  created_at: string
  exp: number
  iat: number
}
