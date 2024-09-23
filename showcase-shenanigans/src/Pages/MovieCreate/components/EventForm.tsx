import { schedule } from "../../../utils/types"
import styles from './EventForm.module.css'
import Flatpickr from 'react-flatpickr'
import './DatePicker.css'
import { useEffect, useState } from "react"

type EventFromProps = {
    movieId: number,
    event: schedule | null,
}



export default function EventForm({ movieId, event }: EventFromProps) {
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        if (event) {
            setDate(new Date(event.date.toString()))
        }
    }, [event])



    const newEvent = {
        eventId: event?.id ? event.id : 0,
        date: date,
        movieId: movieId
    }

    const [changed, setChanged] = useState(false)
    let url = `${import.meta.env.VITE_BASE_URL}/event/new`
    let method = "post"
    if (event) {
        url = `${import.meta.env.VITE_BASE_URL}/event/edit/${event.id}`
        method = "put"
    }
    function handleChange([date]: Date[]) {
        setDate(date)
        setChanged(true);
    }

    function handleSubmit() {
        if (changed) {
            async function getData() {
                const result = await fetch(url, {
                    method: method,
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("JWT_Token")}`,
                        "Content-Type": "Application/json"
                    },
                    body: JSON.stringify(newEvent)
                })
                if (result.ok) {
                    setChanged(false)
                }
            }
            getData()
        }
    }

    function handleDelete() {
        console.log("handle Delete")
    }


    return (
        <div className={styles.eventform}>
            <Flatpickr className={styles.datepicker} data-enable-time value={date} onChange={handleChange} options={{ time_24hr: true }} />
            <div className={styles.controls}>
                <svg className={`${styles.icon} ${changed && styles.confirm}`} onClick={handleSubmit} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16"> <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" /> </svg>
                <svg className={`${styles.icon} ${styles.delete}`} onClick={handleDelete} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" strokeWidth="3" stroke="currentColor" fill="none"><line x1="8.06" y1="8.06" x2="55.41" y2="55.94" /><line x1="55.94" y1="8.06" x2="8.59" y2="55.94" /></svg>
            </div>
        </div>
    )

}
