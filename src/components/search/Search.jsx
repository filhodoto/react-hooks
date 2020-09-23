import React, { useState } from 'react';
import './search.scss';

const Search = (props) => {
  /*   
  Set state with useState   
  Structure is:
  [currentState, function that update currenState] = useState( this is the initial state )
 */
  const [searchValue, setSearchValue] = useState('');

  // Handle search input changes
  const handleSearchInputChanges = (ev) => {
    setSearchValue(ev.target.value);
  };

  // Handle search action
  const callSearchFunction = (ev) => {
    // prevent default for action
    ev.preventDefault();

    // Send input text value to search function that got passed via props
    props.search(searchValue);

    // Clean input value
    setSearchValue('');
  };

  return (
    <form className="search">
      <input
        value={searchValue}
        onChange={handleSearchInputChanges}
        type="text"
      />
      <input onClick={callSearchFunction} type="submit" value="search" />
    </form>
  );
};

export default Search;
