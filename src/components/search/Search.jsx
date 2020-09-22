import React from 'react';
import './search';

const Search = (props) => {
  // Handle search input changes
  const handleSearchInputChanges = () => {};

  // Handle search action
  const callSearchFunction = () => {};

  return (
    <form className="search">
      <input
        value={searchValue}
        onChange={handleSearchInputChanges}
        type="text"
      />
      <input onClick={callSearchFunction} type="submit" value="SEARCH" />
    </form>
  );
};

export default Search;
