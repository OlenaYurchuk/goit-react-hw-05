import { Routes, Route } from 'react-router-dom'
import Layout from '../Layout/Layout'
import HomePage from '../../pages/HomePage/HomePage'
import MoviesPage from '../../pages/MoviesPage/MoviesPage'
import MovieDetailsPage from '../../pages/MovieDetailsPage/MovieDetailsPage'
import MovieCast from '../MovieCast/MovieCast'
import MovieReviews from '../MovieReviews/MovieReviews'
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage'
import './App.css'

function App() {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/movies' element={<MoviesPage />} />
          <Route path='/movies/:id' element={<MovieDetailsPage />} >
            <Route path='cast' element={<MovieCast />} />
            <Route path='reviews' element={<MovieReviews />} />
          </Route>
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </div>
  )
}

export default App
