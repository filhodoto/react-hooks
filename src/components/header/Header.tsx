import React, { FunctionComponent } from 'react';
import './header.scss';

interface HeaderProps {
  title: string;
}

const Header: FunctionComponent<HeaderProps> = (props): JSX.Element => {
  return (
    <header className="app__header">
      <h2>{props.title}</h2>
    </header>
  );
};

export default Header;
