import { useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../../data/movies-api';
import TrendingMoviesList from '../../components/TrendingMoviesList/TrendingMoviesList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Button from '../../components/Button/Button';
import Text from '../../components/Text/Text';
import css from "../HomePage/HomePage.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const getTrendingMovies = async () => {
      setIsLoading(true);
      try {
        const { results, total_pages } = await fetchTrendingMovies(page);
        if (results.length === 0) {
          setIsEmpty(true);
          return;
        }
        setMovies((prevMovies) => [...prevMovies, ...results]);
        setIsVisible(page < total_pages);
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false);
      }
    }
    getTrendingMovies();
  }, [page])

  const handleClick = () => {
    setPage((prevPage) => prevPage + 1)
  }

  return (
    <div className={css.wrap}>
      <h2 className={css.title}>Trending today</h2>
      {movies.length > 0 && <TrendingMoviesList movies={movies} />}
      {isVisible && <Button onClick={handleClick} disabled={isLoading}>{isLoading ? 'loading' : 'loadmore'}</Button>}
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {isEmpty && <Text textAlign="center">Sorry. There are no movies ... 😭</Text>}
    </div>
  )
}