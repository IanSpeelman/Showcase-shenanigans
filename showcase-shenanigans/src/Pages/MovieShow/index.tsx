import Trailer from "./components/Trailer";
import MovieDetails from "./components/MovieDetails";
import Schedule from "./components/Schedule";
import { schedule } from "../../utils/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { user } from "../../utils/types";

type ShowPageProps = {
    user: user | null
}


export default function ShowPage({ user }: ShowPageProps) {

    const [movie, setMovie] = useState(null)
    const [ScheduleList, setScheduleList] = useState<schedule[] | null>(null)
    const { id } = useParams();

    useEffect(() => {
        async function getData() {
            const result = await fetch(`${import.meta.env.VITE_BASE_URL}/movie/${id}`)
            if (result.ok) {
                const data = await result.json()
                setMovie(data)
            }
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/event/movie/${id}`)
            if (res.ok) {
                const data = await res.json();
                setScheduleList(data)
            }
        }
        getData()
    }, [id])



    return (
        <div>
            <Trailer Movie={movie} user={user} />
            <MovieDetails Movie={movie} />
            <Schedule Schedule={ScheduleList} />
        </div>
    )
}
