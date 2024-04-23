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

  const defaultImg = 'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';
  return (
    <div className={css.wrap}>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <ul className={css.list}>
        {cast.map((actor, index) => (
          <li className={css.item} key={`${actor.id}-${index}`}>
            <img className={css.img} src={
              actor.profile_path ?
                (`https://image.tmdb.org/t/p/w500/${actor.profile_path}`) :
                defaultImg} alt={actor.name} />
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