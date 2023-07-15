import { useState, useEffect } from 'react'
import axios from 'axios'

function Genres({movieGenres, apiKey, baseUrl}) {
    const [allGenres, setAllGenres] = useState([])

    useEffect (
        () => {
            axios.get(`${baseUrl}/genre/movie/list?api_key=${apiKey}`)
            .then(res => {
                setAllGenres(res.data.genres)
            })
            .catch (err => console.log(err))
        }, [])

  return (
    <div style={{display:"flex"}}>
        <p>Genres:</p>
            {movieGenres?.map((id, index) => {
                const genre = allGenres.find(genre => genre.id === id);
                return (
                    <p key={id} style={{marginLeft:"5px"}}>
                       {genre?.name}
                       {index !== movieGenres.length - 1 && ','}
                    </p>
                )
            })}
    </div>
  )
}

export default Genres