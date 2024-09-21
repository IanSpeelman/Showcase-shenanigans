import { useState, useRef, useEffect } from "react"
import { schedule } from "../../../utils/types"
import styles from './BookingModal.module.css'


type BookingModalProps = {
    Event: schedule,
    showModal: boolean,
    setShowModal: (arg0: boolean) => void
}



export default function BookingModal({ Event, showModal, setShowModal }: BookingModalProps) {

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




    return (
        <div className={`${styles.container} ${!showModal && styles.hidden}`} ref={modalRef}>
            <div className={styles.header}>
                <h5>{Event.movie.title} - {date.getUTCHours()}:{date.getUTCMinutes()}</h5>
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
}

