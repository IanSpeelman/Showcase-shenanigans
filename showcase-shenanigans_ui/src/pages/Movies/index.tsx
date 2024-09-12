import MovieList from "./Components/MovieList"
import { user } from "../../types"
import Search from "./Components/Search"
import { useEffect, useState } from "react";
import styles from './index.module.css'
import CreateMovieModal from "./Components/CreateMovieModal";

type MoviesProps = {
  user: user,
}

const Movies = ({ user }: MoviesProps) => {

  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [movies, setMovies] = useState([])

  useEffect(() => {
    let url = "http://localhost:5002/movie/active";
    if (user.role === "admin") {
      url = "http://localhost:5002/movie/all"
    }
    const getData = async () => {
      const result = await fetch(url)
      if (result.ok) {
        const movies = await result.json()
        console.log(movies)
        setMovies(movies)
      }

    }
    getData()
  }, [user.role])


  return (
    <div className={styles.position}>
      <div className={styles.container}>
        {user.role === "admin" && <button className={styles.button} onClick={() => setIsOpen(true)}>Add movie</button>}
        <Search query={query} admin={user.role === "admin"} setQuery={setQuery} />
      </div>
      <MovieList Movies={movies} query={query} user={user} />
      {user.role === "admin" && <CreateMovieModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  )
}


export default Movies
