import { useState } from "react"
import { schedule } from "../../../utils/types"
import BookingModal from "./BookingModal"
import styles from './ScheduleItem.module.css'

type ScheduleItemProps = {
    Item: schedule,
}


export default function ScheduleItem({ Item }: ScheduleItemProps) {

    const date = new Date(Item.date)
    const [showModal, setShowModal] = useState(false)

    return (
        <div className={styles.container}>
            <p onClick={() => setShowModal(!showModal)} className={styles.item}>{date.getUTCHours() < 10 ? `0${date.getUTCHours()}` : date.getUTCHours()}:{date.getUTCMinutes() < 10 ? `0${date.getUTCMinutes()}` : date.getUTCMinutes()}</p>
            <BookingModal Event={Item} showModal={showModal} setShowModal={setShowModal} />
        </div>
    )
}
