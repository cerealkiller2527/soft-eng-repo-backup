// src/routes/mapEditorRouter.ts
import { initTRPC, TRPCError } from '@trpc/server';
import { z } from 'zod';
import PrismaClient from '../bin/prisma-client';
import prismaClient from '../bin/prisma-client';

// Initialize tRPC
export const t = initTRPC.create();

// create zod objects for node and edge
const node = z.object({
    id: z.number(),


})

export const mapEditorRouter = t.router({
    // Get all nodes and edges for a floor map in a single call
    getFloorMap: t.procedure
        .input(
            z.object({
                buildingId: z.number(),
                floor: z.number(),
            })
        )
        .query(async ({ input }) => {
            try {

                const nodes = await getNodesFromLocation(input);
                const nodeIds = nodes.map((node) => node.id)

                // Get all edges where both nodes are on this floor
                const edges = await PrismaClient.edge.findMany({
                    where: {
                        fromNodeId: { in: nodeIds },
                        toNodeId: { in: nodeIds },
                    },
                    orderBy: {
                        id: 'asc', // Sort edges by ID for consistency
                    },
                });

                // Format nodes for display
                const formattedNodes = nodes.map((node) => ({
                    id: node.id,
                    x: node.lat,
                    y: node.long,
                    description: node.description,
                    type: node.type,
                }));

                // Format edges for drawing lines
                const formattedEdges = edges.map((edge) => {
                    const fromNode = nodes.find((n) => n.id === edge.fromNodeId);
                    const toNode = nodes.find((n) => n.id === edge.toNodeId);

                    return {
                        id: edge.id,
                        fromNodeId: edge.fromNodeId,
                        toNodeId: edge.toNodeId,
                        // Include coordinates to simplify drawing lines
                        fromX: fromNode?.lat || 0,
                        fromY: fromNode?.long || 0,
                        toX: toNode?.lat || 0,
                        toY: toNode?.long || 0,
                    };
                });
                console.log(input.floor);
                // Return everything needed to render the map
                return {
                    nodes: formattedNodes,
                    edges: formattedEdges,
                    buildingId: input.buildingId,
                    floor: input.floor,
                };
            } catch (error) {
                console.error('Error fetching floor map:', error);
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Failed to fetch floor map',
                });
            }
        }),

    sendFloorMap: t.procedure
        .input(
            z.object({
                buildingId: z.number(),
                floor: z.number(),
                nodes: z.array(
                    z.object({
                        id: z.number(),
                        description: z.string(),
                        longitude: z.number(),
                        latitude: z.number(),
                        neighbors: z.array(
                            z.object({
                                id: z.number(),
                            })
                        ),
                    })
                ),
                edges: z.array(
                    z.object({
                        fromNodeId: z.number(),
                        toNodeId: z.number(),
                    })
                ),
            })
        )
        .mutation(async ({ input }) => {
            const {buildingId, floor, nodes, edges} = input;

            try {
                // get locations of nodes to delete
                const locations = await PrismaClient.location.findMany({
                    where: {
                        buildingId: input.buildingId,
                        floor: input.floor,
                    },
                    include: {
                        node: true,
                    }
                });

                // get nodes to delete from locations
                const location = { buildingId: input.buildingId, floor: input.floor }
                const nodes = await getNodesFromLocation(location);
                const nodeIds = nodes.map((node) => node.id)


                // delete nodes
                const deletedNodesCount = await prismaClient.node.deleteMany({
                    where: {
                        id: {
                            in: nodeIds
                        }
                    }
                })
                console.log('Deleted ', deletedNodesCount.count, ' nodes from the database')

                // get ids of nodes with edges to delete
                const deletedNodeIds = nodes.map((node) => node.id);

                // delete edges
                const deletedEdgesCount = await prismaClient.edge.deleteMany({
                    where: {
                        OR: [
                            {
                                toNodeId: {in: deletedNodeIds},
                            },
                            {
                                fromNodeId: {in: deletedNodeIds},
                            }
                        ]
                    }
                })
                console.log('Deleted ', deletedEdgesCount.count, ' edges from the database')

                // create nodes in database
                await Promise.all(
                    nodes.map((node) =>
                        prismaClient.node.create({
                            data: {
                                id: node.id,
                                description: node.description,
                                lat: node.lat,
                                long: node.long,
                                type: "Intermediary",
                            }
                        })
                    )
                );
                console.log('Created ', nodes.length, ' nodes in the database');

                //create edges in database
                await Promise.all(
                    edges.map((edge) =>
                    prismaClient.edge.create({
                        data: {
                            fromNodeId: edge.fromNodeId,
                            toNodeId: edge.toNodeId,
                        }
                    }))
                );
                return {success: true}
            } catch (error){
                console.error('Error adding nodes from map editor: ', error);
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: "Failed to update floor map in database",
                });
            }
        })
});

async function getNodesFromLocation({buildingId, floor}: {buildingId: number, floor: number}) {
    // Get all nodes on this floor
    const locations = await PrismaClient.location.findMany({
        where: {
            buildingId: buildingId,
            floor: floor,
        },
        include: {
            node: true,
        }
    });
    // get the nodes at that location
    return locations
        .filter(location => location.node !== null)
        .map(location => location.node!);
}

export type MapEditorRouter = typeof mapEditorRouter;
