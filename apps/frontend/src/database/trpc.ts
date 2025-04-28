import { createTRPCContext } from '@trpc/tanstack-react-query';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { QueryClient } from '@tanstack/react-query';
import type { appRouter } from '../../../backend/src/app';

export const queryClient = new QueryClient();

export function trpcClient(token?: string) {
    return createTRPCClient<typeof appRouter>({
        links: [
            httpBatchLink({
                url: '/api',
                headers() {
                    return token
                        ? { Authorization: `Bearer ${token}` }
                        : {};
                },
            }),
        ],
    });
}

export const { TRPCProvider, useTRPC, useTRPCClient } = createTRPCContext<typeof appRouter>();
