import MovieList from "./Components/MovieList"
import { user } from "../../types"
import Search from "./Components/Search"
import { useEffect, useState } from "react";
import styles from './index.module.css'
import { Link } from "react-router-dom"

type MoviesProps = {
  user: user,
}

const Movies = ({ user }: MoviesProps) => {

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
        setMovies(movies)
      }

    }
    getData()
  }, [user.role])


  return (
    <div className={styles.position}>
      <div className={styles.container}>
        {user.role === "admin" && <Link className={styles.button} to='/addmovie'>Add Movie</Link>}
        <Search query={query} admin={user.role === "admin"} setQuery={setQuery} />
      </div>
      <MovieList Movies={movies} query={query} user={user} />
    </div>
  )
}


export default Movies
