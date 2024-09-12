import { MovieType, user } from '../../../types'
import Movie from './Movie'
import styles from "./MovieList.module.css"

type MovieListProps = {
  Movies: MovieType[],
  query: string,
  user: user,
}


const MovieList = ({ Movies, query, user }: MovieListProps) => {

  let list = Movies
  if (query) {
    list = Movies.filter(movie => movie.title.toUpperCase().includes(query.toUpperCase()))
  }



  return (
    <div className={styles.container}>
      {list.map(movie => <Movie Movie={movie} user={user} />)}
      {list.length < 1 ? <h2 className={styles.heading}>No Results :(</h2> : ""}
    </div>
  )
}



export default MovieList
