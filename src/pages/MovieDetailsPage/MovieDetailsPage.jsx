import { useEffect, useState } from "react";
import { Link, Outlet, useParams, useNavigate } from "react-router-dom"
import { fetchMovieDetails } from "../../data/movies-api";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";

export default function MovieDetailsPage() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showMovieCast, setShowMovieCast] = useState(false);
  const [showMovieReview, setShowMovieReview] = useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDetails() {
      try {
        setIsLoading(true);
        const details = await fetchMovieDetails(id);
        setMovieDetails(details);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDetails();
  }, [id])

  const goBack = () => navigate(-1);


  const { title, poster_path, vote_average, overview, genres } = movieDetails;

  const toggleMovieCast = () => setShowMovieCast(prevState => !prevState)
  const toggleMovieReview = () => setShowMovieReview(prevState => !prevState)
  return (
    <main>
      <button type="button" onClick={goBack}>Go back</button>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <div>
        <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={title} />
        <div>
          <h2>{title}</h2>
          <p>User Score: {vote_average}</p>
          <h3>Overview</h3>
          <p>{overview}</p>
          <h3>Genres</h3>
          {genres && genres.length > 0 ? (
            <ul>{genres.map(genre => <li key={genre.id}>{genre.name}</li>)}</ul>
          ) : (
            <p>Genres not available</p>
          )}
        </div>
      </div>
      <ul>
        <li>
          <Link to={`/movies/${id}/cast`} onClick={toggleMovieCast}>Cast</Link>
        </li>
        <li>
          <Link to={`/movies/${id}/reviews`} onClick={toggleMovieReview}>Review</Link>
        </li>
      </ul>
      <Outlet />
      {showMovieCast && <MovieCast movieId={id} />}
      {showMovieReview && <MovieReviews movieId={id} />}
    </main>
  )
}