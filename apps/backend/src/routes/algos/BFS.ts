import { Algorithm } from "./Algorithm.ts";
import { pNode } from "./pNode.ts";
import { SearchSystem } from "./SearchSystem.ts";

export class BFS implements Algorithm {
  async findPath(startId: number, endId: number): Promise<pNode[]> {
    const startNode = await Algorithm.createNodeFromId(startId);
    const endNode = await Algorithm.createNodeFromId(endId);

    const path = await this.findBFS(startNode, endNode);
    if (path === undefined) {
      console.error("no path found");
      return [startNode];
    } else {
      console.log("path found");
      return path;
    }
  }

  private async findBFS(
    startNode: pNode,
    endNode: pNode,
  ): Promise<pNode[] | undefined> {
    /**
     * BFS for graph search to find path from startNode to endNode
     *  * @param {Node} startNode - the starting node for the search.
     *  * @param {Node} endNode - the destination node.
     *  * @returns {Promise<Node[]>} - the path from start to end node, or an empty list if no path is found.
     *  */
    let pathQueue: pNode[][] = [[startNode]]; // queue of paths to go through
    let visited = new Set<number>(); // set of visited nodes (by ID)

    while (pathQueue.length > 0) {
      let currentPath = pathQueue.shift(); // path we are investigating
      let currentNode = currentPath![currentPath!.length - 1]; // not null assertion
      // console.log('checking node:' + currentNode.id);

      if (currentNode.id === endNode.id) {
        // if this node is the end node
        return currentPath;
      }

      if (!visited.has(currentNode.id)) {
        // if this node is unvisited
        visited.add(currentNode.id); // add it to the visited list

        // search DB for neighbors
        await currentNode.addNeighbors();
        console.log("got node (id)", currentNode.id, "'s neighbors");

        for (let neighbor of currentNode.neighbors) {
          // unzip current path list into elements, adding neighbor at the end
          if (!visited.has(neighbor.id)) {
            pathQueue.push([...currentPath!, neighbor]);
          }
        }
      }
    }
    return []; // no path found
  }
}
