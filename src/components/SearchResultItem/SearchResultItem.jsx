import React from "react";
import { Link } from "react-router-dom";
import noImage from "/noImage.png";

export default function SearchResultItem({movie, setQuery}) {
  return (
    <Link
        className="search-results-item"
        to={`/movieDetails/${movie?.id}`}
        // Removes the search box when navigating to page for movie details
        // Sets the query state to an empty string
        onClick={() => setQuery("")}
    >
        <img
            src={
                movie?.backdrop_path
                ? `${import.meta.env.VITE_API_BASE_IMAGE_URL}${movie?.backdrop_path}`
                : noImage
            }
            alt={movie?.title}
        />
        <p>{movie?.title}</p>
    </Link>
  )
}