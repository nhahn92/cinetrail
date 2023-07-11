import { } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import ThemeContextProvider from './contexts/ThemeContext'
import HomePage from './pages/HomePage/HomePage'

function App() {

  const apiKey=import.meta.env.VITE_API_KEY;
  const baseUrl=import.meta.env.VITE_BASE_URL;

  return (
    <BrowserRouter>
    <ThemeContextProvider>
    
      <Header />

      <Routes>
        <Route path="/" element={<HomePage apiKey={apiKey} baseUrl={baseUrl} />} />
      </Routes>
    
    </ThemeContextProvider>
    </BrowserRouter>
  )
}

export default App