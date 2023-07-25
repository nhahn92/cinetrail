import React from "react";
import Slider from "../../components/Slider/Slider";
import PopularMovies from "../../components/PopularMovies/PopularMovies";
import TopRatedMovies from "../../components/TopRatedMovies/TopRatedMovies";

import "./Homepage.css";
import "../movies.css";

export default function Homepage() {
  return (
    <div className="homepage-container">
      <Slider />
      <div className="movies-wrapper">
        <PopularMovies />
        <TopRatedMovies />
      </div>
    </div>
  )
}