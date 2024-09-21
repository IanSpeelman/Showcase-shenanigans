import MovieListItem from "./MovieListItem";
import { AllMovies } from "../../../utils/movielist";
import styles from './MovieList.module.css'

export default function MovieList() {
    return (
        <div className={styles.container}>
            {AllMovies.map(movie => <MovieListItem Movie={movie} key={movie.id} />)}
            {AllMovies.map(movie => <MovieListItem Movie={movie} key={movie.id} />)}
            {AllMovies.map(movie => <MovieListItem Movie={movie} key={movie.id} />)}
        </div>
    )
}
