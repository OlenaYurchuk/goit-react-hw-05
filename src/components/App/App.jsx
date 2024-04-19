import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navigation from '../Navigation/Navigation'
import HomePage from '../../pages/HomePage/HomePage'
import MoviesPage from '../../pages/MoviesPage/MoviesPage'
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage'
import './App.css'
import { fetchTrendingMovies } from '../../data/movies-api'

function App() {

  const [trendingMovies, setTrendingMovies] = useState([]);

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
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path='/' element={<HomePage movies={trendingMovies} />} />
        <Route path='/movies' element={<MoviesPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App
