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
    Active: true,
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = await fetch("http://localhost:5002/movie/new", {
      method: "post",
      headers: new Headers({
        "Authorization": `bearer ${localStorage.getItem("JWT_token")}`,
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(movieData)
    })
    if (result.ok) {
      setIsOpen(false)
      setMovieData({ Title: "", Duration: 0, Genre: "", Description: "", Image: "", Trailer: "", Age: 0, Active: true })
    }
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
          <input id="duration" onChange={(e) => setMovieData({ ...movieData, Duration: parseInt(e.target.value) })} value={movieData.Duration} className={styles.input} type="number" placeholder="Duration (minutes)" min="0" />
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
          <input id="age" onChange={(e) => setMovieData({ ...movieData, Age: parseInt(e.target.value) })} value={movieData.Age} className={styles.input} type="Number" placeholder="Age" min="0" />
        </div>
        <div className={styles.inputcontainer}>
          <label htmlFor="active">Active?</label>
          <input type='checkbox' id='active' onChange={(e) => setMovieData({ ...movieData, Active: e.target.checked })} checked={movieData.Active} />
        </div>
        <div className={styles.buttoncontainer}>
          <button className={styles.button}>Add new movie!</button>
        </div>
      </form>
    </div>
  )
}


export default CreateMovieModal
