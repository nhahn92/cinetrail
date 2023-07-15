import { useEffect } from 'react'
import './HomePage.css'
import Slider from '../../components/Slider/Slider'
import MovieCard from '../../components/MovieCard/MovieCard'
import axios from 'axios'

function HomePage({apiKey, baseUrl}) {
  const [popularMovies, setPopularMovies] = ([])

  useEffect (
    () => {
      axios.get(`${baseUrl}/movie/popular?api_key=${apiKey}`)
      .then(res => {
        console.log(res.data.results)
        setPopularMovies(res.data.results)
      })
      .catch(err => console.log(err))
    }
  )

  return (
    <div className="homepage-container">
        <Slider apiKey={apiKey} baseUrl={baseUrl} />
        <MovieCard />
    </div>
  )
}

export default HomePage