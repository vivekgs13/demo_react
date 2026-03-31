import React, { useState } from 'react'
import Profile from './Profile'
import './Logout.css'

const Logout = ({ onLogoutSuccess, user }) => {
  const [showMenu, setShowMenu] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('user')
    localStorage.removeItem('isAuthenticated')
    
    // Call parent callback
    if (onLogoutSuccess) {
      onLogoutSuccess()
    }
    setShowMenu(false)
  }

  const handleProfileClick = () => {
    setShowProfile(true)
    setShowMenu(false)
  }

  return (
    <div className="logout-container">
      <div className="user-menu">
        <button 
          className="user-profile-btn"
          onClick={() => setShowMenu(!showMenu)}
        >
          <img 
            src={user?.avatar} 
            alt="User Avatar" 
            className="user-avatar"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
          <span className="user-name">{user?.name || 'User'}</span>
          <span className="dropdown-icon">▼</span>
        </button>

        {showMenu && (
          <div className="dropdown-menu">
            <div className="menu-header">
              <p className="user-email">{user?.email}</p>
            </div>

            <div className="menu-items">
              <button 
                className="menu-item"
                onClick={handleProfileClick}
              >
                <span className="item-icon">👤</span>
                <span>Profile</span>
              </button>
              <button className="menu-item">
                <span className="item-icon">⚙️</span>
                <span>Settings</span>
              </button>
              <button className="menu-item">
                <span className="item-icon">❓</span>
                <span>Help</span>
              </button>
            </div>

            <div className="menu-divider"></div>

            <button 
              className="menu-item logout-item"
              onClick={handleLogout}
            >
              <span className="item-icon">🚪</span>
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>

      {showProfile && (
        <Profile 
          user={user}
          onClose={() => setShowProfile(false)}
        />
      )}
    </div>
  )
}

export default Logout
