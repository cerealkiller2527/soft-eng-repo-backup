import { z } from 'zod';
import { initTRPC, TRPCError } from '@trpc/server';
import { BFS } from './algos/BFS.ts';
import { SearchSystem } from './algos/SearchSystem.ts';

import { pNodeDTO } from '../../../../share/types.ts';
import { pNode } from '../../../backend/src/routes/algos/pNode.ts';

export const t = initTRPC.create();

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
                const s = new SearchSystem(new BFS());
                const nodePath = await s.path('1entrance outside', '4phlebotomy');

                // convert each pNode to pNodeDTO
                const pNodeDTOS: pNodeDTO[] = nodePath.map((node) => ({
                    id: node.id,
                    description: node.description,
                    latitude: node.latitude,
                    longitude: node.longitude,
                    neighbors: node.neighbors.map((neighbor) => ({
                        id: neighbor.id,
                    })),
                }));
                return pNodeDTOS;
            } catch (err) {
                console.error('Error fetching nodes:', err);
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'An error occurred while fetching nodes.',
                });
            }
        }),
});

export type searchRouter = typeof searchRouter;
