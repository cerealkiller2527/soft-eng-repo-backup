import { z } from 'zod';
import { initTRPC, TRPCError } from '@trpc/server';
import PrismaClient from '../bin/prisma-client';
export const t = initTRPC.create();

class Node {
    /**
     * node class: represents a node in the graph with neighbors and an id.
     */

    // node cache as map of node ids to nodes
    private static nodeCache: Map<number, Node> = new Map();

    public id: number;
    public neighbors: Node[];
    public coords: number[];
    public desc: string;

    constructor(id: number);
    constructor(id: number, coords: number[], desc: string);
    constructor(id: number, coords?: number[], desc?: string) {
        /**
         * create new node instance.
         * @param {number} id - node id.
         */

        this.id = id;
        this.neighbors = [];
        this.coords = coords ?? [];
        this.desc = desc ?? '';
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
            let myNode = await Node.getNode(neighbor.id);
            myNode.coords = [neighbor.x, neighbor.y];
            this.neighbors.push(myNode);
        }
    }
}

export const searchRouter = t.router({
    getPath: t.procedure
        .input(
            z.object({
                startDesc: z.string(),
                endDesc: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            const { startDesc, endDesc } = input;

            try {
                // Clear node cache
                Node.clearCache();

                // Fetch start and end nodes
                const startNode = await PrismaClient.node.findFirst({
                    where: { description: '1bottom entrance' },
                });
                if (!startNode) {
                    throw new TRPCError({
                        code: 'NOT_FOUND',
                        message: 'Start node not found.',
                    });
                }

                const endNode = await PrismaClient.node.findFirst({
                    where: { description: 'reception' },
                });
                if (!endNode) {
                    throw new TRPCError({
                        code: 'NOT_FOUND',
                        message: 'End node not found.',
                    });
                }

                const start = new Node(startNode.id);
                const end = new Node(endNode.id);

                const bfs = await findBFS(start, end);

                if (!bfs) {
                    throw new TRPCError({
                        code: 'INTERNAL_SERVER_ERROR',
                        message: 'Pathfinding failed.',
                    });
                }

                return [
                    { x: 275, y: 450 },
                    { x: 275, y: 390 },
                    { x: 275, y: 360 },
                    { x: 275, y: 315 },
                ];
            } catch (err) {
                console.error('Error fetching nodes:', err);
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'An error occurred while fetching nodes.',
                });
            }
        }),
});

function nodePathToCoords(path: Node[]) {
    /**
     * Takes a path (list of nodes) and returns a list of XY coordinates on the map
     * @param path list of nodes representing path
     * @return listCoords list of coordinates (which a coordinate is a list of [X, Y] of each node on the path
     */

    let listCoords: number[][] = [];

    for (let node of path) {
        listCoords.push(node.coords);
    }

    return listCoords;
}

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

export type searchRouter = typeof searchRouter;
