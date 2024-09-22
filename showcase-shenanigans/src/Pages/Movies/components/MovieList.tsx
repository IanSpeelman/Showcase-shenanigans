import MovieListItem from "./MovieListItem";
import styles from './MovieList.module.css'
import { movie } from "../../../utils/types";
import { useEffect, useState } from "react";

type MovieListProps = {
    query: string | null,
    AllMovies: movie[] | null,
}

export default function MovieList({ query, AllMovies }: MovieListProps) {
    const [filteredMovies, setFilteredMovies] = useState<movie[] | null | undefined>(null)

    useEffect(() => {
        if (query) {
            setFilteredMovies(AllMovies?.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase())))
        }
        else {
            setFilteredMovies(AllMovies)
        }
    }, [AllMovies, query])



    return (
        <div className={styles.container}>
            {filteredMovies && filteredMovies.map(movie => <MovieListItem Movie={movie} key={movie.id} />)}
            {!filteredMovies && <h1>No results...</h1>}
        </div>
    )
}
