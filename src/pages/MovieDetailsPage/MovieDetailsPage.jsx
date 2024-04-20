import { Link, Outlet, useParams } from "react-router-dom"

export default function MovieDetailsPage({ movie: { poster_path, title, vote_average, overview, genre_ids } }) {
  const id = useParams();
  console.log(id)
  return (
    <main>
      <button type="button">Go back</button>
      <div>
        <img src={poster_path} alt={title} />
        <div>
          <h2>{title}</h2>
          <p>User Score: {vote_average}</p>
          <h3></h3>
          <p>Overview</p>
          <h4>{overview}</h4>
          <p>Genres</p>
          <ul>
            {genre_ids.map((genre, index) => (
              <li key={index}>{genre}</li>
            ))}
          </ul>
        </div>
      </div>
      <ul>
        <li>
          <Link to={`/movies/${id}/cast`}>Cast</Link>
        </li>
        <li>
          <Link to={`/movies/${id}/reviews`}>Review</Link>
        </li>
      </ul>
      <Outlet />
    </main>
  )
}