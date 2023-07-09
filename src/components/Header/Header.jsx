import { useContext } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../../contexts/ThemeContext'
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md'

function Header() {
  // Change to use global state
  // Note: {} not []
  const {darkMode, setDarkMode} = useContext(ThemeContext)

  const handleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
  }

  return (
    <div className={darkMode?"header-container" : "header-container header-light"}>
      <Link className="logo" to="/">CineTrail</Link>
      <div className="search-container">
        <input className="search-input" placeholder="Search movies..." />
      </div>
      <div className="header-buttons-container">
        <div className="theme-button-container">
          {
            darkMode?
            <div className="theme-buttons">
              <MdOutlineLightMode onClick={handleTheme} className="theme-icon" />
              <MdOutlineDarkMode className="theme-icon theme-icon-active" />
            </div>
            :
            <div className="theme-buttons">
              <MdOutlineLightMode className="theme-icon theme-icon-active" />
              <MdOutlineDarkMode onClick={handleTheme} className="theme-icon" />
            </div>
          }
        </div>
      </div>
      <button className="create-account-btn">Create an Account</button>
    </div>
  )
}

export default Header