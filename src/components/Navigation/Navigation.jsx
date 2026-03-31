import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Logout from '../Auth/Logout'
import GlobalSearch from '../Search/GlobalSearch'
import './Navigation.css'

const Navigation = ({ onTabChange, user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('home')
  const { totalItems } = useSelector((state) => state.cart)

  const handleTabClick = (tab) => {
    setActiveTab(tab)
    onTabChange(tab)
  }

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-logo">
          React Demo Application
        </div>
        <ul className="nav-menu">
          <li className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}>
            <button 
              className="nav-link"
              onClick={() => handleTabClick('home')}
            >
              Home
            </button>
          </li>
          <li className={`nav-item ${activeTab === 'products' ? 'active' : ''}`}>
            <button 
              className="nav-link"
              onClick={() => handleTabClick('products')}
            >
              Products
            </button>
          </li>
          <li className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}>
            <button 
              className="nav-link"
              onClick={() => handleTabClick('orders')}
            >
              Orders
            </button>
          </li>
          <li className={`nav-item ${activeTab === 'cart' ? 'active' : ''}`}>
            <button 
              className="nav-link cart-link"
              onClick={() => handleTabClick('cart')}
            >
              <span className="cart-icon">🛒</span>
              Cart
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </button>
          </li>
        </ul>

        <GlobalSearch />
        
        {user && (
          <div className="nav-user">
            <Logout user={user} onLogoutSuccess={onLogout} />
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
