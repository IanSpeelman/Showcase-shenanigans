import { Link } from "react-router-dom";
import MovieList from "./components/MovieList";
import Search from "./components/Search";
import styles from './index.module.css'

export default function Movie() {

    return (
        <div>
            <div className={styles.topBar}>
                <div className={styles.search}>
                    <Search />
                </div>
                <Link to="/movies/add" className={styles.button}>Add</Link>
            </div>
            <MovieList />
        </div>
    )

}
