import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

import "./Header.css";

function Header() {
  return (
    <div className="header-container">
      <Link className="logo" to="/">CineTrail</Link>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search movies..."
        />
      </div>
      <div className="header-buttons-container">
        <div className="theme-buttons">
          <MdOutlineLightMode className="theme-icon" />
          <MdOutlineDarkMode className="theme-icon theme-icon-active" />
        </div>
      </div>
      <button className="create-account-btn">Create an Account</button>
    </div>
  )
}

export default Header;