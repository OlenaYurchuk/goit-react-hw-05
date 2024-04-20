import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchTrendingMovies } from '../../data/movies-api'
import { fetchMovies } from '../../data/movies-api'
import Navigation from '../Navigation/Navigation'
import HomePage from '../../pages/HomePage/HomePage'
import MoviesPage from '../../pages/MoviesPage/MoviesPage'
import MovieDetailsPage from '../../pages/MovieDetailsPage/MovieDetailsPage'
import MovieCast from '../MovieCast/MovieCast'
import MovieReviews from '../MovieReviews/MovieReviews'
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage'
import './App.css'



function App() {

  const [trendingMovies, setTrendingMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
  }

  useEffect(() => {
    async function getTrendingMovies() {
      try {
        const data = await fetchTrendingMovies();
        console.log(data)
        setTrendingMovies(data);
      } catch (error) { console.log(error) }
    }
    getTrendingMovies();
  }, [])

  useEffect(() => {
    async function getMovies() {
      try {
        if (query) {
          const data = await fetchMovies(query);
          setMovies(data);
        } else {
          setMovies([]);
        }
      } catch (error) { console.log(error) }
    }
    getMovies();
  }, [query])

  return (
    <div>
      <Navigation />
      <Routes>
        <Route path='/' element={<HomePage movies={trendingMovies} />} />
        <Route path='/movies' element={<MoviesPage onSearch={handleSearch} />} />
        <Route path='/movies/:id' element={<MovieDetailsPage />} >
          <Route path='cast' element={<MovieCast />} />
          <Route path='reviews' element={<MovieReviews />} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App
