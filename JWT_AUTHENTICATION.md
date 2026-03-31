# JWT Authentication Integration

This project now uses JWT (JSON Web Token) authentication with the Escuelajs API.

## API Endpoint

- **Base URL**: `https://api.escuelajs.co/api/v1`
- **Login Endpoint**: `/auth/login` (POST)

## Demo Credentials

```
Email: john@mail.com
Password: changeme
```

## Features

### ✅ Implemented

1. **JWT Login System**
   - Email and password validation
   - Secure token storage in localStorage
   - Token expiry management (24 hours)
   - Error handling and user feedback

2. **User Authentication**
   - Persistent login (survives page refresh)
   - Automatic logout on token expiry
   - Protected app routes (redirects to login if not authenticated)

3. **API Client Utility**
   - Centralized API request handling
   - Automatic token injection in headers
   - Bearer token authentication
   - 401 Unauthorized handling

4. **User Profile**
   - View user information
   - Edit profile details
   - Save changes (persisted in localStorage)

5. **Session Management**
   - Token expiry tracking
   - Auto-logout on expiry
   - Clear localStorage on logout

## How to Use

### Login
1. Navigate to the login page
2. Enter demo credentials:
   - Email: `john@mail.com`
   - Password: `changeme`
3. Click "Sign In"

### API Requests
Use the `apiClient.js` utility for authenticated requests:

```javascript
import { apiRequest } from './utils/apiClient'

// Make an authenticated request
const data = await apiRequest('/endpoint', {
  method: 'GET',
})
```

### Check Authentication Status
```javascript
import { getToken, isTokenValid } from './utils/apiClient'

// Get current token
const token = getToken()

// Check if token is valid
if (isTokenValid()) {
  // Token is valid
}
```

## Token Storage

The application stores the following in localStorage:

- `token`: JWT access token
- `user`: User object (id, email, name, avatar, role)
- `isAuthenticated`: Boolean flag
- `tokenExpiry`: Token expiration timestamp

## Security Notes

- ⚠️ **Note**: This is a demo/testing implementation. For production:
  - Use httpOnly cookies instead of localStorage
  - Implement token refresh mechanism
  - Add CSRF protection
  - Use HTTPS only
  - Implement proper session management on backend

## File Structure

```
src/
├── components/
│   ├── Auth/
│   │   ├── Login.jsx          # Login form with JWT API integration
│   │   ├── Login.css
│   │   ├── Logout.jsx         # User menu and logout
│   │   ├── Logout.css
│   │   ├── Profile.jsx        # User profile view/edit
│   │   └── Profile.css
│ 
├── utils/
│   └── apiClient.js           # API utility for authenticated requests
│
└── App.js                      # Main app with authentication state
```

## Testing

1. **Valid Credentials**
   ```
   Email: john@mail.com
   Password: changeme
   ```

2. **Test Auto-logout**
   - Token expires after 24 hours
   - User is automatically logged out
   - Redirected to login page

3. **Test Persistent Login**
   - Login successfully
   - Refresh the page
   - User should remain logged in

## Troubleshooting

### "Login failed" Error
- Check email and password are correct
- Try the demo credentials provided
- Check network connectivity

### Token Expired
- Logout and login again
- Token expires every 24 hours
- Implement token refresh for longer sessions

### 401 Unauthorized
- Check if token is valid
- Logout and login again
- Clear browser storage and try again

## Future Enhancements

- [ ] Token refresh endpoint integration
- [ ] Social login (Google, GitHub)
- [ ] Two-factor authentication
- [ ] Password reset functionality
- [ ] Session management dashboard
- [ ] Role-based access control
