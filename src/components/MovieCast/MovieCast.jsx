import { useEffect, useState } from "react";
import { fetchMovieCast } from "../../data/movies-api";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function MovieCast({ movieId }) {
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    if (!movieId) return;
    const getCast = async () => {
      setIsLoading(true);
      try {
        const castData = await fetchMovieCast(movieId);
        console.log(castData)
        setCast(castData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    getCast();
  }, [movieId])

  return (
    <div>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <>
        {/* {cast.length === 0 && <p>No cast information available</p>} */}
        {cast.map((actor) => (
          <div key={actor.id}>
            <img src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`} alt={actor.name} />
            <p>{actor.name}</p>
            <p>Character: {actor.character}</p>
          </div>
        ))}
      </>
    </div>
  )
}