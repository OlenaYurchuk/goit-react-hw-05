import { Link } from 'react-router-dom'

export default function MovieList({ movies }) {
  return (
    <div>
      <ul>
        {
          movies && movies.map((movie) => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}