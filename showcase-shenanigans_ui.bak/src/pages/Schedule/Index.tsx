import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { schedule, user } from "../../types";
import ScheduleItem from "./components/ScheduleItem";

type AddScheduleProps = {
    user: user,
}


const AddSchedule = ({ user }: AddScheduleProps) => {


    const [schedule, setSchedule] = useState<schedule[]>([])
    const { id } = useParams();


    useEffect(() => {
        const getData = async () => {
            const result = await fetch(`http://localhost:5002/event/movie/${id}`)
            if (result.ok) {
                const data = await result.json()
                setSchedule(data);
            }
        }
        getData()
    }, [id])

    if (user.role !== "admin") return <h1>You are not authorized!</h1>

    return (
        <ul>
            {schedule.map(item => <ScheduleItem key={item.id} id={item.id.toString()} item={item} />)}
            <ScheduleItem key={0} id={id} item={undefined} />
        </ul>
    )
}

export default AddSchedule
