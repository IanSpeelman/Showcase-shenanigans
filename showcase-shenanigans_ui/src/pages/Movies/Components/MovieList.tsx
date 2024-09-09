import { MovieType } from '../../../types'
import Movie from './Movie'
import styles from "./MovieList.module.css"

type MovieListProps = {
  Movies: MovieType[],
  query: string,
}


const MovieList = ({ Movies, query }: MovieListProps) => {

  let list = Movies
  if (query) {
    list = Movies.filter(movie => movie.Title.toUpperCase().includes(query.toUpperCase()))
  }



  return (
    <div className={styles.container}>
      {list.map(movie => <Movie Movie={movie} />)}
      {list.length < 1 ? <h2 className={styles.heading}>No Results :(</h2> : ""}
    </div>
  )
}



export default MovieList
