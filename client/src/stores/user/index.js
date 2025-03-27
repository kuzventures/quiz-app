import { defineStore } from 'pinia'
import { axiosInstance } from '@/plugins/axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    loggedIn: false
  }),
  getters: {
    isLoggedIn: state => {
      let loggedIn = window.localStorage.getItem('loggedIn')
      return !!loggedIn || state.loggedIn
    }
  },
  actions: {
    async login(email, password, callback = () => {}) {
      try {
        const response = await axiosInstance.post('/login', {
          email,
          password
        })

        localStorage.setItem('access_token', response.data.access_token)
        localStorage.setItem('token_type', response.data.token_type)

        this.loggedIn = true

        callback(true)
        return true
      } catch (error) {
        console.error('Login failed:', error.response?.data || error.message)
        callback(false)
        return false
      }
    }
  }
})
