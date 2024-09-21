import { Link } from "react-router-dom"
import { movie } from "../../../utils/types"
import styles from './MovieListItem.module.css'

type MovieListItemProps = {
    Movie: movie
}


export default function MovieListItem({ Movie }: MovieListItemProps) {
    return (
        <Link to={`/movies/${Movie.id}`} className={styles.MovieListItem}>
            <img className={styles.image} src={Movie.image} alt={Movie.title} />
            <div className={styles.titlecontainer}>
                <h6 className={styles.title}>{Movie.title}</h6>
            </div>
        </Link>
    )
}
