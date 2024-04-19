import TrendingMoviesList from '../../components/TrendingMoviesList/TrendingMoviesList';

export default function HomePage({ movies }) {
  return (
    <div>
      <p>Trending today</p>
      <TrendingMoviesList movies={movies} />
    </div>
  )
}