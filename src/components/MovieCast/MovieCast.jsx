import { useEffect, useState } from "react";
import { fetchMovieCast } from "../../data/movies-api";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function MovieCast({ movieId }) {
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovieCast = async () => {
      if (!movieId) return;
      setIsLoading(true);
      try {
        const castData = await fetchMovieCast(movieId);
        setCast(castData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    getMovieCast();
  }, [movieId])

  return (
    <div>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {cast.length === 0 && <p>No cast information available</p>}
      <ul>
        {cast.filter(actor => actor.profile_path).map((actor, index) => (
          <li key={`${actor.id}-${index}`}>
            <>
              <img src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`} alt={actor.name} />
              <p>{actor.name}</p>
              <p>Character: {actor.character}</p></>
          </li>
        ))}
      </ul>
    </div>
  )
}