import { nanoid } from "nanoid"

export default function TrendingMoviesList({ movies }) {
  return (
    <ul>
      {
        movies && movies.map((movie) => (
          <li key={nanoid()}>{movie.title}</li>
        ))
      }
    </ul>
  )
}