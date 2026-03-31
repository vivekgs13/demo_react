import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTheme } from '../../theme/themeSlice'
import './ThemeSelector.css'

const ThemeSelector = () => {
  const dispatch = useDispatch()
  const { currentTheme, themes } = useSelector((state) => state.theme)
  const [showThemeMenu, setShowThemeMenu] = useState(false)

  const handleThemeChange = (themeName) => {
    dispatch(setTheme(themeName))
    setShowThemeMenu(false)
  }

  return (
    <div className="theme-selector">
      <button
        className="theme-toggle-btn"
        onClick={() => setShowThemeMenu(!showThemeMenu)}
        title="Change theme"
      >
        🎨
      </button>

      {showThemeMenu && (
        <div className="theme-menu">
          <div className="theme-menu-header">
            <p className="theme-label">Choose Theme</p>
          </div>
          <div className="theme-options">
            {Object.entries(themes).map(([key, theme]) => (
              <button
                key={key}
                className={`theme-option ${currentTheme === key ? 'active' : ''}`}
                onClick={() => handleThemeChange(key)}
                title={theme.name}
              >
                <span className="theme-color-preview">
                  <span 
                    className="color-dot primary" 
                    style={{ backgroundColor: theme.colors.primary }}
                  ></span>
                  <span 
                    className="color-dot secondary" 
                    style={{ backgroundColor: theme.colors.secondary }}
                  ></span>
                </span>
                <span className="theme-name">{theme.name}</span>
                {currentTheme === key && <span className="checkmark">✓</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ThemeSelector
