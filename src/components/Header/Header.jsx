import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import axios from "axios";

import SearchResultItem from "../SearchResultItem/SearchResultItem";

import "./Header.css";

function Header() {
  const {darkMode, setDarkMode} = useContext(ThemeContext);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(
    () => {
      axios(`https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_API_KEY}&query=${query}`)
      .then(res => setSearchResults(res.data.results))
      .catch(err => console.log(err))
    // If dependency array is empty, this only runs when the component mounts and unmounts
    // In this case, useEffect will run every time there is a change to the query state
    // (Every time the user types in the search bar)
    }, [query])

  const toggleMode = () => {
    // Good syntax when new state depends on the old state
    // In this case, if we're already in dark mode, darkMode is true
    // The next state needs to be false, not dark mode
    setDarkMode(prevState => !prevState);
  }

  const getUserQuery = (e) => {
    setQuery(e.target.value)
  }

  return (
    <div className={`header-container ${!darkMode ? "header-light" : ""}`}>
      <Link className="logo" to="/">CineTrail</Link>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search movies..."
          onChange={getUserQuery}
        />
        {/* Trim gets rid of unnecessary spaces at the beginning and end if the user types them
        This checks if the search bar is not equal to an empty string
        If it is, then the rest of the logic is ignored because both sides have to be true */}
        {query.trim() !== "" &&
          <div className="search-results-container">
            {searchResults.map(result => (
              <SearchResultItem
                key={result.id}
                movie={result}
                setQuery={setQuery}
              />
            ))}
          </div>
        }
      </div>
      <div className="header-buttons-container">
        <div className="theme-buttons-container">
          <div className="theme-buttons">
            <MdOutlineLightMode
              className={`theme-icon ${!darkMode ? "theme-icon-active" : ""}`}
              // Clean way to check the mode and activate/deactivate the theme buttons
              // Without it, you can click the same button to change the theme
              // Regardless whether the state is currently true or false
              onClick={darkMode ? toggleMode : undefined}
            />
            <MdOutlineDarkMode
              className={`theme-icon ${darkMode ? "theme-icon-active" : ""}`} 
              onClick={!darkMode ? toggleMode : undefined}
            />
          </div>
        </div>
        <div>
          <button className="create-account-btn">Create an Account</button>
        </div>
      </div>
    </div>
  )
}

export default Header;