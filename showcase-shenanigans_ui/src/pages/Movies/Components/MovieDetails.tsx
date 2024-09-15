import { useParams } from "react-router-dom";
import { user } from "../../../types";
import MovieInfo from "./MovieInfo";


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
    </>
  )
}

export default MovieDetails
