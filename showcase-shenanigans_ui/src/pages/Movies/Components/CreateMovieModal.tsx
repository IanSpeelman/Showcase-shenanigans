import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './CreateMovieModal.module.css'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

type CreateMovieModalProps = {
  isOpen: boolean,
  setIsOpen: (arg0: boolean) => void,
}



const CreateMovieModal = ({ isOpen, setIsOpen }: CreateMovieModalProps) => {

  const [movieData, setMovieData] = useState({
    Title: "",
    Duration: 0,
    Genre: "",
    Description: "",
    Image: "",
    Trailer: "",
    Age: 0,
  })

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault()
    console.log(movieData)
  }



  return (
    <div className={`${styles.modal} ${isOpen && styles.visible}`}>
      <div className={styles.closebutton} onClick={() => setIsOpen(false)}><FontAwesomeIcon icon={faXmark} /></div>
      <h1 className={styles.title}>Add a new movie</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputcontainer}>
          <label htmlFor="title">Title</label>
          <input id="title" onChange={(e) => setMovieData({ ...movieData, Title: e.target.value })} value={movieData.Title} className={styles.input} type="text" placeholder="title" />
        </div>
        <div className={styles.inputcontainer}>
          <label htmlFor="duration">Duration</label>
          <input id="duration" onChange={(e) => setMovieData({ ...movieData, Duration: parseInt(e.target.value) })} value={movieData.Duration} className={styles.input} type="number" placeholder="Duration (minutes)" />
        </div>
        <div className={styles.inputcontainer}>
          <label htmlFor="genre">Genre</label>
          <input id="genre" onChange={(e) => setMovieData({ ...movieData, Genre: e.target.value })} value={movieData.Genre} className={styles.input} type="text" placeholder="genre" />
        </div>
        <div className={styles.inputcontainer}>
          <label htmlFor="description">Description</label>
          <textarea id="description" onChange={(e) => setMovieData({ ...movieData, Description: e.target.value })} value={movieData.Description} className={styles.input} placeholder="Description"></textarea>
        </div>
        <div className={styles.inputcontainer}>
          <label htmlFor="image">Image</label>
          <input id="image" onChange={(e) => setMovieData({ ...movieData, Image: e.target.value })} value={movieData.Image} className={styles.input} type="text" placeholder="Image (URL)" />
        </div>
        <div className={styles.inputcontainer}>
          <label htmlFor="trailer">Trailer (youtube url)</label>
          <input id="trailer" onChange={(e) => setMovieData({ ...movieData, Trailer: e.target.value })} value={movieData.Trailer} className={styles.input} type="text" placeholder="Trailer (Youtube link)" />
        </div>
        <div className={styles.inputcontainer}>
          <label htmlFor="age">Age</label>
          <input id="age" onChange={(e) => setMovieData({ ...movieData, Age: parseInt(e.target.value) })} value={movieData.Age} className={styles.input} type="Number" placeholder="Age" />
        </div>
        <div className={styles.buttoncontainer}>
          <button className={styles.button}>Add new movie!</button>
        </div>
      </form>
    </div>
  )
}


export default CreateMovieModal
