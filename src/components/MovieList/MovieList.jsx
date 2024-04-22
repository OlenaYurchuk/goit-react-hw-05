import { Link } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { BiCameraMovie } from "react-icons/bi";
import css from "../MovieList/MovieList.module.css";

export default function MovieList({ movies }) {
  return (
    <div className={css.wrap}>
      <ul>
        {
          movies && movies.map((movie) => (
            <li key={nanoid()}>
              <BiCameraMovie />
              <Link to={`/movies/${movie.id}`}> {movie.title}</Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}