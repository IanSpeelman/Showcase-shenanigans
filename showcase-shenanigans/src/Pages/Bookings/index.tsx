import { useEffect, useState } from "react"
import { user, booking } from "../../utils/types"
import BookingItem from "./components/BookingItem"
import styles from './index.module.css'
type BookingsProps = {
    user: user | null,
}

export default function Bookings({ user }: BookingsProps) {
    const [bookings, setBookings] = useState<booking[] | null>(null)
    const [bookingsreversed, setBookingsreversed] = useState<booking[] | null>(null)
    const [loading, setLoading] = useState(true)
    const now = new Date();

    useEffect(() => {
        setLoading(true)
        if (user) {
            async function getData() {
                const result = await fetch(`${import.meta.env.VITE_BASE_URL}/booking/${user!.id}`, {
                    method: 'get',
                    headers: {
                        'Authorization': `bearer ${localStorage.getItem('JWT_Token')}`
                    },
                })
                if (result.ok) {
                    const data = await result.json()
                    setBookings(data)
                    setBookingsreversed(data.reverse())
                }
            }
            getData()
        }
        else {
            setBookings(null)
            setBookingsreversed(null)
        }
        setLoading(false)
    }, [user])

    if (!bookings || !bookingsreversed) {
        return <h1>no bookings found</h1>
    }

    if (loading) {
        return <h1>loading....</h1>
    }

    return (
        <div className={styles.component}>
            <h1>My Upcoming Events</h1>
            <div className={styles.container}>
                {bookings.map(booking => {
                    const date = new Date(booking.event.date)
                    if (date < now) {
                        return
                    }
                    return <BookingItem key={booking.id} booking={booking} />
                })}
            </div>
            <h1>My Past Events</h1>
            <div className={styles.container}>
                {bookingsreversed.map(booking => {
                    const date = new Date(booking.event.date)
                    if (date > now) {
                        return
                    }
                    return <BookingItem key={booking.id} booking={booking} />
                })}
            </div>
        </div>
    )
}
