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

        console.log('node id: ', this.id, ' neighbor node ids: ', neighborNodeIds);

        // add new ids and current ids (unpacked) into set to remove duplicated then unpack into list
        // old neighbor ids:
        const existingIds = [];
        for (let neighbor of this.neighbors) {
            existingIds.push(neighbor.id);
        }

        const uniqueNeighborIds = [...new Set([...neighborNodeIds, ...existingIds])];

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
        console.log('exit addNeighbors');
    }
}

router.get('/', async (req: Request, res: Response) => {
    try {
        // start node is A
        let start = new Node(1);
        let end = new Node(4);
        //
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
    let pathQueue: Node[][] = [[startNode]]; // queue of paths to go through
    let visited = new Set<Node>(); // set of visited nodes

    while (pathQueue.length > 0) {
        let currentPath = pathQueue.shift(); // path we are investigating
        let currentNode = currentPath![currentPath!.length - 1]; // not null assertion
        console.log('checking node:' + currentNode.id);

        if (currentNode === endNode) {
            // if this node is the end node
            console.log('found path');
            return currentPath;
        }

        if (!visited.has(currentNode)) {
            // if this node is unvisited
            visited.add(currentNode); // add it to the visited list

            // search DB for neighbors
            await currentNode.addNeighbors();
            console.log('got node (id) ', currentNode.id, "'s neighbors");

            for (let neighbor of currentNode.neighbors) {
                // unzip current path list into elements, adding neighbor at the end
                pathQueue.push([...currentPath!, neighbor]);
            }
            for (let path of pathQueue) {
                console.log('path: ', path);
            }
        }
    }
    return []; // no path found
}

export default router;
