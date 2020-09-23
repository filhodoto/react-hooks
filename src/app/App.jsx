import React from 'react';
import './app.scss';
import { useEffect, useReducer } from 'react';

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

const initialState = {
  loading: true,
  errorMessage: null,
  movies: [],
};

const moviesReducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH_MOVIES_REQUEST':
      return {
        ...state,
        loading: true,
        errorMessage: null,
      };

    case 'SEARCH_MOVIES_SUCCESS':
      return {
        ...state,
        loading: false,
        movies: action.payload,
      };

    case 'SEARCH_MOVIES_FAILURE':
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
      };
    default:
      break;
  }
};

const App = () => {
  // Set states with useReducer
  const [state, dispatch] = useReducer(moviesReducer, initialState);
  const { loading, errorMessage, movies } = state;

  // Fetch info from API and act on it
  const fetchInfo = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((jsonResponse) => {
        // If we have a response from our fetch
        if (jsonResponse.Response === 'True') {
          // Update movies state for the fetch response
          // setMovies(jsonResponse.Search);
          dispatch({
            type: 'SEARCH_MOVIES_SUCCESS',
            payload: jsonResponse.Search,
          });
        } else {
          // Set error message state
          dispatch({
            type: 'SEARCH_MOVIES_FAILURE',
            error: jsonResponse.Error,
          });
        }
      });
  };

  // Fetch info from api on component mount
  /*   
  As per React official docs:
  'think of useEffect Hook as componentDidMount, 
  componentDidUpdate,and componentWillUnmount combined.');
 */
  useEffect(() => {
    fetchInfo(MOVIE_API_URL);
  }, []);

  // Search function to fetch new movies
  const search = (searchValue) => {
    // Tell reducer we are requesting movies
    dispatch({
      type: 'SEARCH_MOVIES_REQUEST',
    });

    fetchInfo(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`);
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
