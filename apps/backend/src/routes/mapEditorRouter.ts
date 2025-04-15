// src/routes/mapEditorRouter.ts
import { initTRPC, TRPCError } from '@trpc/server';
import { z } from 'zod';
import PrismaClient from '../bin/prisma-client';
import { nodeType } from 'database';

// Initialize tRPC
export const t = initTRPC.create();

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

        const nodeIds = nodes.map(node => node.id);

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
        const formattedNodes = nodes.map(node => ({
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
        const formattedEdges = edges.map(edge => {
          const fromNode = nodes.find(n => n.id === edge.fromNodeId);
          const toNode = nodes.find(n => n.id === edge.toNodeId);
          
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
});

export type MapEditorRouter = typeof mapEditorRouter;