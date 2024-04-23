import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div>
      <p>Ooops... Page not found. Sorry!</p>
      <p>Please visit our <Link to='/'>Home Page</Link></p>
    </div>
  )
}