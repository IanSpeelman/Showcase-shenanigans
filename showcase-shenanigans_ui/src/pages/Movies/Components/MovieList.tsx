import { MovieType } from '../../../types'
import Movie from './Movie'
import styles from "./MovieList.module.css"

type MovieListProps = {
  Movies: MovieType[],
}


const MovieList = ({ Movies }: MovieListProps) => {
  return (
    <div className={styles.container}>
      <h1>movie list</h1>
      {Movies.map(movie => <Movie Movie={movie} />)}
    </div>
  )
}



export default MovieList
