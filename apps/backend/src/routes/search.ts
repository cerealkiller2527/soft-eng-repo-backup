import express, { Request, Response, Router } from 'express';
import PrismaClient from '../bin/prisma-client';

const router: Router = express.Router();

// node class
class Node {
    public id: number;
    public neighbors: Node[];

    constructor(id: number) {
        this.id = id;
        this.neighbors = [];
    }

    async addNeighbors() {
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

        let neighborNodeIds: number[] = [];

        for (let edge of connectedEdges) {
            if (edge.fromNodeId != this.id) {
                neighborNodeIds.push(edge.fromNodeId);
            }
            if (edge.toNodeId != this.id) {
                neighborNodeIds.push(edge.toNodeId);
            }
        }

        // add new ids and current ids (unpacked) into set to remove duplicated then unpack into list
        // old neighbor ids:
        const existingIds = this.neighbors.map((n) => n.id);
        const uniqueNeighborIds = [...new Set([...neighborNodeIds, ...existingIds])];

        console.log('node id: ', this.id, ' neighbor node ids: ', uniqueNeighborIds);

        // query for neighbor nodes
        const neighborNodesString = await PrismaClient.node.findMany({
            where: {
                id: {
                    in: uniqueNeighborIds,
                },
            },
        });

        this.neighbors = neighborNodesString.map((n) => new Node(n.id));
        for (let neighbor of this.neighbors) {
            console.log(neighbor);
        }
    }
}

router.get('/', async (req: Request, res: Response) => {
    try {
        // start node is A
        let start = new Node(1);
        let end = new Node(4);

        // let ret = await end.addNeighbors();
        // res.json(end.neighbors);

        let bfs = await findBFS(start, end);
        res.json(bfs);

        // const myNodes = await PrismaClient.node.findMany();
        // res.json(myNodes);
    } catch (err) {
        console.error('Error fetching assigned service requests:', err);
        res.sendStatus(500);
    }
});

async function findBFS(startNode: Node, endNode: Node) {
    /**
     * returns a list of Nodes representing the path from startNode to endNode
     * @param startNode Node the start of the BFS
     * @param endNode Node the desired location of the BFS
     * @return path Node[] list of nodes, or empty list if no path found
     */
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
