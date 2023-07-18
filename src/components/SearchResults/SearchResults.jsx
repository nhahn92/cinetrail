import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import noImage from '../../assets/no-image.svg.png'

function SearchResults({movie, movieQuery}) {
    const navigate = useNavigate();
    const [imageError, setImageError] = useState(false);

    const handleNavigation = () => {
        setQuery('')
        navigate(`/moviedetails/${movie.id}`)
    }

  return (
    <div className="search-result-items" onClick={handleNavigation}>
        <img className="result-img" src={imageError ? noImage : `https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        onError={() => setImageError(true)} alt="" />
        <p>{movie.title}</p>

    </div>
  )
}

export default SearchResults