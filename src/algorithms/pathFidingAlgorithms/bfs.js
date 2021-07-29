import { isValidElement } from "react";

const directs = [[-1, 0], [1, 0], [0, -1], [0, 1]];

// run BFS algorithm, return all nodes in the order in which they are visited.
// make nodes point back to their previous node, allowing us to compute the shortest
// path by backtracking from the end node.
export default function bfs(grid, startNode, endNode) {
  const visitedNodesInOrder = []; // to be returned
  visitedNodesInOrder.push(startNode);

  let visitingNodes = [];
  visitingNodes.push(startNode);
  startNode.isVisited = true;

  while (visitingNodes.length) {
    let node = visitingNodes.shift();
    for (let dir of directs) {
      let x = dir[0] + node.row, y = dir[1] + node.col;
      if (isValid(x, y, grid)) {
        grid[x][y].isVisited = true;
        grid[x][y].previousNode = node;
        visitingNodes.push(grid[x][y]);
        visitedNodesInOrder.push(grid[x][y]);

        if (grid[x][y] === endNode) return visitedNodesInOrder;
      }
    }
  }
  return visitedNodesInOrder;
  
}

function isValid(x, y, grid) {
  let m = grid.length, n = grid[0].length;
  return x >= 0 && x < m && y >= 0 && y < n && !grid[x][y].isVisited && !grid[x][y].isWall;
}

