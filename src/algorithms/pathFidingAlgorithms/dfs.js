/* run DFS, return all nodes in the order in which they are visited.
make nodes point back to their previous node, allowing us to compute the shortest
path by backtracking from the end node. */
/*Find a path, but not guarented to be the shortest path. Stack over flow if find shortest path.*/
const directs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
let visitedNodesInOrder = [];
let respath = [];

export default function dfs(grid, startNode, endNode) {
  if (!dfsHelper(grid, startNode, endNode, [])) return visitedNodesInOrder;

  // shortest path point to previous node
  for (let i = respath.length - 1; i > 0; i--) {
    respath[i].previousNode = respath[i - 1];
  }

  return visitedNodesInOrder;
}

function dfsHelper(grid, currNode, endNode, pathNodes) {
  visitedNodesInOrder.push(currNode);
  pathNodes.push(currNode);
  currNode.isVisited = true;
  // base case
  if (currNode === endNode) {
    respath = pathNodes;
    return true;
  }

  for (let dir of directs) {
    let x = dir[0] + currNode.row,
      y = dir[1] + currNode.col;
    if (isValid(x, y, grid)) {
      if (dfsHelper(grid, grid[x][y], endNode, pathNodes.slice())) return true;
    }
  }

  return false;
}


function isValid(x, y, grid) {
  const m = grid.length,
    n = grid[0].length;
  return x >= 0 && x < m && y >= 0 && y < n && !grid[x][y].isWall && !grid[x][y].isVisited;
}
