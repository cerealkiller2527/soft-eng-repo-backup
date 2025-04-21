// src/routes/mapEditorRouter.ts
import { initTRPC, TRPCError } from '@trpc/server';
import {array, z} from 'zod';
import PrismaClient from '../bin/prisma-client';
import prismaClient from "../bin/prisma-client";
import {pNodeDTO} from "../../../../share/types.ts";
import {pNode} from "./algos/pNode.ts";

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
                // Get all nodes on this floor
                const nodes = await PrismaClient.node.findMany({
                    where: {
                        buildingId: input.buildingId,
                        floor: input.floor,
                    },
                    include: {
                        Department: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                    orderBy: {
                        id: 'asc', // Sort nodes by ID for consistency
                    },
                });

                const nodeIds = nodes.map((node) => node.id);

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
                    suite: node.suite,
                    departmentId: node.departmentId,
                    departmentName: node.Department?.name,
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
                        floor: z.number(),
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
                // get nodes to delete
                const nodesToDelete = await prismaClient.node.findMany({
                    where: {
                        buildingId: buildingId,
                        floor: floor,
                        NOT: {
                            type: {
                                in: ["Elevator", "Staircase"]
                            }
                        }
                    }
                })
                // delete nodes
                const deletedNodesCount = await prismaClient.node.deleteMany({
                    where: {
                        buildingId: buildingId,
                        floor: floor,
                        NOT: {
                            type: {
                                in: ["Elevator", "Staircase"]
                            }
                        }
                    }
                })
                console.log('Deleted ', deletedNodesCount.count, ' nodes from the database')
                // get ids of nodes with edges to delete
                const deletedNodeIds = nodesToDelete.map((node) => node.id);
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
                                floor: node.floor,
                                description: node.description,
                                lat: node.latitude,
                                long: node.longitude,
                                suite: "-1",
                                type: "Intermediary",
                                buildingId: buildingId
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
                console.log('Created ', edges.length, ' edges in the database');
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

export type MapEditorRouter = typeof mapEditorRouter;
