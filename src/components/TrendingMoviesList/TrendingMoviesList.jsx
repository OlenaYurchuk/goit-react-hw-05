import { Link } from "react-router-dom"
import { nanoid } from "nanoid"

export default function TrendingMoviesList({ movies }) {
  return (
    <ul>
      {
        movies && movies.map((movie) => (
          <li key={nanoid()}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))
      }
    </ul>
  )
}