import { useState, useEffect, useContext } from 'react'
import './Header.css'
import { Link, useNavigate } from 'react-router-dom'
import { ThemeContext } from '../../contexts/ThemeContext'
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md'
import axios from 'axios'
import SearchResults from '../SearchResults/SearchResults'

function Header({baseUrl, apiKey}) {
  // Change to use global state
  // Note: {} not []
  const {darkMode, setDarkMode} = useContext(ThemeContext)

  const handleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
  }

  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([])
  const [query, setQuery] = useState('')

  useEffect(
    () => {
      if (query.trim().length > 0) {
        axios.get(`${baseUrl}/search/movie?api_key=${apiKey}&query=${query}`)
        .then(res => {
          setSearchResults(res.data.results)
        })
        .catch(err => console.log(err))
      }
    }, [query])

  return (
    <div className={darkMode?"header-container" : "header-container header-light"}>
      <Link className="logo" to="/">CineTrail</Link>
      <div className="search-container">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={`search-input ${query && "input-active"} ${!query && !darkMode && "input-light"}}`}
          placeholder="Search movies..."
        />
        {
          query.trim() !== '' && (
            <div className="search-results-container">
              {searchResults.map((movie) => {
                return <SearchResults setQuery={setQuery} key={movie.id} movie={movie} />
              })}
            </div>
          )
        }
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