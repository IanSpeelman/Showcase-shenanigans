import { useState, useRef, useEffect } from "react"
import { schedule, user } from "../../../utils/types"
import styles from './BookingModal.module.css'


type BookingModalProps = {
    user: user | null
    Event: schedule,
    showModal: boolean,
    setShowModal: (arg0: boolean) => void,
    setHidden: (arg0: boolean) => void
}



export default function BookingModal({ setHidden, user, Event, showModal, setShowModal }: BookingModalProps) {

    const date = new Date(Event.date)
    const [count, setCount] = useState(1);
    const modalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {

        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLDivElement
            if (modalRef.current && !modalRef.current.contains(target)) {
                setShowModal(false);
            }
        }

        if (showModal) {
            document.addEventListener('mousedown', handleClick)
        }

        else {
            document.removeEventListener('mousedown', handleClick)
        }

    }, [showModal, setShowModal])

    function handleLogin() {
        setHidden(false)
        window.scroll(0, 0)
    }



    if (user) return (
        <div className={`${styles.container} ${!showModal && styles.hidden}`} ref={modalRef}>
            <div className={styles.header}>
                <h5>{Event.movie.title} - {date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:{date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}</h5>
            </div>
            <div className={styles.controls}>
                <span className={styles.controlButton} onClick={() => setCount(count - 1 > 1 ? count - 1 : 1)}>-</span>
                <p className={styles.controlCounter}>{count}</p>
                <span className={styles.controlButton} onClick={() => setCount(count + 1)}>+</span>
                {count === 1 && <p>person</p>}
                {count !== 1 && <p>people</p>}
            </div>
            <button className={styles.button}>Reserve</button>
        </div>
    )

    return (
        <div className={`${styles.container} ${!showModal && styles.hidden}`} ref={modalRef}>
            <h3 onClick={handleLogin}>Please login!</h3>
        </div>
    )


}

