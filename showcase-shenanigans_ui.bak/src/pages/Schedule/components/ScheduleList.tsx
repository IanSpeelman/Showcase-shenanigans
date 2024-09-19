import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { schedule } from "../../../types"

const ScheduleList = () => {
    const { id } = useParams()
    const [events, setEvents] = useState<schedule[]>([])

    useEffect(() => {
        const getData = async () => {
            const result = await fetch(`http://localhost:5002/event/movie/${id}`)
            if (result.ok) {
                const data = await result.json()
                setEvents(data)
            }
        }
        getData()
    }, [id])


    const RegisterToEvent = (e: React.MouseEvent<HTMLElement>) => {
        console.log(`register to event ${e.currentTarget.dataset.id}`)
    }



    return (
        <ul>
            {events.map(event => <li key={event.id} data-id={event.id} onClick={(e) => RegisterToEvent(e)}>{event.date.toString()}</li>)}
        </ul>
    )
}


export default ScheduleList

