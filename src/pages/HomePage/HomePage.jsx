import { useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../../data/movies-api';
import TrendingMoviesList from '../../components/TrendingMoviesList/TrendingMoviesList';

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function getTrendingMovies() {
      try {
        const data = await fetchTrendingMovies();
        console.log(data)
        setMovies(data);
      } catch (error) { console.log(error) }
    }
    getTrendingMovies();
  }, [])
  return (
    <div>
      <p>Trending today</p>
      <TrendingMoviesList movies={movies} />
    </div>
  )
}