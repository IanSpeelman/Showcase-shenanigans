import { useParams } from "react-router-dom";
import { user } from "../../../types";
import MovieInfo from "./MovieInfo";
import ScheduleList from "../../Schedule/components/ScheduleList";


type MovieDetailsProps = {
    user: user
}

const MovieDetails = ({ user }: MovieDetailsProps) => {
    let { id } = useParams();
    if (!id) {
        id = "0"
    }

    return (
        <>
            <MovieInfo id={id?.toString()} user={user} />
            <ScheduleList />
        </>
    )
}

export default MovieDetails
