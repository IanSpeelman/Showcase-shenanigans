import { MovieType } from "../../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import styles from "./Movie.module.css"

type MovieProps = {
  Movie: MovieType
}

const Movie = ({ Movie }: MovieProps) => {


  return (
    <div className={styles.container} >
      <img src={Movie.Image} alt={Movie.Title} className={styles.img} />
      <div className={styles.layout}>
        <div className={styles.content}>
          <h3>{Movie.Title}</h3>
          <p>{Movie.Description}</p>
        </div>
        <div className={styles.info}>
          <p>{Movie.Genre}</p>
          <div className={styles.set}>
            <FontAwesomeIcon icon={faClock} />
            <p> {Movie.Duration}min</p>
          </div>
          <p>Age: {Movie.Age_Category}</p>
          <Link to={`/movie/${Movie.Id}`} className={styles.button}>More info!</Link>
        </div>
      </div>
    </div >
  )


}



export default Movie
