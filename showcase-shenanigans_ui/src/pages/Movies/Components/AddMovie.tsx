import { FormEvent, useState, useEffect } from 'react'
import { user, } from '../../../types'
import styles from './AddMovie.module.css'
import { useParams, useNavigate } from 'react-router-dom'
type AddMovieProps = {
    user: user,
}


const AddMovie = ({ user }: AddMovieProps) => {
    const navigate = useNavigate();

    const { id } = useParams();
    const [movie, setMovie] = useState({ Title: "", Description: "", Duration: 0, Image: "", Genre: "", Age: 0, Thumbnail: "", Trailer: "", Active: true })
    const [url, setUrl] = useState("http://localhost:5002/movie/new")
    const [method, setMethod] = useState("post")

    useEffect(() => {
        if (id) {
            setUrl(`http://localhost:5002/movie/edit/${id}`)
            setMethod("put")
            const getMovie = async () => {
                const result = await fetch(`http://localhost:5002/movie/${id}`)
                const data = await result.json()
                if (data) {
                    setMovie({
                        Age: parseInt(data.age),
                        Title: data.title,
                        Trailer: data.trailer,
                        Genre: data.genre,
                        Thumbnail: data.thumbnail,
                        Description: data.description,
                        Image: data.image,
                        Duration: data.duration,
                        Active: data.active
                    })
                    movie.Age = data.age
                    movie.Title = data.title
                    movie.Trailer = data.trailer
                    movie.Genre = data.genre
                    movie.Thumbnail = data.thumbnail
                    movie.Description = data.description

                }
            }
            getMovie();
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (window.confirm("movie will be submitted, continue?")) {
            const submit = async () => {
                const result = await fetch(url, {
                    method: method,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('JWT_token')}`
                    },
                    body: JSON.stringify(movie)
                })
                if (result.ok) {
                    if (id) navigate(`/movies/${id}`)
                    else navigate("/movies")
                }
            }
            submit()

        }
    }

    if (user.role !== "admin") {
        return <div><h1>You dont have access to this page...</h1></div>
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} className={styles.container}>
            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="title">Title</label>
                <input id="title" className={styles.input} type="text" placeholder="Title" value={movie.Title} onChange={(e) => setMovie({ ...movie, Title: e.target.value })} />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="description">Description</label>
                <textarea id="description" className={`styles.input styles.textarea`} placeholder="Description" value={movie.Description} onChange={(e) => setMovie({ ...movie, Description: e.target.value })}></textarea>
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="duration">Playtime</label>
                <input id="duration" className={styles.input} type="text" placeholder="Playtime" value={movie.Duration} onChange={(e) => setMovie({ ...movie, Duration: parseInt(e.target.value) })} />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="image">Movie Poster</label>
                <input id="image" className={styles.input} type="text" placeholder="Movie poster" value={movie.Image} onChange={(e) => setMovie({ ...movie, Image: e.target.value })} />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="genre">Genres</label>
                <input id="genre" className={styles.input} type="text" placeholder="Genres separated by commas" value={movie.Genre} onChange={(e) => setMovie({ ...movie, Genre: e.target.value })} />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="age">Age Category</label>
                <input id="age" className={styles.input} type="text" placeholder="Age category" value={movie.Age} onChange={(e) => setMovie({ ...movie, Age: parseInt(e.target.value) })} />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="thumbnail">Thumbnail</label>
                <input id="thumbnail" className={styles.input} type="text" placeholder="Thumbnail" value={movie.Thumbnail} onChange={(e) => setMovie({ ...movie, Thumbnail: e.target.value })} />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="trailer">Trailer</label>
                <input id="trailer" className={styles.input} type="text" placeholder="Trailer" value={movie.Trailer} onChange={(e) => setMovie({ ...movie, Trailer: e.target.value })} />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="active">Active</label>
                <input id="active" type="checkbox" checked={movie.Active} onChange={(e) => setMovie({ ...movie, Active: e.target.checked })} />
            </div>

            <button className={styles.button}>Add Movie!</button>
        </form>
    );
}


export default AddMovie
