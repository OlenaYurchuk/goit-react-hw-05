import { useEffect, useState } from 'react'
import { fetchMovies } from '../../data/movies-api'
import SearchBar from "../../components/SearchBar/SearchBar"
import MovieList from "../../components/MovieList/MovieList"
import Loader from "../../components/Loader/Loader"
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import Text from '../../components/Text/Text'
import Button from "../../components/Button/Button"

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!query) return;
    const getMovies = async () => {
      setIsLoading(true);
      try {
        const { results, total_results, per_page } = await fetchMovies(query, page);

        if (results.length === 0) {
          setIsEmpty(true);
          return;
        }
        setMovies((prevMovies) => [...prevMovies, ...results]);
        setIsVisible(page < Math.ceil(total_results / per_page))

      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getMovies();
  }, [query, page])


  const onHandleSubmit = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setMovies([]);
    setIsEmpty(false);
    setError(null);
  }

  const handleClick = () => {
    setPage((prevPage) => prevPage + 1)
  }

  return (
    <div>
      <SearchBar onSearch={onHandleSubmit} />
      {!movies.length && !isEmpty && <Text textAlign="center">Let`s begin search 🔎</Text>}
      {isLoading && <Loader />}
      {error && <ErrorMessage /> - { error }}
      {!isLoading && !error && < MovieList movies={movies} />}
      {isVisible && <Button onClick={handleClick} disabled={isLoading}>{isLoading ? 'loading' : 'loadmore'}</Button>}
      {isEmpty && <Text textAlign="center">Sorry. There are no movies ... 😭</Text>}

    </div>
  )
}