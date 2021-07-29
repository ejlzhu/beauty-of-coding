// after dijkstra finished, call this function to backtrack from endNode to
// startNode to get shortest path.
export function getShortestPathNodes(endNode) {
  const shortestPathNodes = [];
  let currNode = endNode;
  while (currNode != null) {
    shortestPathNodes.unshift(currNode);
    currNode = currNode.previousNode;
  }
  return shortestPathNodes;
}

