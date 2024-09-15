import { Movie as MovieType } from "../../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import styles from "./Movie.module.css"

type MovieProps = {
  Movie: MovieType
}

const Movie = ({ Movie }: MovieProps) => {


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
          <Link to={`/movies/${Movie.id}`} className={styles.button}>More info!</Link>
        </div>
      </div>
    </div >
  )


}



export default Movie
