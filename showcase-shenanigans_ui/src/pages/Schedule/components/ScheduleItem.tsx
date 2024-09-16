import { useState } from "react"
import { schedule } from "../../../types"

type ScheduleItemProps = {
    item: schedule | undefined,
    id: string | undefined,
}

const ScheduleItem = ({ id, item }: ScheduleItemProps) => {

    const [dateTime, setDateTime] = useState(item?.date.toString() ?? "2000-01-01 00:00:00")
    let url = `http://localhost:5002/event/edit/${id}`
    if (item === undefined) {
        url = `http://localhost:5002/event/new`
    }



    const handleDateChange = (e: React.FormEvent<HTMLInputElement>) => {
        const dateString = e.currentTarget.value
        setDateTime(dateString)
    }


    const handleSubmit = () => {
        fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${localStorage.getItem("JWT_token")}`
            },
            body: JSON.stringify({ date: `${dateTime}:00Z`, movieid: item?.movie.id ?? id })
        })
    }


    if (item !== undefined) {
        return <li>{item.movie.title} {item.date.toString()} <input type="datetime-local" value={dateTime.toString().slice(0, 16)} onChange={(e) => handleDateChange(e)} /><button onClick={handleSubmit}>Save</button></li>
    }
    return <li>Create new event <input type="datetime-local" value={dateTime.toString().slice(0, 16)} onChange={(e) => handleDateChange(e)} /><button onClick={handleSubmit}>Save</button></li>

}

export default ScheduleItem
