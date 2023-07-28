import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Genres({genreIds, component}) {
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
        {component === "details"
            ? genreIds.map((item, index) => (
                <p key={item.id}>{item.name}
                {index === genreIds.length - 1 ? "" : ","}&nbsp;</p>
            ))
            : genreIds.map((id, index) => {
                for(let i = 0; i < genres.length; i++) {
                    if (genres[i].id === id) {
                        return (
                            <p key={id}>
                                {genres[i].name}
                                {/* If it's on the last item in the list, don't put anything after it
                                Otherwise, put a comma */}
                                {index === genreIds.length - 1 ? "" : ","}&nbsp;
                            </p>
                        );
                    }
                }
            })
        }
    </div>
  )
}