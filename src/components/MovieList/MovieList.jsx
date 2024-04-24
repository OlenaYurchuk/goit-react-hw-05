import { Link, useLocation } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { BiCameraMovie } from "react-icons/bi";
import css from "../MovieList/MovieList.module.css";

export default function MovieList({ movies }) {
  const location = useLocation();
  return (
    <div className={css.wrap}>
      <ul>
        {
          movies && movies.map((movie) => (
            <li key={nanoid()}>
              <BiCameraMovie className={css.icon} />
              <Link to={`/movies/${movie.id}`} state={location}>
                {movie.title}
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}