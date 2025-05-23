import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
  }),
  actions: {
    login(username: string, password: string) {
      // Static login mock
      if (username === 'admin' && password === 'admin') {
        this.isAuthenticated = true
        return true
      }
      return false
    },
    logout() {
      this.isAuthenticated = false
    },
  },
})
