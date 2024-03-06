export interface User {
  _id?: string
  email: string
  password: string
  avatar?: string
  name?: string
  gender?: string
  date_of_birth?: string
  phone?: string
  address?: string
  role?: 'admin' | 'user'
  createdAt?: string
  updatedAt?: string
}

export interface ProfileForm {
  avaytar?: string
  name?: string
  email: string
  phone?: string
  gender?: string
  date_of_birth?: string
  address?: string
}
