import React, { Reducer } from 'react';
import './app.scss';
import { useEffect, useReducer } from 'react';

import Header from 'components/Header/Header';
import Search from 'components/Search/Search';
import Movie, { Movie as IMovie } from 'components/Movie/Movie';
import { moviesReducer } from 'state/reducer';
import { SEARCH_MOVIES_REQUEST } from 'state/actionTypes';
import { fetchInfo } from 'state/actions';
import { CORS_ANYWHERE_HEROKU, MOVIE_API_URL } from 'state/config';

export interface State {
  loading: boolean;
  errorMessage: null | string;
  movies: IMovie[];
}

export interface Action {
  type: string;
  payload?: State['movies'];
  error?: State['errorMessage'];
}

// Set initial state
const initialState: State = {
  loading: true,
  errorMessage: null,
  movies: [],
};

// Loading element
const Loading = (): JSX.Element => {
  return <span>Loading...</span>;
};

// Error message element
const ErrorMessage = (props: { errorMessage: string }): JSX.Element => {
  return <div className="errorMessage">{props.errorMessage}</div>;
};

const App = (): JSX.Element => {
  // Set states with useReducer
  const [state, dispatch] = useReducer<Reducer<State, Action>>(
    moviesReducer,
    initialState
  );

  const { loading, errorMessage, movies } = state;

  // Fetch info from api on component mount
  /*   
  As per React official docs:
  'think of useEffect Hook as componentDidMount, 
  componentDidUpdate,and componentWillUnmount combined.');
 */
  useEffect(() => {
    fetchInfo(MOVIE_API_URL, dispatch);
  }, []);

  // Search function to fetch new movies
  const searchFunc = (searchValue: string) => {
    // Tell reducer we are requesting movies
    dispatch({
      type: SEARCH_MOVIES_REQUEST,
    });

    fetchInfo(
      `${CORS_ANYWHERE_HEROKU}https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`,
      dispatch
    );
  };

  return (
    <div className="app">
      <Header title="Hooks" />
      <Search searchFunc={searchFunc} />
      <div className="movies">
        {loading && !errorMessage ? (
          // if there's loading and no error message show loading
          <Loading />
        ) : // If there's NO loading but there's and error message show error message
        errorMessage ? (
          <ErrorMessage errorMessage={errorMessage} />
        ) : (
          // If there's no loading and error message show movies
          movies!.map((movie: IMovie, index: number) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
