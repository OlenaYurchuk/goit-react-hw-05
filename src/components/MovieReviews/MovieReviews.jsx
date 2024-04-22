import { useEffect, useState } from "react"
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { fetchMovieReview } from "../../data/movies-api";

export default function MovieReviews({ movieId }) {
  const [reviews, setReview] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const getMovieReview = async () => {
      setIsLoading(true);
      try {
        const reviewsData = await fetchMovieReview(movieId);
        setReview(reviewsData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false)
      }
    }
    getMovieReview();
  }, [movieId])

  return (
    <div>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {reviews === null && <p>No reviews information available</p>}
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <p>Author: {review.author}</p>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}