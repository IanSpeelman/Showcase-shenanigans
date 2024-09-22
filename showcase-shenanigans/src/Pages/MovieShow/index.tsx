import Trailer from "./components/Trailer";
import MovieDetails from "./components/MovieDetails";
import Schedule from "./components/Schedule";
import { ScheduleList } from "../../utils/scheduleListls";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ShowPage() {

    const [movie, setMovie] = useState(null)
    const { id } = useParams();

    useEffect(() => {
        async function getData() {
            const result = await fetch(`${import.meta.env.VITE_BASE_URL}/movie/${id}`)
            if (result.ok) {
                const data = await result.json()
                setMovie(data)
            }
        }
        getData()
    }, [id])



    return (
        <div>
            <Trailer Movie={movie} />
            <MovieDetails Movie={movie} />
            <Schedule Schedule={ScheduleList} />
        </div>
    )
}
