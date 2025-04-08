import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { findBFS } from '../../pathfinding/search';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const pathfindingRouter = router({
  // Get all nodes that have locations (for frontend display)
  getLocationNodes: publicProcedure
    .query(async () => {
      return prisma.node.findMany({
        where: {
          Location: {
            isNot: null
          }
        },
        include: {
          Location: {
            include: {
              Department: true
            }
          }
        }
      });
    }),

  // Find path between two nodes
  findPath: publicProcedure
    .input(z.object({
      startNodeId: z.number(),
      endNodeId: z.number()
    }))
    .query(async ({ input }) => {
      const path = await findBFS(input.startNodeId, input.endNodeId);
      return path.map(node => ({
        id: node.id,
        x: node.x,
        y: node.y,
        description: node.description,
        isLocation: node.Location !== null,
        location: node.Location ? {
          suite: node.Location.suite,
          floor: node.Location.floor,
          department: node.Location.Department ? {
            name: node.Location.Department.name,
            description: node.Location.Department.description
          } : null
        } : null
      }));
    })
}); 