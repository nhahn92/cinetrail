import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";

import ReactPlayer from "react-player";
import StarRatings from "react-star-ratings";
import { useParams } from "react-router-dom";

import Genres from "../../components/Genres/Genres";
import ReviewItem from "../../components/ReviewItem/ReviewItem";

export default function MovieDetails() {
  const {user} = useContext(UserContext);
  const {movieId} = useParams();
  // If expecting an object from the API call, use "null" as default value
  // Unless there's a default object to put in there
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState("");
  const [reviews, setReviews] = useState([]);
  const [totalNumReviews, setTotalNumReviews] = useState(0);
  const [numReviewsToDisplay, setNumReviewsToDisplay] = useState(3);
  const [added, setAdded] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(
    () => {
      axios.post(`https://cinetrail-server.herokuapp.com/favoriteMovies/search`, {user_id:user?._id, tmdb_id:movie?.id})
      .then(res => {
        console.log(res)
        if (res.data !== null) {
          setAdded(true);
        }
      })
      .catch(err => console.log(err)).finally(() => setLoaded(true));
    }, []
  )

  useEffect(
    () => {
      axios(`${import.meta.env.VITE_API_BASE_URL}${movieId}?api_key=${import.meta.env.VITE_API_KEY}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err))

      axios(`${import.meta.env.VITE_API_BASE_URL}${movieId}/videos?api_key=${import.meta.env.VITE_API_KEY}`)
      .then(res => {
        const trailers = res.data.results.filter(video => video.site === "YouTube" && video.type.includes("Trailer"));
        setTrailerKey(trailers[0].key);
      })
      .catch(err => console.log(err))

      axios(`${import.meta.env.VITE_API_BASE_URL}${movieId}/reviews?api_key=${import.meta.env.VITE_API_KEY}`)
      .then(res => {
          setReviews(res.data.results);
          setTotalNumReviews(res.data.results.length)
      })
      .catch(err => console.log(err))
    }, [movieId]
  )

  const removeFromFavorites = () => {
    axios.delete(`https://cinetrail-server.herokuapp.com/favoriteMovies/${user?._id}/${movie.id}`)
    .then (res => {
      setAdded(false);
    })
    .catch(err => console.log(err))
  }

  const addToFavorites = () => {
    axios.post(`https://cinetrail-server.herokuapp.com/favoriteMovies/`, {user_id:user?._id, movie_id: movie?.id})
    .then (res => {
      setAdded(true);
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="movie-details-container">
      <div className="trailer-container">
        <ReactPlayer
          className="trailer-player"
          url={`https://www.youtube.com/watch?v=${trailerKey}`}
          width="100%"
          height="100%"
          config={{
            youtube: {
              playerVars: {
                showInfo: 1,
                origin: "https:localhost:5173"
              }
            }
          }}
        />
      </div>
      <div className="details-container">
        <div className="title-container">
          <h1>{movie?.title}</h1>
          {added && loaded ? (
            <span
              className="remove-btn"
              onClick={removeFromFavorites}
            >
              Remove from Favorites
            </span>
          ) : (
            <span
              className="add-btn"
              onClick={addToFavorites}
            >
              Add to Favorites
            </span>
          )}
        </div>
        <div className="rating">
          {movie && (
            <StarRatings
              rating={movie?.vote_average / 2}
              starRatedColor="red"
              numberOfStars={5}
              name="rating"
              starDimension="15px"
              starSpacing="1px"
            />
          )}
        </div>
        <div className="info-container">
          {movie && (<img src={`${import.meta.env.VITE_API_BASE_IMAGE_URL}${movie?.poster_path}`} alt={movie?.title} className="details-poster" />)}
          <div className="movie-info">
            <h2>{movie?.tagline}</h2>
            <h4>{movie?.overview}</h4>
            <h4>Status: {movie?.status}</h4>
            <h4>Runtime: {movie?.runtime}</h4>
            <h4>Budget: {movie?.budget}</h4>
            {/* If the API call isn't finished, it returns an empty array, which gives
            the .map method an undefined value in Genres.jsx
            This returns an empty array to keep the page from crashing. */}
            <Genres genreIds={movie?.genres ? movie?.genres : []} component="details" />
          </div>
        </div>
        <div className="review-container">
          <p className="reviews-title">Reviews</p>
          {
            reviews.slice(0, numReviewsToDisplay).map(review => (
              <ReviewItem review={review} key={review.id} />
            ))
          }
          {
            numReviewsToDisplay < totalNumReviews
            ? <p onClick={() => setNumReviewsToDisplay(prevState => prevState + 2)}>Read More Reviews</p>
            : <p onClick={() => setNumReviewsToDisplay(3)}>End of Reviews. Collapse</p>
          }
        </div>
      </div>
    </div>
  )
}