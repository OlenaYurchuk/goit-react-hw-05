import { Link, Outlet, useParams, useNavigate } from "react-router-dom"

export default function MovieDetailsPage() {
  const { id, poster_path, title, vote_average, overview, genre_ids } = useParams();
  console.log('ID:', id)
  console.log('title:', title)
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }

  // const genres = () => {
  //   return genre_ids.map(genreId => <span key={genreId}>{genreId}</span>)
  // }
  return (
    <main>
      <button type="button" onClick={goBack}>Go back</button>
      <div>
        <img src={poster_path} alt={title} />
        <div>
          <h2>{title}</h2>
          <p>User Score: {vote_average}</p>
          <h3></h3>
          <p>Overview</p>
          <h4>{overview}</h4>
          <p>Genres</p>
          <p>{genre_ids}</p>
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