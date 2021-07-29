
/* run Dijkstra algorithm, return all nodes in the order in which they are visited.
make nodes point back to their previous node, allowing us to compute the shortest
 path by backtracking from the end node.*/
export default function dijkstra(grid, startNode, endNode) {
  const visitedNodesInOrder = []; // to be returned
  startNode.distance = 0;
  // get all nodes
  const unvisitedNodes = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      unvisitedNodes.push(grid[i][j]);
    }
  }

  while (unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();

    // if it's a wall, we skipt it
    if (closestNode.isWall) continue;
    // no way to the end node
    if (closestNode.distance === Infinity) return visitedNodesInOrder;

    // visit closest node
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);

    if (closestNode === endNode) return visitedNodesInOrder;
    updateNeighbors(closestNode, grid);
  }
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((a, b) => a.distance - b.distance);
}

// update the distance of each valid neighbor, and point each neighbor back to previous node.
function updateNeighbors(node, grid) {
  const directs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  for (let dir of directs) {
    let x = dir[0] + node.row,
      y = dir[1] + node.col;
    if (isValid(x, y, grid)) {
      grid[x][y].distance = node.distance + 1;
      // point to previous node, easy to get shortest path
      grid[x][y].previousNode = node;
    }
  }
}

// check the x, y is in bound and the distance of the new node is greater than node.distance
function isValid(x, y, grid) {
  let m = grid.length,
    n = grid[0].length;
  return x >= 0 && x < m && y >= 0 && y < n && !grid[x][y].isVisited;
}