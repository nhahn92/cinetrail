import { useState, useEffect, createContext } from 'react'
// Use hook to create context
export const ThemeContext = createContext()

export default function ThemeContextProvider(props) {
  // Dark mode is the default
  const [darkMode, setDarkMode] = useState(true)

  useEffect(
    () => {
      // Check local storage for initial value
      const theme = localStorage.getItem('darkMode')
      // Check if something is there
      if (theme) {
        // Use this value to initialize state
        setDarkMode(JSON.parse(theme))
      }
    }, [] // Runs only once when component loads
  )

  return (
    <ThemeContext.Provider value={{darkMode, setDarkMode}}>
      {props.children}
    </ThemeContext.Provider>
  )
}