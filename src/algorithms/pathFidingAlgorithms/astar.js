const directs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
/* run A* algorithm, return all nodes in the order in which they are visited.
make nodes point back to their previous node, allowing us to compute the shortest
 path by backtracking from the end node.*/
export default (grid, startNode, endNode) => {
  const visitedNodesInOrder = []; // to be returned

  startNode.distance = 0;
  const openList = [];
  openList.push(startNode);
  visitedNodesInOrder.push(startNode);

  while (openList.length) {
    sortNodesByFcost(openList, endNode);
    
    let node = openList.shift();
    node.isVisited = true;
    visitedNodesInOrder.push(node);

    if (node === endNode) return visitedNodesInOrder;

    for (let dir of directs) {
      let x = dir[0] + node.row, y = dir[1] + node.col;
      if (isValid(x, y, grid)) {
        grid[x][y].previousNode = node;
        grid[x][y].distance = node.distance + 1;
        grid[x][y].isVisited = true;
        openList.push(grid[x][y]);
      }
    }

  }

  return visitedNodesInOrder;
  
}

function sortNodesByFcost(openList, endNode) {
  openList.sort((a, b) => {
    return manhatanDis(a, endNode) + a.distance - (manhatanDis(b, endNode) + b.distance);
  })
}

function manhatanDis(a, endNode) {
  return Math.abs(a.row - endNode.row) + Math.abs(a.col - endNode.col);
}

function isValid(x, y, grid) {
  let m = grid.length, n = grid[0].length;
  return x >= 0 && x < m && y >= 0 && y < n && !grid[x][y].isVisited && !grid[x][y].isWall;
}