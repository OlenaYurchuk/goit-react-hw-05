import { useEffect, useState } from "react";
import { fetchMovieReview } from "../../data/movies-api";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Text from "../Text/Text";
import css from "../MovieReviews/MovieReviews.module.css";


export default function MovieReviews({ movieId }) {
  const [reviews, setReview] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  useEffect(() => {
    if (!movieId) return;
    const getMovieReview = async () => {
      setIsLoading(true);
      try {
        const reviewsData = await fetchMovieReview(movieId);
        if (reviewsData.length === 0) {
          setIsEmpty(true);
          return;
        }
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
    <div className={css.wrap}>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <ul className={css.list}>
        {reviews.map((review) => (
          <li className={css.item} key={review.id}>
            <p className={css.author}>Author: <span className={css.name}>{review.author}</span></p>
            <p className={css.content}>{review.content}</p>
          </li>
        ))}
      </ul>
      {isEmpty && <Text textAlign="center"> Sorry. No reviews information available ... 😭</Text>}
    </div>
  )
}