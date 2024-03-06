import http from '@/utils/http'
import { type RegisterBody } from '@/types/request'
import type { ProfileForm } from '@/types/user'

export const registerAccount = (body: RegisterBody) => {
  http.post('/resgister', body)
}
export const updateUserProfile = (body: ProfileForm) => {
  http.put('/profile', body)
}

