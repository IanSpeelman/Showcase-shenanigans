import { MovieType } from "../../../../../../types"


type MovieProps = {
  Movie: MovieType
}

const Movie = ({ Movie }: MovieProps) => {
  return (
    <div>
      <h3>{Movie.Title}</h3>
    </div>

  )
}


export default Movie
