import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import {} from 'react-icons/md'

function Header() {
  return (
    <div>
      <Link className="logo" to="/">CineTrail</Link>
      <div className="search-container">
        <input className="search-input" placeholder="Search movies..." />
      </div>
      <div className="header-buttons-container">
        
      </div>
      <button className="create-account-btn">Create an Account</button>
    </div>
  )
}

export default Header