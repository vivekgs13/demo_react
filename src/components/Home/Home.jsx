import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { debounce } from 'lodash'
import { fetchUser } from '../Nav/navSlice'
import './Home.css'

const Home = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.nav.users)
  const loading = useSelector((state) => state.nav.load)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredUsers, setFilteredUsers] = useState([])
  
  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  useEffect(() => {
    if (users && users.length > 0) {
      setFilteredUsers(users)
    }
  }, [users])

  const debouncedSearch = debounce((term) => {
    if (!users || users.length === 0) return
    
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(term.toLowerCase()) ||
      user.company.toLowerCase().includes(term.toLowerCase())
    )
    setFilteredUsers(filtered)
  }, 500)

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    
    if (value === '') {
      setFilteredUsers(users)
    } else {
      debouncedSearch(value)
    }
  }

  return (
    <div className="home-container">
      <div className="home-section">
        <h2>
          <div className="section-icon">🔍</div>
          Search Users
        </h2>
        
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search by name or company..." 
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="search-info">
          <span className="result-count">
            {searchTerm ? `${filteredUsers.length} result${filteredUsers.length !== 1 ? 's' : ''}` : `${users?.length || 0} users`}
          </span>
          {searchTerm && (
            <span className="result-status">
              Showing results for: "<strong>{searchTerm}</strong>"
            </span>
          )}
        </div>
      </div>

      <div className="home-section">
        <h2>
          <div className="section-icon">👥</div>
          Users List
        </h2>

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <span>Loading users...</span>
          </div>
        ) : filteredUsers && filteredUsers.length > 0 ? (
          <ul className="users-list">
            {filteredUsers.map((user) => (
              <li key={user.id} className="user-item">
                <span className="user-name">{user.name}</span>
                <span className="user-company">{user.company}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="no-results">
            <div className="no-results-icon">😔</div>
            <div className="no-results-text">
              {searchTerm 
                ? `No users found matching "${searchTerm}"` 
                : 'No users available'}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
