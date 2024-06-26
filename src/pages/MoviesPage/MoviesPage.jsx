import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchMovies } from "../../data/movies-api";
import SearchBar from "../../components/SearchBar/SearchBar";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Text from "../../components/Text/Text";
import Button from "../../components/Button/Button";
import css from "../MoviesPage/MoviesPage.module.css";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  useEffect(() => {
    if (!query) return;
    const getMovies = async () => {
      setIsLoading(true);
      try {
        const { results, total_pages } = await fetchMovies(query, page);

        if (results.length === 0) {
          setIsEmpty(true);
          return;
        }
        setMovies((prevMovies) => [...prevMovies, ...results]);
        setIsVisible(page < total_pages)
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    getMovies();
  }, [page, query, searchParams])


  const onHandleSubmit = (newQuery) => {
    setSearchParams({ query: newQuery });
    setPage(1);
    setMovies([]);
    setIsEmpty(false);
    setError(null);
  }

  // const updateQueryString = (newQuery) => {
  //   const nextParams = newQuery !== "" ? { newQuery } : {};
  //   setSearchParams(nextParams);
  // };

  const handleClick = () => {
    setPage((prevPage) => prevPage + 1)
  }

  return (
    <div className={css.container}>
      <SearchBar onSearch={onHandleSubmit} />
      {movies.length > 0 && < MovieList movies={movies} />}
      {isVisible && <Button onClick={handleClick} disabled={isLoading}>{isLoading ? 'loading' : 'loadmore'}</Button>}
      {!movies.length && !isEmpty && <Text textAlign="center">Let`s begin search 🔎</Text>}
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {isEmpty && <Text textAlign="center">Sorry. There are no movies ... 😭</Text>}
    </div>
  )
}