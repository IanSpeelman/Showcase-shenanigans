import MovieList from "./Components/MovieList"
import { MovieType, user } from "../../types"
import Search from "./Components/Search"
import moviedata from "./movies.json"
import { useState } from "react";
import styles from './index.module.css'
import CreateMovieModal from "./Components/CreateMovieModal";

const movies: MovieType[] = moviedata;
type MoviesProps = {
  user: user,
}

const Movies = ({ user }: MoviesProps) => {

  const [isOpen, setIsOpen] = useState(true)
  const [query, setQuery] = useState("")


  return (
    <div className={styles.position}>
      <div className={styles.container}>
        {user.role === "admin" && <button className={styles.button} onClick={() => setIsOpen(true)}>Add movie</button>}
        <Search query={query} admin={user.role === "admin"} setQuery={setQuery} />
      </div>
      <MovieList Movies={movies} query={query} />
      {user.role === "admin" && <CreateMovieModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  )
}


export default Movies
