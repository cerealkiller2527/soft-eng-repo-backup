import { createTRPCContext } from '@trpc/tanstack-react-query';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { QueryClient } from '@tanstack/react-query';
import type { appRouter } from '../../../backend/src/app';

export const queryClient = new QueryClient();

export const trpcClient = createTRPCClient<typeof appRouter>({
    links: [
        httpBatchLink({
            url: '/api', // Express server
        }),
    ],
});

export const { TRPCProvider, useTRPC, useTRPCClient } = createTRPCContext<typeof appRouter>();
