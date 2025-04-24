import { Algorithm } from "./Algorithm.ts";
import { pNode } from "./pNode.ts";

export class DFS implements Algorithm {
  async findPath(startDesc: string, endDesc: string): Promise<pNode[]> {
    console.log(startDesc, endDesc);
    const startNode: pNode = await Algorithm.getLocationFromSuite(startDesc);
    const endNode: pNode = await Algorithm.getLocationFromSuite(endDesc);

    if (startNode.id === -1) {
      console.error("start node not found, no node has given description");
    }
    if (endNode.id === -1) {
      console.error("end node not found, no node has given description");
    }
    const path: pNode[] | undefined = await this.findDFS(startNode, endNode);
    if (path === undefined) {
      console.error("no path found");
      return [startNode];
    } else {
      console.log("path found");
      return path;
    }
  }

  private async findDFS(
    startNode: pNode,
    endNode: pNode,
  ): Promise<pNode[] | undefined> {
    /**
     * DFS for graph search to find path from startNode to endNode
     *  * @param {Node} startNode - the starting node for the search.
     *  * @param {Node} endNode - the destination node.
     *  * @returns {Promise<Node[]>} - the path from start to end node, or an empty list if no path is found.
     *  */
    let pathStack: pNode[][] = [[startNode]]; // stack of paths to go through
    let visited = new Set<number>(); // set of visited nodes (by ID)

    while (pathStack.length > 0) {
      let currentPath = pathStack.pop()!;
      let currentNode = currentPath[currentPath!.length - 1];

      // skip already explored nodes
      if (visited.has(currentNode.id)) {
        continue;
      }

      visited.add(currentNode.id);

      // check if path was found and return path on success
      if (currentNode.id === endNode.id) {
        console.log("found path");
        return currentPath;
      }

      // add neighbors to stack
      await currentNode.addNeighbors();

      for (let neighbor of currentNode.neighbors) {
        if (!visited.has(neighbor.id)) {
          pathStack.push([...currentPath, neighbor]);
        }
      }
    }
    return []; // no path found
  }
}
