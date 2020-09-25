import React, { FunctionComponent } from 'react';
import { DEFAULT_PLACEHOLDER_IMAGE } from 'state/config';
import './movie.scss';

export interface Movie {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

const Movie: FunctionComponent<{ movie: Movie }> = ({ movie }): JSX.Element => {
  // Get poster image
  const poster =
    movie.Poster === 'N/A' ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;

  return (
    <div className="movie">
      <h2 className="movie__title">{movie.Title}</h2>
      <div>
        <img
          className="movie__image"
          width="200"
          alt={`The movie titled: ${movie.Title}`}
          src={poster}
        />
      </div>
      <p className="movie__year">({movie.Year})</p>
    </div>
  );
};

export default Movie;
