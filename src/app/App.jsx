import React from 'react';
import './app.scss';
import { useState, useEffect } from 'react';

import Header from '../components/Header/Header';
import Search from '../components/Search/Search';
import Movie from '../components/Movie/Movie';

// Url used to fetch information from API
const MOVIE_API_URL = 'https://www.omdbapi.com/?s=man&apikey=4a3b711b';

// Loading element
const Loading = () => {
  return <span>Loading...</span>;
};

// Error message element
const ErrorMessage = (props) => {
  return <div className="errorMessage">{props.errorMessage}</div>;
};

const App = () => {
  // Set states
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [movies, setMovies] = useState([]);

  // Fetch info from api on component mount
  /*   
  As per React official docs:
  'think of useEffect Hook as componentDidMount, 
  componentDidUpdate,and componentWillUnmount combined.');
 */
  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then((response) => response.json())
      .then((jsonResponse) => {
        // If we have a response from our fetch
        if (jsonResponse.Response) {
          // Update movies state for the fetch response
          setMovies(jsonResponse.Search);
        } else {
          // Set error message state
          setErrorMessage(jsonResponse.Error);
        }
        // Stop loading
        setLoading(false);
      });
  }, []);

  // Search function to fetch new movies
  const search = (searchValue) => {
    setLoading(true);
    setErrorMessage(null);

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.Response === 'True') {
          setMovies(jsonResponse.Search);
          setLoading(false);
        } else {
          setErrorMessage(jsonResponse.Error);
          setLoading(false);
        }
      });
  };

  return (
    <div className="app">
      <Header title="Header title" />
      <Search search={search} />
      <div className="movies">
        {loading && !errorMessage ? (
          // if there's loading and no error message show loading
          <Loading />
        ) : // If there's NO loading but there's and error message show error message
        errorMessage ? (
          <ErrorMessage />
        ) : (
          // If there's no loading and error message show movies
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
