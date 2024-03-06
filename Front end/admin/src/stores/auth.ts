import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types/user'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(Boolean(localStorage.getItem('access_token') || ''))
  // get user from localStorage if it exists

  const user = ref<User>(JSON.parse(localStorage.getItem('user') || 'null'))
  function setAuthenticated(value: boolean) {
    isAuthenticated.value = value
  }
  function setUser(value: User) {
    user.value = value
    localStorage.setItem('user', JSON.stringify(value))
  }
  return { isAuthenticated, user, setAuthenticated, setUser }
})
