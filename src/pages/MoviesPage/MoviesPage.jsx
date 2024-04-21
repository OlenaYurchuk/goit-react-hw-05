import { useEffect, useState } from 'react'
import { fetchMovies } from '../../data/movies-api'
import SearchBar from "../../components/SearchBar/SearchBar"
import MovieList from "../../components/MovieList/MovieList"
import Loader from "../../components/Loader/Loader"
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
  }

  useEffect(() => {
    async function getMovies() {
      try {
        if (query) {
          setError(false);
          setIsLoading(true);
          const data = await fetchMovies(query);
          setMovies(data);
        } else {
          setMovies([]);
        }
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getMovies();
  }, [query])

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <MovieList movies={movies} />
    </div>
  )
}