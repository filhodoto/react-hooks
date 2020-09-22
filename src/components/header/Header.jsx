import React from 'react';
import './header.scss';

const Header = (props) => {
  return (
    <header className="app__header">
      <h2>{props.title}</h2>
    </header>
  );
};

export default Header;
