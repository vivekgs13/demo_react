import React, { useState } from 'react'
import './Profile.css'

const Profile = ({ user, onClose }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '+1 (555) 000-0000',
    bio: user?.bio || 'Lorem ipsum dolor sit amet',
    location: user?.location || 'New York, USA',
    website: user?.website || 'www.example.com',
    profession: user?.profession || 'Product Designer',
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSave = () => {
    setIsSaving(true)
    // Simulate save
    setTimeout(() => {
      setIsSaving(false)
      setIsEditing(false)
      // Save to localStorage
      const updatedUser = { ...user, ...formData }
      localStorage.setItem('user', JSON.stringify(updatedUser))
      alert('Profile updated successfully!')
    }, 500)
  }

  return (
    <div className="profile-overlay" onClick={onClose}>
      <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>

        <div className="profile-header">
          <div className="profile-avatar">
            <img 
              src={user?.avatar} 
              alt="User Avatar"
              className="avatar-image"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          </div>
          <div className="profile-header-info">
            <h2>{formData.name}</h2>
            <p className="profession">{formData.profession}</p>
          </div>
        </div>

        <div className="profile-content">
          {!isEditing ? (
            <>
              <div className="profile-section">
                <h3>Contact Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">📧 Email</span>
                    <span className="info-value">{formData.email}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">📱 Phone</span>
                    <span className="info-value">{formData.phone}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">📍 Location</span>
                    <span className="info-value">{formData.location}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">🌐 Website</span>
                    <span className="info-value">{formData.website}</span>
                  </div>
                </div>
              </div>

              <div className="profile-section">
                <h3>About</h3>
                <p className="about-text">{formData.bio}</p>
              </div>

              <div className="profile-stats">
                <div className="stat-item">
                  <span className="stat-number">127</span>
                  <span className="stat-label">Orders</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">45</span>
                  <span className="stat-label">Wishlist</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">4.8</span>
                  <span className="stat-label">Rating</span>
                </div>
              </div>

              <div className="profile-actions">
                <button 
                  className="btn-edit"
                  onClick={() => setIsEditing(true)}
                >
                  ✏️ Edit Profile
                </button>
              </div>
            </>
          ) : (
            <form className="profile-form">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  disabled
                />
              </div>

              <div className="form-group">
                <label>Profession</label>
                <input
                  type="text"
                  name="profession"
                  value={formData.profession}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Website</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="form-textarea"
                  rows="4"
                ></textarea>
              </div>

              <div className="form-actions">
                <button 
                  type="button"
                  className="btn-save"
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  {isSaving ? '💾 Saving...' : '💾 Save Changes'}
                </button>
                <button 
                  type="button"
                  className="btn-cancel"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
