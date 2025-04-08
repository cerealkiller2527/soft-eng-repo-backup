import express, { Request, Response, Router } from 'express';
import PrismaClient from '../bin/prisma-client';
import * as process from "node:process";

const router: Router = express.Router();

class Node {
    /**
     * node class: represents a node in the graph with neighbors and an id.
     */

    // node cache as map of node ids to nodes
    private static nodeCache: Map<number, Node> = new Map();

    public id: number;
    public neighbors: Node[];

    constructor(id: number) {
        /**
         * create new node instance.
         * @param {number} id - node id.
         */

        this.id = id;
        this.neighbors = [];
        Node.nodeCache.set(this.id, this); // add to cache
    }

    static async getNode(id: number) {
        /**
         * get node by id from cache, or create new one if not found
         * @param {number} id - node id.
         * @returns {Promise<Node>} - the node instance.
         */

        if (this.nodeCache.has(id)) {
            // bc of if statement we know this is a Node
            return <Node>this.nodeCache.get(id);
        }
        // if it doesn't exist in the node cache, create it
        let myNode = new Node(id);
        Node.nodeCache.set(id, myNode); // add it to cache
        return myNode; // return the new node
    }

    static clearCache() {
        /**
         * clears the node cache
         */

        Node.nodeCache.clear();
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
            this.neighbors.push(await Node.getNode(neighbor.id));
        }
    }
}

router.get('/', async (req: Request, res: Response) => {
    try {
        // set start and end descriptions. This will be taken from req at some point but is hard coded right now
        const startDesc = "1right entrance outside";
        const endDesc = "1a";

        // clear node cache
        Node.clearCache();

        // get start and end node from descriptions (temp)
        let startNode = await PrismaClient.node.findFirst({
            where: {
                description: startDesc,
            },
        });
        let endNode = await PrismaClient.node.findFirst({
            where: {
                description: endDesc,
            },
        });

        // make sure nodes were found, exit otherwise
        if(startNode === null || endNode === null) {
            console.log("Error finding starting or ending node, check descriptions against seeded descriptions in seed.ts")
            process.exit(1);
        }

        // extract Ids from nodes and put into node objects
        let start = new Node(startNode.id);
        let end = new Node(endNode.id);

        // run bfs
        let bfs = await findBFS(start, end);
        res.json(bfs); // return bfs

        // // this code gets all the nodes from the server (for debug)
        // const myNodes = await PrismaClient.node.findMany();
        // res.json(myNodes);
    } catch (err) {
        console.error('Error fetching nodes:', err);
        res.sendStatus(500);
    }
});

async function findBFS(startNode: Node, endNode: Node) {
    /**
     * BFS for graph search to find path from startNode to endNode
     *  * @param {Node} startNode - the starting node for the search.
     *  * @param {Node} endNode - the destination node.
     *  * @returns {Promise<Node[]>} - the path from start to end node, or an empty list if no path is found.
     *  */
    let pathQueue: Node[][] = [[startNode]]; // queue of paths to go through
    let visited = new Set<Number>(); // set of visited nodes (by ID)

    while (pathQueue.length > 0) {
        let currentPath = pathQueue.shift(); // path we are investigating
        let currentNode = currentPath![currentPath!.length - 1]; // not null assertion
        console.log('checking node:' + currentNode.id);

        if (currentNode.id === endNode.id) {
            // if this node is the end node
            console.log('found path');
            return currentPath;
        }

        if (!visited.has(currentNode.id)) {
            // if this node is unvisited
            visited.add(currentNode.id); // add it to the visited list

            // search DB for neighbors
            await currentNode.addNeighbors();
            console.log('got node (id)', currentNode.id, "'s neighbors");

            for (let neighbor of currentNode.neighbors) {
                // unzip current path list into elements, adding neighbor at the end
                if (!visited.has(neighbor.id)) {
                    pathQueue.push([...currentPath!, neighbor]);
                }
            }
            for (let path of pathQueue) {
                console.log('path: ', path);
            }
        }
    }
    return []; // no path found
}

export default router;
