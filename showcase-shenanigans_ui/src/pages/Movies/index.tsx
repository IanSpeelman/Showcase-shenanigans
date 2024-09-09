import MovieList from "./Components/MovieList"
import { MovieType } from "../../types"
import Search from "./Components/Search"
import moviedata from "./movies.json"
import { useState } from "react";

const movies: MovieType[] = moviedata;

const Movies = () => {

  const [query, setQuery] = useState("")


  return (
    <div>
      <Search query={query} setQuery={setQuery} />
      <MovieList Movies={movies} query={query} />
    </div>
  )
}


export default Movies
