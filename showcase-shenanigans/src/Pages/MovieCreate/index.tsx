import styles from './index.module.css'
import { user, movie } from "../../utils/types"
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import EventForm from './components/EventForm'
import { schedule } from '../../utils/types'
type MovieCreateProps = {
    user: user | null,
}



export default function MovieCreate({ user }: MovieCreateProps) {
    const { id } = useParams()
    const navigate = useNavigate();
    const [movie, setMovie] = useState<movie>({ id: 0, title: "", image: "", thumbnail: "", trailer: "", genre: "", age: 0, duration: 0, description: "", active: true })
    let url = `${import.meta.env.VITE_BASE_URL}/movie/new`
    let method = "post"
    if (id) {
        url = `${import.meta.env.VITE_BASE_URL}/movie/edit/${id}`
        method = "put"
    }
    const [events, setEvents] = useState<schedule[] | null>(null)


    useEffect(() => {
        async function getData() {
            const result = await fetch(`${import.meta.env.VITE_BASE_URL}/movie/${id}`)
            if (result.ok) {
                const data = await result.json();
                setMovie(data)
            }
            const eventsresult = await fetch(`${import.meta.env.VITE_BASE_URL}/event/movie/${id}`)
            if (eventsresult.ok) {
                const events = await eventsresult.json()
                setEvents(events)
                console.log(events)
            }
        }
        getData()
    }, [id])




    async function submitMovie() {
        if (
            movie.title.length > 0 &&
            movie.image.length > 0 &&
            movie.thumbnail.length > 0 &&
            movie.trailer.length > 0 &&
            movie.genre.length > 0 &&
            movie.duration > 0 &&
            movie.description.length > 0) {

            const result = await fetch(url, {
                method: method,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("JWT_Token")}`,
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify(movie)
            })
            if (result.ok) {
                const data = await result.json();
                navigate(`/movies/${data.id}`);
            }
        }
    }

    if (user?.role === 'admin') return (
        <div className={styles.container}>
            <div className={styles.column}>
                {!id && <h1 className={styles.heading}>Add Movie</h1>}
                {id && <h1 className={styles.heading}>Edit Movie</h1>}
                <input className={styles.inputitem} value={movie.title} onChange={(e) => setMovie({ ...movie, title: e.target.value })} type="text" id="title" placeholder='Title' />
                <input className={styles.inputitem} value={movie.image} onChange={(e) => setMovie({ ...movie, image: e.target.value })} type="text" id="poster" placeholder='Poster link' />
                <input className={styles.inputitem} value={movie.thumbnail} onChange={(e) => setMovie({ ...movie, thumbnail: e.target.value })} type="text" id="thumbnail" placeholder='Thumbnail link' />
                <input className={styles.inputitem} value={movie.trailer} onChange={(e) => setMovie({ ...movie, trailer: e.target.value })} type="text" id="trailer" placeholder='Trailer link' />
                <input className={styles.inputitem} value={movie.genre} onChange={(e) => setMovie({ ...movie, genre: e.target.value })} type="text" id="genres" placeholder='Genres - comma seperated' />
                <input className={styles.inputitem} value={movie.age} onChange={(e) => setMovie({ ...movie, age: parseInt(e.target.value) })} type="number" id="age" placeholder='age restriction' />
                <input className={styles.inputitem} value={movie.duration} onChange={(e) => setMovie({ ...movie, duration: parseInt(e.target.value) })} type="number" id="duration" placeholder='duration' />
                <textarea className={styles.textarea} value={movie.description} onChange={(e) => setMovie({ ...movie, description: e.target.value })} id="description" placeholder='Description'></textarea>
                <div>
                    <label htmlFor="active" >active?</label>
                    <input className={`${styles.inputitem} ${styles.check}`} id='active' type="checkbox" checked={movie.active} onChange={() => setMovie({ ...movie, active: !movie.active })} />
                </div>
                <button onClick={submitMovie} className={styles.button}>Add!</button>
            </div>
            {id ? (
                <div className={styles.column}>
                    <h1 className={styles.heading}>Edit Schedule</h1>
                    {events?.map((event: schedule) => <EventForm event={event} movieId={movie.id} />)}
                    <EventForm event={null} movieId={movie.id} />
                </div>
            ) : null}
        </div>
    )




    return <h1>You dont have permission</h1>
}
