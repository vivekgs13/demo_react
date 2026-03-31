
import './App.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from './hooks/useTheme';
import Navigation from './components/Navigation/Navigation';
import Header from './components/main/Header';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import Orders from './components/Orders/Orders';
import Cart from './components/Cart/Cart';
import Login from './components/Auth/Login';
import { logout, setUserFromStorage } from './auth/authSlice';

function App() {
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState('home')
  
  // Apply theme globally
  useTheme()
  
  // Get auth state from Redux
  const { isAuthenticated, user } = useSelector((state) => state.auth)

  useEffect(() => {
    // On app mount, restore user from localStorage if available
    const storedAuth = localStorage.getItem('isAuthenticated')
    const storedUser = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    const tokenExpiry = localStorage.getItem('tokenExpiry')
    
    if (storedAuth === 'true' && storedUser && token) {
      // Check if token is still valid
      if (tokenExpiry && new Date(tokenExpiry) > new Date()) {
        dispatch(setUserFromStorage(JSON.parse(storedUser)))
      } else {
        // Token expired, clear storage and logout
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('isAuthenticated')
        localStorage.removeItem('tokenExpiry')
        dispatch(logout())
      }
    }
  }, [dispatch])

  const handleLoginSuccess = (userData) => {
    setActiveTab('home')
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />
  }

  const renderContent = () => {
    switch(activeTab) {
      case 'home':
        return <Home />
      case 'products':
        return <Products />
      case 'orders':
        return <Orders />
      case 'cart':
        return <Cart />
      default:
        return <Home />
    }
  }

  return (
    <div className="App">
      <Navigation 
        onTabChange={setActiveTab} 
        user={user}
        onLogout={handleLogout}
      />
      <Header/>
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
