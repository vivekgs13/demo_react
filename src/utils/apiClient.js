import axios from 'axios'

const API_BASE_URL = 'https://api.escuelajs.co/api/v1'

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add token to headers
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle 401 errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth data
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('tokenExpiry')
      // Redirect to login
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

/**
 * Get the JWT token from localStorage
 */
export const getToken = () => {
  return localStorage.getItem('token')
}

/**
 * Check if token is still valid
 */
export const isTokenValid = () => {
  const token = getToken()
  const expiry = localStorage.getItem('tokenExpiry')
  
  if (!token || !expiry) return false
  
  return new Date(expiry) > new Date()
}

/**
 * Make an authenticated API request
 */
export const apiRequest = async (endpoint, options = {}) => {
  return apiClient({
    ...options,
    url: endpoint,
  })
}

/**
 * Login with email and password
 */
export const login = (email, password) => {
  return apiClient.post('/auth/login', { email, password })
}

/**
 * Get current user profile
 */
export const getCurrentUser = () => {
  return apiClient.get('/auth/profile')
}

/**
 * Refresh token
 */
export const refreshToken = () => {
  return apiClient.post('/auth/refresh-token')
}

export default apiClient
