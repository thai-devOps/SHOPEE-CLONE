import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { httpStatusCode } from './httpStatusCode'
import { toast } from 'vue3-toastify'
import type { Auth } from '@/types/auth'
import { isAxiosAccessTokenExpired, isAxiosUnauthorizedError } from './utils'

class Http {
  instance: AxiosInstance
  private access_token: string
  private refresh_token: string
  private refreshTokenRequest: Promise<string> | null
  constructor() {
    this.access_token = localStorage.getItem('access_token') || ''
    this.refresh_token = localStorage.getItem('refresh_token') || ''
    this.refreshTokenRequest = null
    this.instance = axios.create({
      baseURL: 'http://localhost:5000/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // add a request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        if (config.headers && this.access_token) {
          config.headers.Authorization = this.access_token
          return config
        }
        return config
      },
      (err) => {
        return Promise.reject(err)
      }
    )

    // add a response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        if (response.config.url === '/sign-in') {
          const data = response.data as Auth
          this.access_token = 'Bearer ' + data.data.access_token
          this.refresh_token = data.data.refresh_token
          localStorage.setItem('access_token', this.access_token)
          localStorage.setItem('refresh_token', this.refresh_token)
          localStorage.setItem('user', JSON.stringify(data.data.user))
        } else if (response.config.url === '/sign-out') {
          this.access_token = ''
          this.refresh_token = ''
          localStorage.clear()
        }
        return response
      },
      (error: AxiosError) => {
        if (error.response?.status !== httpStatusCode.UNPROCESSABLE_ENTITY) {
          if (isAxiosUnauthorizedError(error)) {
            const config =
              (error.response?.config as AxiosRequestConfig) ||
              ({ headers: {}, url: {} } as AxiosRequestConfig)
            const { url } = config
            if (isAxiosAccessTokenExpired(error) && url !== '/refresh-token') {
              this.refreshTokenRequest = this.refreshTokenRequest
                ? this.refreshTokenRequest
                : this.handleRefreshToken().finally(() => {
                    setTimeout(() => {
                      this.refreshTokenRequest = null
                    }, 10000)
                  })
              return this.refreshTokenRequest.then((access_token) => {
                return this.instance({
                  ...config,
                  headers: {
                    ...config.headers,
                    Authorization: access_token
                  },
                  data: {
                    ...config.data,
                    refresh_token: this.refresh_token
                  }
                })
              })
            }
            localStorage.clear()
            this.access_token = ''
            this.refresh_token = ''
            toast.error('Phiên đăng nhập đã hết hạn')
            setTimeout(() => {
              window.location.reload()
            }, 2500)
          }
        }
        // do something with response error
        if (error.response && error.response.status === httpStatusCode.CONFLICT) {
          const message = (error.response.data as any).message
          toast.error(message)
        }
        return Promise.reject(error)
      }
    )
  }
  private async handleRefreshToken() {
    try {
      const res = await this.instance.post<Auth>('/refresh-token', {
        refresh_token: this.refresh_token
      })
      const { access_token, refresh_token, user } = res.data.data
      localStorage.clear()
      localStorage.setItem('access_token', access_token)
      localStorage.setItem('refresh_token', refresh_token)
      localStorage.setItem('user', JSON.stringify(user))
      this.access_token = 'Bearer ' + access_token
      this.refresh_token = refresh_token
      return 'Bearer' + access_token
    } catch (err) {
      localStorage.clear()
      this.access_token = ''
      this.refresh_token = ''
      throw err
    }
  }
}
const http = new Http().instance
export default http
