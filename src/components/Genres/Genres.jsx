import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Genres({genreIds}) {
    const [genres, setGenres] = useState([]);

    useEffect (
        () => {
            axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_API_KEY}`)
            .then(res => setGenres(res.data.genres))
            .catch(err => console.log(err));
        }, []
    )

  return (
    <div className="genre-container">
        <p>Genres:&nbsp;</p>
        {genreIds && genreIds.map((id, index) => {
            for(let i = 0; i < genres.length; i++) {
                if (genres[i].id === id) {
                    return (
                        <p key={id}>
                            {genres[i].name}
                            {index === genreIds.length - 1 ? "" : ","}&nbsp;
                        </p>
                    );
                }
            }
        })}
    </div>
  )
}