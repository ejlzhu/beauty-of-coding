import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';

import PathFinding from './components/pathFinding/PathFinding';
import Header from './components/header/Header';
import DefaultPage from './components/defaultPage/DefaultPage';
import Sudoku from './components/sudoku/Sudoku';
import Sorting from './components/sorting/Sorting';
import SpaceColonize from './components/recursion/spaceColonize/SpaceColonize';
import BinaryTree from './components/recursion/binaryTree/BinaryTree';


function App() {
  return (
    <div>
      {/* <Header /> */}
      {/* <Recursion /> */}
      <BrowserRouter>
      <div>
        <Header />
        <Route exact path='/space-colonize' component={SpaceColonize} />
        <Route exact path='/binary-tree' component={BinaryTree} />
        <Route exact path="/" component={DefaultPage} />
        <Route exact path="/play-around-grid" component={PathFinding} />
        <Route exact path="/sudoku" component={Sudoku} />
        <Route exact path="/sorting" component={Sorting} />
      </div>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
