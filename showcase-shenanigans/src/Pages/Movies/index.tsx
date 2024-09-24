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
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getData() {
            setLoading(true)
            const result = await fetch(`${import.meta.env.VITE_BASE_URL}/movie/${user && user.role === "admin" ? "all" : "active"}`)
            if (result.ok) {
                const data = await result.json()
                setAllMovies(data)
                setLoading(false)
            }
        }
        getData()
    }, [user])

    return (
        <div>
            <div className={styles.topBar}>
                <div className={styles.search}>
                    <Search query={query} setQuery={setQuery} />
                </div>
                {user?.role === "admin" && <Link to="/movies/add" className={styles.button}>Add</Link>}
            </div>
            <MovieList query={query} loading={loading} AllMovies={AllMovies} />
        </div>
    )

}
