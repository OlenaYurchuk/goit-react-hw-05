import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org";

export const fetchTrendingMovies = async () => {
  const url = "/3/trending/movie/week";

  const options = {
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOGM2ODJlNTIzNjExYzExNGE3ODFmYzBhM2EwOWYzOSIsInN1YiI6IjY2MjIzMGI1ZTRiNTc2MDE3ZGJkM2NkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ptg4psbgoj3NRxTnzloY8VvlY3PbqxvtmHy5KcahbXQ'
    }
  };
  
  const response = await axios.get(url, options);
  return response.data.results;
}

export const fetchMovies = async (searchQuery, currentPage) => {
  const url = '/3/search/movie?';
 
  const options = {
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOGM2ODJlNTIzNjExYzExNGE3ODFmYzBhM2EwOWYzOSIsInN1YiI6IjY2MjIzMGI1ZTRiNTc2MDE3ZGJkM2NkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ptg4psbgoj3NRxTnzloY8VvlY3PbqxvtmHy5KcahbXQ'
    },
    params: {
      query: searchQuery,
      page: currentPage,
      per_page: 20
    }
  };
  
  const response = await axios.get(url, options);
  return response.data;
}

export const fetchMovieDetails = async (movieId) => {
  const url = `/3/movie/${movieId}`;

  const options = {
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOGM2ODJlNTIzNjExYzExNGE3ODFmYzBhM2EwOWYzOSIsInN1YiI6IjY2MjIzMGI1ZTRiNTc2MDE3ZGJkM2NkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ptg4psbgoj3NRxTnzloY8VvlY3PbqxvtmHy5KcahbXQ'
    },
  };

  const response = await axios.get(url, options);
  return response.data;
}

export const fetchMovieCast = async (movieId) => {
  const url = `/3/movie/${movieId}/credits`;
  
  const options = {
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOGM2ODJlNTIzNjExYzExNGE3ODFmYzBhM2EwOWYzOSIsInN1YiI6IjY2MjIzMGI1ZTRiNTc2MDE3ZGJkM2NkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ptg4psbgoj3NRxTnzloY8VvlY3PbqxvtmHy5KcahbXQ'
    },
  };

  const response = await axios.get(url, options);
  return response.data.cast;
}