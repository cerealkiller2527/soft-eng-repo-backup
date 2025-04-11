import { z } from 'zod';
import { initTRPC, TRPCError } from '@trpc/server';
import { BFS } from './algos/BFS.ts';
import { SearchSystem } from './algos/SearchSystem.ts';

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
                return s.path(startDesc, endDesc);

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
