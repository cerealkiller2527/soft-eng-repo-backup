import PrismaClient from "../../bin/prisma-client.ts";

export class pNode {
  private static nodeCache: Map<number, pNode> = new Map();

  longitude: number;
  latitude: number;
  description: string;
  id: number;
  neighbors: pNode[];
  floor: number;

  constructor(id: number);
  constructor(
    id: number,
    longitude: number,
    lattitude: number,
    description: string,
    floor: number,
  );
  constructor(
    id: number,
    longitute?: number,
    lattitute?: number,
    description?: string,
    floor?: number,
  ) {
    this.longitude = longitute ?? -1;
    this.latitude = lattitute ?? -1;
    this.description = description ?? "";
    this.id = id;
    this.neighbors = [];
    this.floor = floor ?? -1;
  }

  static async getNode(id: number) {
    /**
     * get node by id from cache, or create new one if not found
     * @param {number} id - node id.
     * @returns {Promise<pNode>} - the node instance.
     */

    if (this.nodeCache.has(id)) {
      // bc of if statement we know this is a Node
      return <pNode>this.nodeCache.get(id);
    }
    // if it doesn't exist in the node cache, create it
    let node = new pNode(id);
    pNode.nodeCache.set(id, node); // add it to cache
    return node; // return the new node
  }

  static clearCache() {
    /**
     * clears the node cache
     */

    pNode.nodeCache.clear();
  }

  async addNeighbors() {
    /**
     * adds node neighbors via connected edge db query
     */

    const connectedEdges = await PrismaClient.edge.findMany({
      where: {
        OR: [
          {
            fromNodeId: this.id,
          },
          {
            toNodeId: this.id,
          },
        ],
      },
    });

    let neighborNodeIds = new Set<number>();

    for (let edge of connectedEdges) {
      if (edge.fromNodeId != this.id) {
        neighborNodeIds.add(edge.fromNodeId);
      }
      if (edge.toNodeId != this.id) {
        neighborNodeIds.add(edge.toNodeId);
      }
    }

    // query for neighbor nodes
    const neighborNodes = await PrismaClient.node.findMany({
      where: {
        id: {
          in: Array.from(neighborNodeIds),
        },
      },
    });

    for (let neighbor of neighborNodes) {
      const newNode = new pNode(
        neighbor.id,
        neighbor.lat,
        neighbor.long,
        neighbor.description,
        0,
      );
      this.neighbors.push(newNode);
    }
  }

  toJSON() {
    /**
     * custom `toJSON` method to avoid inf loops during stringify
     * @returns {object} - json  of the node with id and only neighbor ids.
     */

    return {
      id: this.id,
      neighbors: this.neighbors.map((neighbor) => ({
        id: neighbor.id, // only id is included (prevent inf loop)
      })),
    };
  }

  static async nodesToPath(path: pNode[]): Promise<number[][]> {
    let r: number[][] = [];
    for (let i = 0; i < path.length; i++) {
      r.push([path[i].longitude, path[i].latitude]);
    }
    return r;
  }
}
