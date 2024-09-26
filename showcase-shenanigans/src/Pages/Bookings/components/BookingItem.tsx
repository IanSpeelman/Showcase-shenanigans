import { booking } from "../../../utils/types"
import styles from './BookingItem.module.css'
import { Link } from "react-router-dom";

type BookingItemProps = {
    booking: booking,
}


export default function BookingItem({ booking }: BookingItemProps) {

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date(booking.event.date)
    const dateString = `${date.getDate()} ${months[date.getMonth()]}`
    const timeString = `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()} `


    return (
        <Link to={`/movies/${booking.event.movie.id}`} className={styles.container}>
            <div className={styles.imagecontainer}>
                <img className={styles.image} src={booking.event.movie.image} alt={booking.event.movie.title} />
            </div>
            <div className={styles.bottom}>
                <div className={styles.date}>
                    <p>{dateString}</p>
                    <p>{timeString}</p>
                </div>
                <div className={styles.movie}>
                    <p>{booking.event.movie.title}</p>
                    <p>{booking.event.movie.duration} minutes</p>
                    <p>{booking.event.movie.genre}</p>
                </div>
            </div>
        </Link>
    )
}
