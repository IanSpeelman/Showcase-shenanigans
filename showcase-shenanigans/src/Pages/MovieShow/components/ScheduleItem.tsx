import { useState } from "react"
import { schedule, user } from "../../../utils/types"
import BookingModal from "./BookingModal"
import styles from './ScheduleItem.module.css'

type ScheduleItemProps = {
    Item: schedule,
    user: user | null
    setHidden: (arg0: boolean) => void
}


export default function ScheduleItem({ setHidden, Item, user }: ScheduleItemProps) {

    const date = new Date(Item.date)
    const [showModal, setShowModal] = useState(false)

    return (
        <div className={styles.container}>
            <p onClick={() => setShowModal(!showModal)} className={styles.item}>{date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:{date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}</p>
            <BookingModal setHidden={setHidden} Event={Item} showModal={showModal} setShowModal={setShowModal} user={user} />
        </div>
    )
}
