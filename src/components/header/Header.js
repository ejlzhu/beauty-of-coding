import React from 'react';
import './Header.css';
import logo from './logo.png';

export default () => {
  return (
    <nav>
      <div className="nav-wrapper">
        <a href="/">
          <img className="logo" src={logo} width="30px" height="30px" />
        </a>
        <a className="beauty-of-coding" href="/">BeautyOfCoding</a>
        <ul className="header_links">
          <li>
            <a href="/play-around-grid" className="header_menu">
              PlayAroundGrid
            </a>
          </li>
          <li>
            <a href="/sorting" className="header_menu">
              Sorting
            </a>
          </li>
          <li>
            <a href="/sudoku" className="header_menu">
              Sudoku
            </a>
          </li>
          <li>
            <a href="/binary-tree" className="header_menu">
              Binary Tree
            </a>
          </li>
          <li>
            <a href="/space-colonize" className="header_menu">
              Space Colonization
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
