import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
import { BiCameraMovie } from "react-icons/bi";

export default function TrendingMoviesList({ movies }) {
  return (
    <ul>
      {
        movies && movies.map((movie) => (
          <li key={nanoid()}>
            <BiCameraMovie />
            <Link to={`/movies/${movie.id}`}> {movie.title}</Link>
          </li>
        ))
      }
    </ul>
  )
}