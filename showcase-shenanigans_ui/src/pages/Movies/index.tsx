import MovieList from "./Components/MovieList"
import { MovieType } from "../../types"

const movies: MovieType[] = [
  {
    Image: "https://upload.wikimedia.org/wikipedia/en/2/23/Deadpool_%282016_poster%29.png",
    Duration: 90,
    Genre: "Comedy",
    Description: "Awesome movie about stupid shit",
    Title: "Deadpool",
    YouTube_Trailer: "https://youtu.be/Xithigfg7dA?si=eomfmUweIBtpJe7c",
    Age_Category: "R"
  }
]

const Movies = () => {
  return (
    <>

      <h2>Movies</h2>
      <MovieList Movies={movies} />
    </>
  )
}


export default Movies
