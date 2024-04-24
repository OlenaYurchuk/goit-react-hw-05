import { Link } from "react-router-dom";
import css from "../NotFoundPage/NotFoundPage.module.css";
export default function NotFoundPage() {
  return (
    <div className={css.wrap}>
      <p>Ooops... Page not found. Sorry!</p>
      <p>Please visit our <Link to='/' className={css.link}>Home Page</Link></p>
    </div>
  )
}