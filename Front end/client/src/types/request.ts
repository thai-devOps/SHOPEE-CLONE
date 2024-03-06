interface RegisterBody {
  email: string
  password: string
  confirm_password: string
}
interface LoginBody {
  email: string
  password: string
}
interface RefreshTokenBody {
  refresh_token: string
}

export type { RegisterBody, LoginBody, RefreshTokenBody }
