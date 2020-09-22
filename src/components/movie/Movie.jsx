import React from 'react';
import './movie';
const DEFAULT_PLACEHOLDER_IMAGE =
  'https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg';

const Movie = (props) => {
  // Get poster image
  const poster =
    props.poster === 'N/A' ? DEFAULT_PLACEHOLDER_IMAGE : props.poster;

  return (
    <div className="movie">
      <h2 className="movie__title">{props.Title}</h2>
      <div>
        <img
          className="movie__image"
          width="200"
          alt={`The movie titled: ${props.Title}`}
          src={poster}
        />
      </div>
      <p className="movie__year">({props.Year})</p>
    </div>
  );
};

export default Movie;
