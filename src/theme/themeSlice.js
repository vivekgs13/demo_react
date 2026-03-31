import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentTheme: localStorage.getItem('theme') || 'default',
  themes: {
    default: {
      name: 'Default',
      colors: {
        primary: '#667eea',
        secondary: '#764ba2',
        background: '#f5f7fa',
        surface: '#ffffff',
        text: '#333333',
        textLight: '#666666',
        border: '#eeeeee',
        accent: '#ff6b6b',
      }
    },
    dark: {
      name: 'Dark',
      colors: {
        primary: '#000000',
        secondary: '#764ba2',
        background: '#1a1a2e',
        surface: '#16213e',
        text: '#ffffff',
        textLight: '#b0b0b0',
        border: '#2d2d44',
        accent: '#ff6b6b',
      }
    },
    ocean: {
      name: 'Ocean',
      colors: {
        primary: '#1e90ff',
        secondary: '#00bfff',
        background: '#e0f6ff',
        surface: '#ffffff',
        text: '#003d66',
        textLight: '#666666',
        border: '#b3d9e6',
        accent: '#ff1493',
      }
    },
    forest: {
      name: 'Forest',
      colors: {
        primary: '#228b22',
        secondary: '#3cb371',
        background: '#f0f8ff',
        surface: '#ffffff',
        text: '#1a472a',
        textLight: '#4a7c59',
        border: '#c8e6c9',
        accent: '#ff6b6b',
      }
    },
    sunset: {
      name: 'Sunset',
      colors: {
        primary: '#ff6b35',
        secondary: '#f7931e',
        background: '#fff5e6',
        surface: '#ffffff',
        text: '#3d2817',
        textLight: '#8b6f47',
        border: '#ffe4cc',
        accent: '#d63031',
      }
    },
  }
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      const themeName = action.payload
      if (state.themes[themeName]) {
        state.currentTheme = themeName
        localStorage.setItem('theme', themeName)
      }
    },
  }
})

export const { setTheme } = themeSlice.actions
export default themeSlice.reducer
