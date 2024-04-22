import { useEffect, useState } from "react";
import { fetchMovieCast } from "../../data/movies-api";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Text from "../Text/Text";
import css from "../MovieCast/MovieCast.module.css"

export default function MovieCast({ movieId }) {
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    if (!movieId) return;
    const getMovieCast = async () => {
      setIsLoading(true);
      try {
        const castData = await fetchMovieCast(movieId);
        if (castData.length === 0) {
          setIsEmpty(true);
          return;
        }
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
    <div className={css.wrap}>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <ul className={css.list}>
        {cast.filter(actor => actor.profile_path).map((actor, index) => (
          <li className={css.item} key={`${actor.id}-${index}`}>
            <img className={css.img} src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`} alt={actor.name} />
            <div className={css.content}>
              <p className={css.name}>{actor.name}</p>
              <p className={css.character}>Character: <span className={css.role}>{actor.character}</span></p>
            </div>
          </li>
        ))}
      </ul>
      {isEmpty && <Text textAlign="center"> Sorry. No cast information available ... 😭</Text>}
    </div>
  )
}