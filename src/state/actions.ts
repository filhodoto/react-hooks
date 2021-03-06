import { Dispatch } from 'react';
import { SEARCH_MOVIES_FAILURE, SEARCH_MOVIES_SUCCESS } from './actionTypes';
import { Action } from 'app/App';

// Fetch info from API and act on it
export const fetchInfo = (url: string, dispatch: Dispatch<Action>): void => {
  fetch(url)
    .then((response) => response.json())
    .then((jsonResponse) => {
      // If we have a response from our fetch
      if (jsonResponse.Response === 'True') {
        // Update movies state for the fetch response
        // setMovies(jsonResponse.Search);
        dispatch({
          type: SEARCH_MOVIES_SUCCESS,
          payload: jsonResponse.Search,
        });
      } else {
        // Set error message state
        dispatch({
          type: SEARCH_MOVIES_FAILURE,
          error: jsonResponse.Error,
        });
      }
    });
};
