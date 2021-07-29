

/*birdirectBFS: return nodesVisitedInOrder, and 
each node in shortest path points to its previous node*/
const directs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
export default (grid, startNode, endNode) => {
  let nodesVisitedInOrder = [];// to be returned
  let visitingNodes1 = [];
  let visitingNodes2 = [];

  let visitedSet1 = new Set();
  let visitedSet2 = new Set();

  visitingNodes1.push(startNode);
  visitedSet1.add(`${startNode.row},${startNode.col}`);
  startNode.isVisited = true;
  nodesVisitedInOrder.push(startNode);

  visitingNodes2.push(endNode);
  visitedSet2.add(`${endNode.row},${endNode.col}`);
  endNode.isVisited = true;
  nodesVisitedInOrder.push(endNode);

  while (visitingNodes1.length || visitingNodes2.length) {
    if (visitingNodes1.length) {
      let node = visitingNodes1.shift();
      for (let dir of directs) {
        let x = node.row + dir[0], y = node.col + dir[1];
        if (isValid(x, y, grid, visitedSet1)) {
          if (visitedSet2.has(`${x},${y}`)) {
            mergePath(node, grid[x][y]);
            return nodesVisitedInOrder;
          }

          nodesVisitedInOrder.push(grid[x][y]);
          visitedSet1.add(`${x},${y}`);
          grid[x][y].isVisited = true;
          visitingNodes1.push(grid[x][y]);
          grid[x][y].previousNode = node;

          
        }
      }
    }

    if (visitingNodes2.length) {
      let node2 = visitingNodes2.shift();
      for (let dir of directs) {
        let x = node2.row + dir[0], y = node2.col + dir[1];
        if (isValid(x, y, grid, visitedSet2)) {
          if (visitedSet1.has(`${x},${y}`)) {
            mergePath(grid[x][y], node2);
            return nodesVisitedInOrder;
          }

          nodesVisitedInOrder.push(grid[x][y]);
          visitedSet2.add(`${x},${y}`);
          grid[x][y].isVisited = true;
          visitingNodes2.push(grid[x][y]);
          grid[x][y].previousNode = node2;
        }
      }
    }
  }
  return nodesVisitedInOrder;
}

function mergePath(node1, node2) {
  if (node2 === null) return;

  let pre = node2.previousNode;
  node2.previousNode = node1;

  mergePath(node2, pre);
}

function isValid(x, y, grid, set) {
  let m = grid.length, n = grid[0].length;
  return x >= 0 && x < m && y >= 0 && y < n && !grid[x][y].isWall && !set.has(`${x},${y}`);
}