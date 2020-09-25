import {
  SEARCH_MOVIES_REQUEST,
  SEARCH_MOVIES_SUCCESS,
  SEARCH_MOVIES_FAILURE,
} from './actionTypes';

import { State, Action } from 'app/App';
export const moviesReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SEARCH_MOVIES_REQUEST:
      return {
        ...state,
        loading: true,
        errorMessage: null,
      };

    case SEARCH_MOVIES_SUCCESS:
      return {
        ...state,
        loading: false,
        // Because movies is optional typecript adds "| undefined" to it's type
        // However we know this is always defined even if empty, so we add "!" to bypass the typescipt error of "might be undefined"
        // "!: identifier! removes null and undefined from the type of identifier:"
        movies: action.payload!,
      };

    case SEARCH_MOVIES_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: action.error!,
      };

    default:
      return state; // This state will never be reached, however typescript will put errors if we do not set this
  }
};
