import { defineStore } from 'pinia'
import type { ICredentials } from '@/types'

export const useAuth = defineStore('auth', {
  state: () => ({
    isAuthorised: true,
  }),
  actions: {
    async login(credentials: ICredentials) {
      // Simulate an API call for user authentication
      if (credentials.username === 'user' && credentials.password === '123') {
        this.isAuthorised = true
      } else {
        throw new Error('Invalid credentials')
      }
    },
    logout() {
      this.isAuthorised = false
    },
  },
})
