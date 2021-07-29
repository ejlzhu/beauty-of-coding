import React from 'react';
import produce from 'immer';

import { initGrid } from '../../algorithms/sudoku/initGrid';
import { backtrack } from '../../algorithms/sudoku/visualizeFunctions';
import Cell from './cell/Cell';
import checkSudoku from '../../algorithms/sudoku/checkSudoku';
import './Sudoku.css';

const winGreeting = 'Bravo! You solved the puzzle!';
const sudokuWrongMessage = 'Check these cells!';

export default class Sudoku extends React.Component {
  constructor() {
    super();
    this.state = produce({}, () => ({
      grid: [],
      difficulityLevel: 'Easy',
      solutionStatus: '',
      visualizeSpeed: 'Fast'
    }));

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({ grid: initGrid(this.state.difficulityLevel) });
  }

  // check if the sudoku is valid
  checkSolution() {
    this.setState(
      produce(state => {
        let noWrongNums = checkSudoku(state.grid);
        if (noWrongNums) {
          this.setState({ solutionStatus: winGreeting });
        } else {
          this.setState({ solutionStatus: sudokuWrongMessage });
        }
      })
    );
  }

  // input of cell change
  handleChange(row, col, value) {
    // this.setState({ solutionStatus: '' });
    this.setState(
      produce(state => {
        state.grid[row][col].num = value;
        state.grid[row][col].wrongNum = false;
      })
    );
  }

  // clear input nums, keep default nums
  clearMyInput() {
    this.setState({ solutionStatus: '' });
    this.setState(
      produce(({ grid }) => {
        for (let i = 0; i < 9; i++) {
          for (let j = 0; j < 9; j++) {
            grid[i][j].wrongNum = false;
            if (!grid[i][j].readOnly) {
              grid[i][j].num = '';
            }
          }
        }
      })
    );
  }

  visualizeAutofill() {
    this.clearMyInput();

    let list = backtrack(JSON.parse(JSON.stringify(this.state.grid))); // deep copy

    let { visualizeSpeed } = this.state;
    let speed =
      visualizeSpeed === 'Rushing'
        ? 10
        : visualizeSpeed === 'Fast'
        ? 50
        : visualizeSpeed === 'Medium'
        ? 300
        : 800;

    let t = 0;
    while (list.length) {
      let curr = list.shift();
      setTimeout(() => {
        this.setState(
          produce(({ grid }) => {
            grid[curr.row][curr.col].num = curr.num;
          })
        );
      }, speed * t++);
    }
  }

  chooseDifficulityLevel(level) {
    this.clearMyInput();
    this.setState({ difficulityLevel: level, grid: initGrid(level) });
  }

  chooseSpeed(visualizeSpeed) {
    this.setState({ visualizeSpeed });
  }

  renderGrid() {
    const cells = this.state.grid.map((row, rowIdx) => {
      return (
        <div className="grid-cells-row" key={rowIdx}>
          {row.map((cell, cellIdx) => (
            <Cell
              key={cellIdx}
              row={cell.row}
              col={cell.col}
              num={cell.num}
              readOnly={cell.readOnly}
              wrongNum={cell.wrongNum}
              onChange={this.handleChange}
            />
          ))}
        </div>
      );
    });
    return cells;
  }

  render() {
    const solutionStatusClassName =
      this.state.solutionStatus === winGreeting
        ? 'sodoku-win-greeting'
        : 'sudoku-wrong-message';

    return (
      <div className="outer-wrapper">
        <nav className="inner-wrapper">
          <ul>
            <li>
              <a className="choose-algorithm" href="#">
                Difficulty Level:{' '}
                <i>
                  <span>{this.state.difficulityLevel}</span>
                </i>
              </a>

              <ul>
                <li onClick={() => this.chooseDifficulityLevel('Easy')}>
                  <a href="#">Easy</a>
                </li>
                <li onClick={() => this.chooseDifficulityLevel('Medium')}>
                  <a href="#">Medium</a>
                </li>
                <li onClick={() => this.chooseDifficulityLevel('Hard')}>
                  <a href="#">Hard</a>
                </li>
                <li onClick={() => this.chooseDifficulityLevel('Evil')}>
                  <a href="#">Evil</a>
                </li>
              </ul>
            </li>
            <li>
              <button onClick={() => this.checkSolution()}>
                Check Solution
              </button>
            </li>
            <li>
              <a className="choose-algorithm" href="#">
                Speed:{' '}
                <i>
                  <span>{this.state.visualizeSpeed}</span>
                </i>
              </a>

              <ul>
                <li onClick={() => this.chooseSpeed('Rushing')}>
                  <a href="#">Rushing</a>
                </li>
                <li onClick={() => this.chooseSpeed('Fast')}>
                  <a href="#">Fast</a>
                </li>
                <li onClick={() => this.chooseSpeed('Medium')}>
                  <a href="#">Medium</a>
                </li>
                <li onClick={() => this.chooseSpeed('Slow')}>
                  <a href="#">Slow</a>
                </li>
              </ul>
            </li>
            <li>
              <button onClick={() => this.visualizeAutofill()}>
                Visualize Autofill
              </button>
            </li>
            <li>
              <button onClick={() => this.clearMyInput()}>Clear Board</button>
            </li>
          </ul>
        </nav>
        <div className={`sudoku-solve-status ${solutionStatusClassName}`}>
          {this.state.solutionStatus}
        </div>
        <div>{this.renderGrid()}</div>
      </div>
    );
  }
}
