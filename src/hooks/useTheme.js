import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export const useTheme = () => {
  const { currentTheme, themes } = useSelector((state) => state.theme)

  useEffect(() => {
    const theme = themes[currentTheme]
    if (theme) {
      const colors = theme.colors
      const root = document.documentElement

      // Set CSS variables
      root.style.setProperty('--color-primary', colors.primary)
      root.style.setProperty('--color-secondary', colors.secondary)
      root.style.setProperty('--color-background', colors.background)
      root.style.setProperty('--color-surface', colors.surface)
      root.style.setProperty('--color-text', colors.text)
      root.style.setProperty('--color-text-light', colors.textLight)
      root.style.setProperty('--color-border', colors.border)
      root.style.setProperty('--color-accent', colors.accent)
    }
  }, [currentTheme, themes])

  return { currentTheme, themes }
}
