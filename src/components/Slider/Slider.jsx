import { useState, useEffect } from 'react'
import './Slider.css'
import axios from 'axios'
import {MdKeyboardArrowRight, MdKeyboardArrowLeft} from 'react-icons/md'

function Slider({apiKey, baseUrl}) {

    const [upcomingMovies, setUpcomingMovies] = useState([])
    const [index, setIndex] = useState(0)
    const imageBaseUrl = "https://image.tmdb.org/t/p/original"

    useEffect (
        () => {
            axios.get(`${baseUrl}/movie/upcoming?api_key=${apiKey}`)
            .then(res => {
                console.log(res.data.results)
                setUpcomingMovies(res.data.results)
            })
            .catch(err => console.log(err))
        }, []) // Runs only once when component loads

    const sliderStyle = {
        backgroundImage: `url("${imageBaseUrl}${upcomingMovies[index]?.backdrop_path}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "60vh",
        position: "relative"
    }

    // Adds to the index every time the right arrow is clicked
    // When it reaches index 20, it resets to 0
    // The array only goes to 19
    const handleRight = () => {
        setIndex(index + 1)
        if (index === upcomingMovies.length - 1) {
            setIndex(0)
        }
    }

    // Subtracts from the index every time the left arrow is clicked
    // When it reaches index 0, it resets to 19
    const handleLeft = () => {
        setIndex(index - 1)
        if (index === 0) {
            setIndex(upcomingMovies.length - 1)
        }
    }

  return (
    <div style={sliderStyle}>
        <div className="slider-overlay"></div>
        <MdKeyboardArrowRight onClick={handleRight} className="right-arrow" />
        <MdKeyboardArrowLeft onClick={handleLeft} className="left-arrow" />
        <div className="slider-info">
            <h1>{upcomingMovies[index]?.title}</h1>
            <p className="slider-description">{upcomingMovies[index]?.overview.slice(0, 130)}...</p>
            <p>Release Date: {upcomingMovies[index]?.release_date}</p>
        </div>
    </div>
  )
}

export default Slider