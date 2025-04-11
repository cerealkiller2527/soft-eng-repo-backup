import type { appRouter } from '../../../backend/src/app.ts';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import { QueryClient } from '@tanstack/react-query';

// Create a tRPC React client for components that still use hooks
export const trpc = createTRPCReact<appRouter>();

// Create QueryClient
export const queryClient = new QueryClient();

// Create direct client
export const trpcClient = createTRPCProxyClient<appRouter>({
    links: [
        httpBatchLink({
            url: 'http://localhost:3000/api', // Express server
        }),
    ],
});

// Add compatibility function for existing components that use useTRPC
export function useTRPC() {
    return trpc.useContext();
}

// Export helper functions to make direct calls
export async function fetchDepartmentBySlug(slug: string) {
    if (!slug) return null;
    
    try {
        return await trpcClient.directory.getDepartmentBySlug.query(slug);
    } catch (error) {
        console.error(`Error fetching department by slug "${slug}":`, error);
        return null;
    }
}

export async function fetchAllDepartments() {
    try {
        return await trpcClient.directory.getAllDepartments.query();
    } catch (error) {
        console.error("Error fetching all departments:", error);
        return [];
    }
}

export async function fetchDepartmentById(id: number) {
    if (!id) return null;
    
    try {
        return await trpcClient.directory.getDepartmentById.query(id);
    } catch (error) {
        console.error(`Error fetching department by ID ${id}:`, error);
        return null;
    }
}

export async function checkPrismaModels() {
    try {
        return await trpcClient.directory.checkPrismaModels.query();
    } catch (error) {
        console.error("Error checking Prisma models:", error);
        return null;
    }
}