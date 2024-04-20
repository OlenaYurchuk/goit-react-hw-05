import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org";

export const fetchTrendingMovies = async () => {
  const url = "/3/trending/movie/week";

  const options = {
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOGM2ODJlNTIzNjExYzExNGE3ODFmYzBhM2EwOWYzOSIsInN1YiI6IjY2MjIzMGI1ZTRiNTc2MDE3ZGJkM2NkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ptg4psbgoj3NRxTnzloY8VvlY3PbqxvtmHy5KcahbXQ'
    }
  };
  
  const response = axios.get(url, options);
  return (await response).data.results;
}

