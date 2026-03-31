import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, clearError } from '../../auth/authSlice'
import './Login.css'

const Login = ({ onLoginSuccess }) => {
  const dispatch = useDispatch()
  const { isLoading, error, isAuthenticated, user, success } = useSelector((state) => state.auth)

  const [email, setEmail] = useState('john@mail.com')
  const [password, setPassword] = useState('changeme')
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)

  // Handle successful login
  useEffect(() => {
    if (success && isAuthenticated && user) {
      onLoginSuccess(user)
    }
  }, [success, isAuthenticated, user, onLoginSuccess])

  const validateForm = () => {
    const newErrors = {}

    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required'
    } else if (password.length < 3) {
      newErrors.password = 'Password must be at least 3 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(clearError())

    if (!validateForm()) {
      return
    }

    // Dispatch login action
    dispatch(loginUser({ email, password }))
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Sign in to your account</p>
        </div>

        {error && (
          <div className="api-error">
            <span className="error-icon">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (errors.email) setErrors({ ...errors, email: '' })
              }}
              className={errors.email ? 'error' : ''}
              disabled={isLoading}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (errors.password) setErrors({ ...errors, password: '' })
                }}
                className={errors.password ? 'error' : ''}
                disabled={isLoading}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="form-actions">
            <label className="remember-me">
              <input type="checkbox" disabled={isLoading} />
              <span>Remember me</span>
            </label>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="login-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner-mini"></span>
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Don't have an account?{' '}
            <a href="#" className="signup-link">Sign up here</a>
          </p>
        </div>

        <div className="demo-credentials">
          <p>📝 Demo Credentials (Redux + Axios):</p>
          <p className="demo-text">Email: john@mail.com</p>
          <p className="demo-text">Password: changeme</p>
          <p className="demo-source">API: api.escuelajs.co</p>
        </div>
      </div>
    </div>
  )
}

export default Login
