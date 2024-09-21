import Trailer from "./components/Trailer";
import MovieDetails from "./components/MovieDetails";
import Schedule from "./components/Schedule";
import { AllMovies } from "../../utils/movielist";
import { ScheduleList } from "../../utils/scheduleListls";

export default function ShowPage() {



    return (
        <div>
            <Trailer Movie={AllMovies[2]} />
            <MovieDetails Movie={AllMovies[2]} />
            <Schedule Schedule={ScheduleList} />
        </div>
    )
}
