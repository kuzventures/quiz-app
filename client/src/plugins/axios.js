import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Attach token on each request
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token')
  const type = localStorage.getItem('token_type') || 'Bearer'

  if (token) {
    config.headers.Authorization = `${type} ${token}`
  }

  return config
})

// 401 redirect logic
instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      console.warn('Token expired or invalid')
      // localStorage.removeItem('access_token')
      // localStorage.removeItem('token_type')
      // if (!window.location.pathname.includes('/login')) {
      //   window.location.href = '/login'
      // }
    }
    return Promise.reject(error)
  }
)

// Export this so you can use it in your Pinia store
export const axiosInstance = instance

// Still export default plugin for global use
export default {
  install: app => {
    app.config.globalProperties.$axios = instance
    app.provide('axios', instance)
  }
}
