import { } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import ThemeContextProvider from './contexts/ThemeContext'

function App() {
  return (
    <BrowserRouter>
    <ThemeContextProvider>
    
      <Header />
    
    </ThemeContextProvider>
    </BrowserRouter>
  )
}

export default App