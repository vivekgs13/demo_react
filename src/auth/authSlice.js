import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { login as loginAPI, getCurrentUser } from '../utils/apiClient'

/**
 * Login async thunk
 */
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Step 1: Login and get tokens
      const loginResponse = await loginAPI(email, password)
      const token = loginResponse.data.access_token

      // Store token to localStorage so interceptor can use it for next request
      localStorage.setItem('token', token)

      // Step 2: Get user profile with the new token
      const userResponse = await getCurrentUser()
      const userData = userResponse.data

      const user = {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        avatar: userData.avatar || '👤',
        role: userData.role,
      }

      // Store to localStorage
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('tokenExpiry', new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString())

      return { user, token }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Login failed'
      return rejectWithValue(errorMessage)
    }
  }
)

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  success: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.error = null
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('tokenExpiry')
    },
    clearError: (state) => {
      state.error = null
    },
    clearSuccess: (state) => {
      state.success = false
    },
    setUserFromStorage: (state, action) => {
      state.user = action.payload
      state.token = localStorage.getItem('token')
      state.isAuthenticated = true
    },
  },
  extraReducers: (builder) => {
    builder
      // Login pending
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.success = false
      })
      // Login fulfilled
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        state.error = null
        state.success = true
      })
      // Login rejected
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || 'Login failed'
        state.isAuthenticated = false
        state.success = false
      })
  },
})

export const { logout, clearError, clearSuccess, setUserFromStorage } = authSlice.actions
export default authSlice.reducer
