import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Movie } from "../../../types"
import styles from './MovieInfo.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay } from "@fortawesome/free-solid-svg-icons/faPlay"
import { user } from "../../../types"

type MovieInfoProps = {
  id: string,
  user: user
}

const MovieInfo = ({ id, user }: MovieInfoProps) => {

  const [movie, setMovie] = useState<Movie | null>(null)
  const [isloading, setIsLoading] = useState(true)
  const [playVideo, setPlayVideo] = useState(false)
  const [displayNone, setDisplayNone] = useState(false)

  useEffect(() => {
    const getMovie = async (id: string) => {
      setIsLoading(true)
      const result = await fetch(`http://localhost:5002/movie/${id}`)
      if (result.ok) {
        const data = await result.json();
        setMovie(data);
        setIsLoading(false)
      }
    }
    getMovie(id)
  }, [id])

  const handleVideoClick = () => {
    setPlayVideo(true)

    setTimeout(() => setDisplayNone(true), 2000)
  }

  if (isloading) {
    return <div><h1>Loading...</h1></div>
  }

  if (!movie) {
    return <div><h1>Movie is not found...</h1></div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.trailer} onClick={handleVideoClick}>
        <FontAwesomeIcon className={`${styles.playbutton} ${playVideo && styles.hide} ${displayNone && styles.hidden}`} icon={faPlay} />
        <img className={`${styles.videocover} ${playVideo && styles.hide} ${displayNone && styles.hidden}`} src={movie.thumbnail} />
        {playVideo && <iframe className={styles.video} src={`https://www.youtube.com/embed/${movie.trailer}?iv_load_policy=3&autoplay=1`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}
      </div>
      <div className={styles.info}>
        <div className={styles.imagewrapper}>
          <img className={styles.image} src={movie.image} alt={movie.title} />
        </div>
        <div className={styles.titlewrapper}>
          <div className={styles.data}>
            <div>
              <h3>{movie.title}</h3>
              {user.role === "admin" && <Link className={styles.button} to={`/movies/edit/${movie.id}`}>Edit</Link>}
            </div>
            <p>{movie.description}</p>
          </div>
          <div className={styles.metadata} >
            <p>Length: {movie.duration} minutes</p>
            <p>Genre: {movie.genre}</p>
            <p>Age: {movie.age} years</p>
          </div>
        </div>
      </div>
    </div>
  )
}


export default MovieInfo
