import { Link } from "react-router-dom";
import MovieList from "./components/MovieList";
import Search from "./components/Search";
import styles from './index.module.css'
import { user, movie } from "../../utils/types";
import { useState, useEffect } from "react";

type MovieProps = {
    user: user | null,
}

export default function Movie({ user }: MovieProps) {
    const [AllMovies, setAllMovies] = useState<movie[] | null>(null)
    const [query, setQuery] = useState("")

    useEffect(() => {
        async function getData() {
            const result = await fetch(`${import.meta.env.VITE_BASE_URL}/movie/active`)
            if (result.ok) {
                const data = await result.json()
                setAllMovies(data)
            }
        }
        getData()
    }, [])

    return (
        <div>
            <div className={styles.topBar}>
                <div className={styles.search}>
                    <Search query={query} setQuery={setQuery} />
                </div>
                {user?.role === "admin" && <Link to="/movies/add" className={styles.button}>Add</Link>}
            </div>
            <MovieList query={query} AllMovies={AllMovies} />
        </div>
    )

}
