import { useEffect, useState } from "react";
import { Link, Outlet, useParams, useNavigate } from "react-router-dom"
import { fetchMovieDetails } from "../../data/movies-api";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";
import Button from "../../components/Button/Button";
import css from "../MovieDetailsPage/MovieDetailsPage.module.css";

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

  const toggleMovieCast = () => {
    setShowMovieCast(true)
    setShowMovieReview(false)
  }
  const toggleMovieReview = () => {
    setShowMovieCast(false)
    setShowMovieReview(true)
  }
  const defaultImg = 'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';
  return (
    <>
      <Button className={css.button} type="button" onClick={goBack}>Go back</Button>
      <main className={css.container}>
        {isLoading && <Loader />}
        {error && <ErrorMessage />}
        <div className={css.wrap}>
          <div className={css.imgWrap}>
            <img className={css.img} src={
              poster_path ?
                (`https://image.tmdb.org/t/p/w500/${poster_path}`) :
                defaultImg
            } alt={title} />
          </div>
          <div>
            <h2 className={css.title}>{title}</h2>
            <p className={css.score}>User Score: {vote_average}</p>
            <h3>Overview</h3>
            <p className={css.overviewText}>{overview}</p>
            <h3>Genres</h3>
            {genres && genres.length > 0 ? (
              <ul className={css.genres}>{genres.map(genre => <li
                className={css.genresItem} key={genre.id}>{genre.name}</li>)}</ul>
            ) : (
              <p>Genres not available</p>
            )}
          </div>
        </div>
        <ul className={css.details}>
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
    </>
  )
}