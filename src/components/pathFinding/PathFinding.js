import React, { Component } from 'react';
import Node from './node/Node';

import dijkstra from '../../algorithms/pathFidingAlgorithms/dijkstra';
import dfs from '../../algorithms/pathFidingAlgorithms/dfs';
import { getShortestPathNodes } from '../../algorithms/pathFidingAlgorithms/helperFunctions';
import bfs from '../../algorithms/pathFidingAlgorithms/bfs';
import bidirectBFS from '../../algorithms/pathFidingAlgorithms/bidirectBFS';
import astar from '../../algorithms/pathFidingAlgorithms/astar';
import './PathFinding.css';

const START_NODE_ROW = 9;
const START_NODE_COL = 9;
const END_NODE_ROW = 12;
const END_NODE_COL = 34;
const NUM_ROWS = 19;
const NUM_COLS = 45;

export default class PathFinding extends Component {
  constructor() {
    super();
    this.state = {
      algorithm: 'bfs',
      grid: [],
      mousePressed: false
    };
  }

  componentDidMount() {
    const grid = this.getInitGrid();
    this.setState({ grid });
  }

  clearGrid() {
    for (let row = 0; row < NUM_ROWS; row++) {
      for (let col = 0; col < NUM_COLS; col++) {
        let node = this.state.grid[row][col];
        const className = node.isEnd
          ? 'node-end'
          : node.isStart
          ? 'node-start'
          : '';
        document.getElementById(
          `node-${node.row}-${node.col}`
        ).className = `node ${className}`;
      }
    }
    const grid = this.getInitGrid();
    this.setState({ grid });
  }

  getInitGrid() {
    const matrix = [];
    for (let row = 0; row < NUM_ROWS; row++) {
      let currRow = [];
      for (let col = 0; col < NUM_COLS; col++) {
        currRow.push(this.createNode(row, col));
      }
      matrix.push(currRow);
    }
    return matrix;
  }

  createNode(row, col) {
    return {
      col,
      row,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isEnd: row === END_NODE_ROW && col === END_NODE_COL,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null
    };
  }

  getNewGridWithWallToggled(grid, row, col) {
    let newGrid = grid.slice();
    let node = grid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall
    };
    newGrid[row][col] = newNode;
    return newGrid;
  }

  isStartNode(node) {
    return node.col === START_NODE_COL && node.row === START_NODE_ROW;
  }

  isEndNode(node) {
    return node.col === END_NODE_COL && node.row === END_NODE_ROW;
  }

  animateVisitedNodes(visitedNodesInOrder, shortestPathNodes) {
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      const node = visitedNodesInOrder[i];
      if (this.isStartNode(node) || this.isEndNode(node)) continue;
      setTimeout(() => {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, 10 * i);
    }
    setTimeout(() => {
      this.animateShortestPath(shortestPathNodes);
    }, 10 * (visitedNodesInOrder.length + 1));
  }

  animateShortestPath(shortestPathNodes) {
    for (let i = 0; i < shortestPathNodes.length; i++) {
      const node = shortestPathNodes[i];
      if (this.isStartNode(node) || this.isEndNode(node)) continue;
      setTimeout(() => {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 50 * i);
    }
  }

  visualizePathFinding() {
    let { grid, algorithm } = this.state;
    let startNode = grid[START_NODE_ROW][START_NODE_COL];
    let endNode = grid[END_NODE_ROW][END_NODE_COL];
    let visitedNodesInOrder = [];
    if (algorithm === 'bfs') {
      visitedNodesInOrder = bfs(grid, startNode, endNode);
    } else if (algorithm === 'dfs') {
      visitedNodesInOrder = dfs(grid, startNode, endNode);
    } else if (algorithm === 'dijkstra') {
      visitedNodesInOrder = dijkstra(grid, startNode, endNode);
    } else if (algorithm === 'A*') {
      visitedNodesInOrder = astar(grid, startNode, endNode);
    } else {
      visitedNodesInOrder = bidirectBFS(grid, startNode, endNode);
    }
    let shortestPathNodes = getShortestPathNodes(endNode);
    this.animateVisitedNodes(visitedNodesInOrder, shortestPathNodes);
  }

  handleMouseDown(row, col) {
    const newGrid = this.getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid, mousePressed: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mousePressed) return;
    const newGrid = this.getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mousePressed: false });
  }

  chooseAlgorithm(algo) {
    this.setState({algorithm: algo});
  }

  renderGrid() {
    const nodes = this.state.grid.map((row, rowIdx) => {
      return (
        <div className="grid-row" key={rowIdx}>
          {row.map(
            (
              { row, col, isStart, isEnd, isVisited, inShortestPath, isWall },
              nodeIdx
            ) => (
              <Node
                key={nodeIdx}
                row={row}
                col={col}
                isStart={isStart}
                isEnd={isEnd}
                isWall={isWall}
                isVisited={isVisited}
                inShortestPath={inShortestPath}
                mousePressed={this.state.mousePressed}
                onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                onMouseUp={() => this.handleMouseUp()}
              />
            )
          )}
        </div>
      );
    });
    return nodes;
  }

  render() {
    return (
      <div className="outer-wrapper">
        <nav className="inner-wrapper">
          <ul>
            <li>
              <a className="choose-algorithm" href="#">
    Choose Algorithm: <i><span>{this.state.algorithm}</span></i>
              </a>

              <ul>
                <li onClick={() => this.chooseAlgorithm('A*')}>
                  <a href="#">A* Search</a>
                </li>
                <li onClick={() => this.chooseAlgorithm('dijkstra')}>
                  <a href="#">Dijkstra</a>
                </li>
                <li onClick={() => this.chooseAlgorithm('bfs')}>
                  <a href="#">Breadth First Search</a>
                </li>
                <li onClick={() => this.chooseAlgorithm('dfs')}>
                  <a href="#">Depth First Search</a>
                </li>
                <li onClick={() => this.chooseAlgorithm('bidirect-bfs')}>
                  <a href="#">Bidirectional BFS</a>
                </li>
              </ul>
            </li>
            <li>
              <button onClick={() => this.visualizePathFinding()}>
                Find A Path
              </button>
            </li>
            <li>
              <button>Generate Maze</button>
            </li>
            <li>
              <button onClick={() => this.clearGrid()}>Clear Grid</button>
            </li>
          </ul>
        </nav>

        <div className="grid">{this.renderGrid()}</div>
      </div>
    );
  }
}
