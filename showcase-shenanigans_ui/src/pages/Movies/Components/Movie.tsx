import { MovieType, user } from "../../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import styles from "./Movie.module.css"

type MovieProps = {
  Movie: MovieType
  user: user,
}

const Movie = ({ Movie, user }: MovieProps) => {


  return (
    <div className={`${styles.container} ${!Movie.active && styles.inactive}`} >
      <img src={Movie.image} alt={Movie.title} className={styles.img} />
      <div className={styles.layout}>
        <div className={styles.content}>
          <h3>{Movie.title}</h3>
          <p>{Movie.description}</p>
        </div>
        <div className={styles.info}>
          <p>{Movie.genre}</p>
          <div className={styles.set}>
            <FontAwesomeIcon icon={faClock} />
            <p> {Movie.duration}min</p>
          </div>
          <p>Age: {Movie.age}</p>
          <Link to={`/movie/${Movie.id}`} className={styles.button}>More info!</Link>
          {user.role == "admin" && <Link to={`/movie/${Movie.id}/edit`} className={styles.button}>Edit!</Link>}
        </div>
      </div>
    </div >
  )


}



export default Movie
