import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export default function ThemeContextProvider({children}) {
    const [darkMode, setDarkMode] = useState(true);

  return (
    <ThemeContext.Provider value={{darkMode, setDarkMode}}>
        {children}
    </ThemeContext.Provider>
  )
}