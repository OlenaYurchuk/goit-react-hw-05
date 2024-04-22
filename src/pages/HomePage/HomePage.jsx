import { useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../../data/movies-api';
import TrendingMoviesList from '../../components/TrendingMoviesList/TrendingMoviesList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage
  from '../../components/ErrorMessage/ErrorMessage';
export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTrendingMovies = async () => {
      setIsLoading(true);
      try {
        const data = await fetchTrendingMovies();
        setMovies(data);
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false);
      }
    }
    getTrendingMovies();
  }, [])

  return (
    <div>
      <p>Trending today</p>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <TrendingMoviesList movies={movies} />
    </div>
  )
}